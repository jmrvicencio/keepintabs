import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getDocFromCache, getDoc, doc, type DocumentSnapshot, onSnapshot } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { clamp } from '../../functions/helpers';
import { useQuery } from '@tanstack/react-query';

import { db } from '../../firebase/firestore';
import { dataFetchedAtom } from '../App';
import Header from '../../components/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { Menu } from 'lucide-react';
import { auth } from '../../firebase/auth';

type Group = {
  balance: {
    [lender: string]: {
      [borrower: string]: number;
    };
  };
  name: string;
  memberUids: string[];
};

type GroupUser = {
  uid: string;
  displayName: string;
  linkedUid: string;
};

function Group() {
  const [dataFetched] = useAtom(dataFetchedAtom);
  const [group, setGroup] = useState<DocumentSnapshot | null>(null);
  const [currMember, setCurrMember] = useState<GroupUser | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const { group: groupParam } = useParams();

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

      console.log('group updated');
      setGroup(groupSnap);
    });

    return unsubSnapshot;
  }, []);

  const groupData = group?.data() as Group | undefined;

  const balance = useMemo(() => {
    console.log(groupData);
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

  const listDebts = useMemo(() => {
    if (!balance || !balance.records) return null;

    const records = balance.records[currMember!.uid];
    return Object.entries(records).map(([key, val]) => {
      if (val < 0) {
        return (
          <p>
            You owe {key} <span className="font-outfit text-negative-300 font-bold">Php {Math.abs(val)}</span>
          </p>
        );
      } else {
        return (
          <p>
            {key} owes you <span className="font-outfit text-positive-300 font-bold">Php {Math.abs(val)}</span>
          </p>
        );
      }
    });
  }, [balance]);

  const handleShowSidebar = useCallback((state: boolean | null = null) => {
    if (state) setShowSidebar(state);
    else setShowSidebar((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative flex w-dvw shrink-0 flex-col gap-8 pt-3">
        {showSidebar && (
          <div className="absolute inset-0 h-full w-full bg-black/60" onClick={() => handleShowSidebar()}></div>
        )}
        <div className="px-3">
          <Header onProfileClicked={handleShowSidebar} />
        </div>
        <main className="flex h-full flex-col items-start gap-8">
          <section className="flex w-full flex-col items-start gap-3 px-3">
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full flex-row items-center justify-between">
                <h1 className="font-noto-sans text-sand text-left text-4xl font-medium">{groupData?.name}</h1>
                <Menu className="w-8 cursor-pointer" />
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
            {balance?.total != 0 && (
              <div className="bg-charcoal-500 rounded-xl p-3 text-left text-base">{listDebts}</div>
            )}
            <p className="text-xs opacity-72">Debts are being simplified</p>
            <div className="border-charcoal-300 cursor-pointer rounded-xl border-1 px-3 py-1">See full breakdown</div>
          </section>
          <section className="bg-shell-300 h-full w-full rounded-3xl">This is a test</section>
        </main>
      </div>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </>
  );
}

export default Group;
