import { useEffect, useState, useMemo, memo, useCallback, useRef, ReactNode, RefObject } from 'react';
import useGroupListener from '../../../features/groups/hooks/useGroupListener';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, type DocumentSnapshot, onSnapshot } from 'firebase/firestore';
import { clamp } from '../../../lib/helpers';
import {
  getSimplifiedBalance,
  getTotalFromSimplified,
  type SimplifiedBalance,
} from '../../../features/groups/utils/balance';

import { type Group } from '../../../features/groups/types';
import { db } from '../../../lib/firebase/firestore';
import { auth } from '../../../lib/firebase/auth';
import { Menu, Plus } from 'lucide-react';
import PopupOverlay from '../../../components/popup/PopupOverlay';

const Group = memo(function Group() {
  const navigate = useNavigate();
  const PlusMemo = memo(() => <Plus />);

  const { group: groupParam } = useParams();
  const { group, userData } = useGroupListener(groupParam);
  const groupData = group?.data();

  // TODO: Create actual Popup Menu Component
  const [showGroupMenu, setShowGroupMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuRect = menuRef.current?.getBoundingClientRect();

  const balance = getSimplifiedBalance(group?.data());
  const userBalance = {
    total: getTotalFromSimplified(userData?.groupUid, balance),
    records: balance,
  };

  // Event Listeners
  const handleAddClicked = useCallback(async () => {
    navigate('new');
  }, []);

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
          <GroupInfo
            userBalance={userBalance}
            groupData={groupData}
            userGroupUid={userData?.groupUid}
            ref={menuRef}
            setShowGroupMenu={setShowGroupMenu}
          />
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
        <FAB onClick={handleAddClicked}>
          <PlusMemo />
          Add Transaction
        </FAB>
      </div>
    </>
  );
});

const GroupInfo = ({
  userBalance,
  groupData,
  userGroupUid,
  setShowGroupMenu,
  ref,
}: {
  userBalance: { total: number; records: SimplifiedBalance };
  groupData?: Group;
  setShowGroupMenu: (state: boolean) => void;
  userGroupUid: string | undefined;
  ref: RefObject<HTMLDivElement | null>;
}) => {
  const MenuMemo = memo(() => <Menu onClick={() => setShowGroupMenu(true)} className="w-8 cursor-pointer" />);

  return (
    <section className="flex w-full flex-col items-start gap-3 px-3">
      <div className="w-full">
        <div className="mb-2 flex w-full flex-row items-center justify-between" ref={ref}>
          <h1 className="font-noto-sans text-sand text-left text-4xl font-medium">{groupData?.name}</h1>
          <MenuMemo />
        </div>
        <BalanceLabel total={userBalance.total} />
      </div>
      {userBalance?.total != 0 && userBalance?.total != null && (
        <div className="bg-charcoal-500 rounded-xl p-3 text-left text-base">
          {Object.entries(userBalance.records[userGroupUid ?? '']).map(([uid, amt]) => {
            const name = groupData?.members[uid].displayName ?? 'unkown';
            return <BalanceItem key={uid} name={name} amt={amt} />;
          })}
        </div>
      )}
      <p className="text-xs opacity-72">Debts are being simplified</p>
      <div className="border-charcoal-300 cursor-pointer rounded-xl border-1 px-3 py-1">See full breakdown</div>
    </section>
  );
};

const BalanceLabel = ({ total }: { total: number }) => {
  return (
    <h2 className="w-fit text-xl font-light">
      {!total ? (
        'debts clear'
      ) : (
        <>
          {total > 0 ? 'You are owed' : 'You owe'}
          <span className={`${total > 0 && 'pos'} text-negative-300 [.pos]:text-positive-300 font-bold`}>
            &nbsp;Php {Math.abs(total)}
          </span>
        </>
      )}
    </h2>
  );
};

const BalanceItem = ({ name, amt }: { name: string; amt: number }) => {
  if (amt < 0)
    return (
      <p>
        You owe {name}&nbsp;
        <span className="font-outfit text-negative-300 font-bold">Php {Math.abs(amt)}</span>
      </p>
    );
  else
    return (
      <p>
        {name} owes you <span className="font-outfit text-positive-300 font-bold">Php {Math.abs(amt)}</span>
      </p>
    );
};

const FAB = memo(({ onClick: handleClicked, children }: { onClick: () => void; children: ReactNode }) => {
  return (
    <div
      className="bg-accent-400 border-shell-100 absolute bottom-6 left-1/2 z-1 m-auto flex -translate-x-1/2 cursor-pointer flex-row items-center justify-center rounded-full border-4 px-3 py-2 text-white"
      onClick={handleClicked}
    >
      {children}
    </div>
  );
});

export default Group;
