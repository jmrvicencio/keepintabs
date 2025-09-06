import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import useGroupListener from '../../../features/groups/hooks/useGroupsListener';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, type DocumentSnapshot, onSnapshot } from 'firebase/firestore';
import { clamp } from '../../../lib/helpers';

import { type Group } from '../../../features/groups/types';
import { db } from '../../../lib/firebase/firestore';
import { auth } from '../../../lib/firebase/auth';
import { Menu, Plus } from 'lucide-react';
import PopupOverlay from '../../../components/PopupOverlay';

type GroupUser = {
  uid: string;
  displayName: string;
  linkedUid: string;
};

const generateDebtsList = (
  balance: { total: number; records: Record<string, Record<string, number>> },
  groupData: Group | undefined,
  currMember: GroupUser,
) => {
  const records = balance.records[currMember!.uid];

  return Object.entries(records).map(([key, val]) => {
    const payeeName = groupData?.members[key]?.displayName ?? 'Unkown';
    if (val < 0) {
      return (
        <p>
          You owe {payeeName}&nbsp;
          <span className="font-outfit text-negative-300 font-bold">Php {Math.abs(val)}</span>
        </p>
      );
    } else {
      return (
        <p>
          {payeeName} owes you <span className="font-outfit text-positive-300 font-bold">Php {Math.abs(val)}</span>
        </p>
      );
    }
  });
};

