import { useState, memo, useCallback, useRef, ReactNode, RefObject } from 'react';
import useGroupListener from '../../../features/groups/hooks/useGroupListener';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getSimplifiedBalance,
  getTotalFromSimplified,
  type SimplifiedBalance,
} from '../../../features/groups/utils/balance';

import { type Group } from '../../../features/groups/types';
import { Menu, Plus, ArrowLeft } from 'lucide-react';
import PopupOverlay from '../../../components/popup/PopupOverlay';
import { ROUTES } from '../../routes';
import { useGroupDebugOptions } from '../../../features/groups/utils/debuggerFunctions';
import Panel from '../../../components/neubrutalist/Panel';

const Group = memo(function Group() {
  const navigate = useNavigate();
  useGroupDebugOptions();
  const PlusMemo = memo(() => <Plus />);

  const { group: groupParam } = useParams();
  const { group, userData } = useGroupListener(groupParam);
  const groupData = group?.data();

  // TODO: Create actual Popup Menu Component
  const [showGroupMenu, setShowGroupMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuRect = menuRef.current?.getBoundingClientRect();

  const records = getSimplifiedBalance(group?.data());
  const userBalance = {
    total: getTotalFromSimplified(userData?.groupUid, records),
    records,
  };

  // Event Listeners
  const handleAddClicked = useCallback(async () => {
    console.log('param: ', groupParam);
    navigate(`${ROUTES.NEW_TRANSACTION}${groupParam && '?g=' + groupParam}`);
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
      <div className="relative flex shrink-0 grow-1 flex-col pt-3">
        <main className="flex h-full flex-col items-start items-stretch">
          <GroupInfo
            userBalance={userBalance}
            groupData={groupData}
            userGroupUid={userData?.groupUid}
            ref={menuRef}
            setShowGroupMenu={setShowGroupMenu}
          />
          <section className="font-outfit flex h-full flex-col rounded-t-3xl px-3">
            <div className="text-leather-900 my-6 flex w-full flex-row items-baseline justify-between px-3">
              <h2 className="text-2xl">
                August <span className="font-bold">2024</span>
              </h2>
              <p>2 Transactions</p>
            </div>
            <div className="flex flex-col gap-2 pb-12">
              <Panel className="justfiy-center flex flex-row gap-3" dropOnClick={true}>
                <div className="bg-accent-200 text-ink-800 flex w-10 flex-col justify-center gap-0 rounded-lg">
                  <p className="text-base/4">Aug</p>
                  <p className="text-2xl font-bold">25</p>
                </div>
                <div className="text-charcoal-800 grow-1 text-left">
                  <h3 className="text-leater text-lg/snug font-medium">Mendokoro</h3>
                  <p className="font-light">You paid Php 2,000</p>
                  <div>
                    <p className="border-shell-300 w-fit rounded-lg border-1 px-1 text-sm/tight font-light">Gcash</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-charcoal-600 font-medium">Php 2,000</p>
                  <p className="mb-2 flex flex-row items-center justify-end gap-1 text-sm font-light">
                    You lent
                    <div className="bg-positive-500 h-2 w-2 rounded-full" />
                  </p>
                  <Panel padding="py-0 px-4" bgColor="bg-accent-200" rounded="rounded-lg" dropOnClick={true}>
                    <p className="text-sm font-normal">Details</p>
                  </Panel>
                </div>
              </Panel>
              <Panel className="justfiy-center flex flex-row gap-3" dropOnClick={true}>
                <div className="bg-accent-200 text-ink-800 flex w-10 flex-col justify-center gap-0 rounded-lg">
                  <p className="text-base/4">Aug</p>
                  <p className="text-2xl font-bold">25</p>
                </div>
                <div className="text-charcoal-800 grow-1 text-left">
                  <h3 className="text-leater text-lg/snug font-medium">Mendokoro</h3>
                  <p className="font-light">You paid Php 2,000</p>
                  <div>
                    <p className="border-shell-300 w-fit rounded-lg border-1 px-1 text-sm/tight font-light">Gcash</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-charcoal-600 font-medium">Php 2,000</p>
                  <p className="mb-2 flex flex-row items-center justify-end gap-1 text-sm font-light">
                    You lent
                    <div className="bg-positive-500 h-2 w-2 rounded-full" />
                  </p>
                  <Panel padding="py-0 px-4" bgColor="bg-accent-200" rounded="rounded-lg" dropOnClick={true}>
                    <p className="text-sm font-normal">Details</p>
                  </Panel>
                </div>
              </Panel>
              <Panel className="justfiy-center flex flex-row gap-3" dropOnClick={true}>
                <div className="bg-accent-200 text-ink-800 flex w-10 flex-col justify-center gap-0 rounded-lg">
                  <p className="text-base/4">Aug</p>
                  <p className="text-2xl font-bold">25</p>
                </div>
                <div className="text-charcoal-800 grow-1 text-left">
                  <h3 className="text-leater text-lg/snug font-medium">Mendokoro</h3>
                  <p className="font-light">You paid Php 2,000</p>
                  <div>
                    <p className="border-shell-300 w-fit rounded-lg border-1 px-1 text-sm/tight font-light">Gcash</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-charcoal-600 font-medium">Php 2,000</p>
                  <p className="mb-2 flex flex-row items-center justify-end gap-1 text-sm font-light">
                    You lent
                    <div className="bg-positive-500 h-2 w-2 rounded-full" />
                  </p>
                  <Panel padding="py-0 px-4" bgColor="bg-accent-200" rounded="rounded-lg" dropOnClick={true}>
                    <p className="text-sm font-normal">Details</p>
                  </Panel>
                </div>
              </Panel>
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
    <section className="border-wheat-400 mx-3 flex grow-1 flex-col items-start gap-3 border-b-1 border-dashed pb-8">
      <div className="w-full">
        <Link to={ROUTES.APP}>
          <p className="text-ink-800 pointer-cursor mb-4 flex flex-row items-center gap-2 text-lg font-normal">
            <Panel bgColor="bg-accent-200" dropOnClick={true}>
              <ArrowLeft className="text-ink-800" />
            </Panel>
          </p>
        </Link>
        <div className="mb-3 flex w-full flex-row items-center justify-between" ref={ref}>
          <h1 className="font-gieonto text-left text-4xl font-medium">{groupData?.name}</h1>
          <MenuMemo />
        </div>
        <BalanceLabel total={userBalance.total} />
      </div>
      {userBalance?.total != 0 && userBalance?.total != null && (
        <Panel padding="px-4 py-2">
          {Object.entries(userBalance.records[userGroupUid ?? '']).map(([uid, amt]) => {
            const name = groupData?.members[uid].displayName ?? 'unkown';
            return <BalanceItem key={uid} name={name} amt={amt} />;
          })}
        </Panel>
      )}
      <p className="text-xs opacity-72">Debts are being simplified</p>
      <div className="border-charcoal-300 cursor-pointer rounded-xl border-1 px-3 py-1">See full breakdown</div>
    </section>
  );
};

const BalanceLabel = ({ total }: { total: number }) => {
  return (
    <h2 className="font-outfit w-fit text-xl font-light">
      {!total ? (
        'debts clear'
      ) : (
        <>
          {total > 0 ? 'You are owed' : 'You owe'}
          <span className={`font-bold`}>&nbsp;Php {Math.abs(total)}</span>
        </>
      )}
    </h2>
  );
};

const BalanceItem = ({ name, amt }: { name: string; amt: number }) => {
  if (amt < 0)
    return (
      <p className="text-left">
        You owe {name}&nbsp;
        <span className="font-outfit text-negative-500 font-bold">Php {Math.abs(amt)}</span>
      </p>
    );
  else
    return (
      <p className="text-left">
        {name} owes you <span className="font-outfit text-positive-500 font-bold">Php {Math.abs(amt)}</span>
      </p>
    );
};

const FAB = memo(({ onClick: handleClicked, children }: { onClick: () => void; children: ReactNode }) => {
  return (
    <div
      className="bg-accent-600 fixed bottom-6 left-1/2 z-1 m-auto flex -translate-x-1/2 cursor-pointer flex-row items-center justify-center rounded-full px-3 py-2 text-white"
      onClick={handleClicked}
    >
      {children}
    </div>
  );
});

export default Group;