function Group() {
  const navigate = useNavigate();
  const [group, setGroup] = useState<DocumentSnapshot | null>(null);
  const [currMember, setCurrMember] = useState<GroupUser | null>(null);

  const [showGroupMenu, setShowGroupMenu] = useState(false);

  const { group: groupParam } = useParams();
  const groupData = group?.data() as Group | undefined;

  const menuRef = useRef<HTMLDivElement>(null);
  const menuRect = menuRef.current?.getBoundingClientRect();

  const { group: testGroup, userData } = useGroupListener(groupParam);
  console.log('userData: ', userData);
  useEffect(() => {
    console.log('group console: ', testGroup?.data());
  }, [testGroup]);

  // get Snapshot & listener for current selected group
  useEffect(() => {
    const unsubSnapshot = onSnapshot(doc(db, 'groups', groupParam!), (groupSnap) => {
      let member: GroupUser | null = null;

      for (const [memberID, memberData] of Object.entries(groupSnap.data()?.members)) {
        const data = memberData as { linkedUid: string; displayName: string };
        if (data.linkedUid == auth.currentUser!.uid) {
          member = { uid: memberID, ...data };
          break;
        }
      }

      if (!member) throw new Error('Could not find user in group');
      setCurrMember(member);

      setGroup(groupSnap);
    });

    return unsubSnapshot;
  }, []);

  // Calculates the group & current user's total balance for UI display
  const balance = useMemo(() => {
    console.log('group data: ', groupData);
    if (!groupData?.balance) return null;

    const totalBorrowed: Record<string, number> = {};
    const totalLent: Record<string, number> = {};
    const balanced: Record<string, number> = {};
    const simplified: Record<string, Record<string, number>> = {};

    for (let [lender, borrowers] of Object.entries(groupData.balance)) {
      for (let [borrower, value] of Object.entries(borrowers)) {
        totalBorrowed[borrower] = (totalBorrowed[borrower] ?? 0) + value;
        totalLent[lender] = (totalLent[lender] ?? 0) + value;

        balanced[borrower] = (balanced[borrower] ?? 0) - value;
        balanced[lender] = (balanced[lender] ?? 0) + value;
      }
    }

    for (let member of Object.keys(balanced)) {
      simplified[member] = simplified[member] ?? {};
      for (let payee of Object.keys(balanced)) {
        simplified[payee] = simplified[payee] ?? {};
        if (member != payee && balanced[member] < 0 && balanced[payee] > 0) {
          const amt = clamp(-balanced[member], 0, balanced[payee]);

          simplified[member][payee] = -amt;
          simplified[payee][member] = amt;
          balanced[member] += amt;
          balanced[payee] -= amt;
        }
      }
    }

    // Add entry for current member if it doesn't already exist
    simplified[currMember!.uid] = simplified[currMember!.uid] ?? {};
    const total = Object.values(simplified[currMember!.uid]).reduce((acc, val) => acc + val, 0);
    return { total, records: simplified };
  }, [group]);

  const debtsList = useMemo(() => {
    if (!balance || !balance.records) return null;
    return generateDebtsList(balance, groupData, currMember!);
  }, [balance]);

  // Event Listeners
  const handleAddClicked = async () => {
    navigate('new');
  };

  return (
    <>
      {showGroupMenu && (
        <PopupOverlay setShowSelf={setShowGroupMenu}>
          <div
            className="absolute h-10 w-10 border-1 border-red-500 bg-amber-800"
            style={{ top: menuRect?.bottom, right: window.innerWidth - (menuRect?.right ?? 0) }}
          ></div>
        </PopupOverlay>
      )}
      <div className="relative flex shrink-0 grow-1 flex-col gap-8 pt-3">
        <main className="flex h-full flex-col items-start gap-8">
          <section className="flex w-full flex-col items-start gap-3 px-3">
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full flex-row items-center justify-between" ref={menuRef}>
                <h1 className="font-noto-sans text-sand text-left text-4xl font-medium">{groupData?.name}</h1>
                <Menu onClick={() => setShowGroupMenu(true)} className="w-8 cursor-pointer" />
              </div>
              <p className="w-fit text-xl font-light">
                {!balance?.total ? (
                  'Debts Clear!'
                ) : (
                  <>
                    {balance.total > 0 ? 'You are owed' : 'You owe'}{' '}
                    <span
                      className={`${balance.total > 0 && 'pos'} text-negative-300 [.pos]:text-positive-300 font-bold`}
                    >
                      Php {Math.abs(balance.total)}
                    </span>
                  </>
                )}
              </p>
            </div>
            {balance?.total != 0 && balance?.total != null && (
              <div className="bg-charcoal-500 rounded-xl p-3 text-left text-base">{debtsList}</div>
            )}
            <p className="text-xs opacity-72">Debts are being simplified</p>
            <div className="border-charcoal-300 cursor-pointer rounded-xl border-1 px-3 py-1">See full breakdown</div>
          </section>
          <section className="bg-shell-300 flex h-full w-full flex-col rounded-t-3xl">
            <div className="text-leather-900 flex w-full flex-row items-baseline justify-between px-6 py-4">
              <h2 className="text-2xl">
                August <span className="font-bold">2024</span>
              </h2>
              <p>2 Transactions</p>
            </div>
            <div className="bg-shell-100 mx-1 flex h-1 grow-1 flex-col gap-1 rounded-t-3xl p-2">
              <div className="bg-shell-50 flex h-22 flex-row gap-3 rounded-2xl p-2">
                <div className="bg-accent-400 text-sand flex w-10 flex-col justify-center gap-0 rounded-lg">
                  <p className="text-base/4">Aug</p>
                  <p className="text-2xl font-bold">25</p>
                </div>
                <div className="text-charcoal-800 grow-1 text-left">
                  <h3 className="text-leater text-lg/tight font-medium">Mendokoro</h3>
                  <p className="text-leather-700">You paid Php 2,000</p>
                  <div>
                    <p className="text-leather-700 border-shell-300 w-fit rounded-lg border-1 px-1 text-sm/tight">
                      Gcash
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-charcoal-600 font-medium">Php 2,000</p>
                  <p className="text-leather-700 text-sm">You lent</p>
                </div>
              </div>
              <div className="bg-shell-50 flex h-22 flex-row gap-3 rounded-2xl p-2">
                <div className="bg-accent-400 text-sand flex w-10 flex-col justify-center gap-0 rounded-lg">
                  <p className="text-base/4">Aug</p>
                  <p className="text-2xl font-bold">25</p>
                </div>
                <div className="text-charcoal-800 grow-1 text-left">
                  <h3 className="text-leater text-lg/tight font-medium">Mendokoro</h3>
                  <p className="text-leather-700">You paid Php 2,000</p>
                  <div>
                    <p className="text-leather-700 border-shell-300 w-fit rounded-lg border-1 px-1 text-sm/tight">
                      Gcash
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-charcoal-600 font-medium">Php 2,000</p>
                  <p className="text-leather-700 text-sm">You lent</p>
                </div>
              </div>
              <div className="bg-shell-50 flex h-22 flex-row gap-3 rounded-2xl p-2">
                <div className="bg-accent-400 text-sand flex w-10 flex-col justify-center gap-0 rounded-lg">
                  <p className="text-base/4">Aug</p>
                  <p className="text-2xl font-bold">25</p>
                </div>
                <div className="text-charcoal-800 grow-1 text-left">
                  <h3 className="text-leater text-lg/tight font-medium">Mendokoro</h3>
                  <p className="text-leather-700">You paid Php 2,000</p>
                  <div>
                    <p className="text-leather-700 border-shell-300 w-fit rounded-lg border-1 px-1 text-sm/tight">
                      Gcash
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-charcoal-600 font-medium">Php 2,000</p>
                  <p className="text-leather-700 text-sm">You lent</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <div
          className="bg-accent-400 border-shell-100 absolute bottom-6 left-1/2 z-1 m-auto flex -translate-x-1/2 cursor-pointer flex-row items-center justify-center rounded-full border-4 px-3 py-2 text-white"
          onClick={handleAddClicked}
        >
          <Plus />
          New Transaction
        </div>
      </div>
    </>
  );
}

export default Group;
