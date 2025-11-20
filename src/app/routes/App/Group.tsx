import { useState, memo, useCallback, useRef, ReactNode, RefObject, useMemo, useEffect } from 'react';
import useGroupListener from '../../../features/groups/hooks/useGroupListener';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getSimplifiedBalance,
  getTotalFromSimplified,
  type SimplifiedBalance,
} from '../../../features/groups/utils/balance';
import { MainContentRefAtom } from '../../../store/mainArea';
import { useAtom } from 'jotai';
import { formatValue as formatToDigit } from '@/hooks/useDigitField';

import { type Group } from '@/features/groups/types';
import { Menu, Plus, ArrowLeft } from 'lucide-react';
import PopupOverlay from '../../../components/popup/PopupOverlay';
import { ROUTES } from '../../routes';
import { useGroupDebugOptions } from '../../../features/groups/utils/debuggerFunctions';
import Panel from '../../../components/neubrutalist/Panel';
import PanelButton from '../../../components/neubrutalist/PanelButton';
import UserIcon from '../../../components/user_stack/UserIcon';
import { usePopupOverlay } from '@/features/popup-menu/hooks/usePopupOverlay';
import { PopupMenu } from '@/features/popup-menu/stores/PopupAtom';
import { useTransacations } from '@/features/transactions/hooks/useTransactions';
import { Transaction } from '@/features/transactions/types';

const TransactionCard = ({
  transaction,
  currGroup,
  userGroupId,
}: {
  transaction: Transaction;
  currGroup: Group;
  userGroupId: string;
}) => {
  const description = transaction.description == '' ? 'No Description' : transaction.description;
  const paidBy = userGroupId == transaction.paidBy ? 'You' : currGroup.members[transaction.paidBy].displayName;

  return (
    <Panel className="justfiy-center flex flex-row gap-3" dropOnClick={true}>
      <div className="bg-accent-200 text-ink-800 flex w-10 flex-col justify-center gap-0 rounded-lg">
        <p className="text-base/4">Aug</p>
        <p className="text-2xl font-bold">25</p>
      </div>
      <div className="text-charcoal-800 flex grow flex-col gap-1 text-left">
        <h3 className="text-leater text-lg/snug font-medium">{description}</h3>
        <p className="text-sm/snug font-light">
          {paidBy} paid {formatToDigit(transaction.amount)}
        </p>
        <div>
          <p className="border-shell-300 w-fit rounded-lg border px-1 py-0.5 text-sm/tight font-light">
            {transaction.splits} splits
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-charcoal-600 font-medium">Php 2,000</p>
        <p className="mb-2 flex flex-row items-center justify-end gap-1 text-sm font-light">
          You lent
          <span className="bg-positive-500 h-2 w-2 rounded-full" />
        </p>
        <Panel padding="py-0 px-4" bgColor="bg-accent-200" rounded="rounded-lg" dropOnClick={true}>
          <p className="text-sm font-normal">Details</p>
        </Panel>
      </div>
    </Panel>
  );
};

const GroupInfo = ({
  userBalance,
  groupData,
  userGroupUid,
  ref,
}: {
  userBalance: { total: number; records: SimplifiedBalance };
  groupData?: Group;
  userGroupUid: string | undefined;
  ref: RefObject<HTMLDivElement | null>;
}) => {
  const { setShowPopup, setPopup } = usePopupOverlay();

  const handleMenuClicked = useCallback(() => {
    const menuPopup: PopupMenu = {
      type: 'menu',
      options: [{ label: 'Delete Group' }],
      reference: ref,
    };

    setPopup(menuPopup);
    setShowPopup(true);
  }, []);

  const MenuMemo = memo(() => <Menu onClick={handleMenuClicked} className="w-8 cursor-pointer" />);

  return (
    <section className="border-wheat-400 mx-3 flex grow flex-col items-start gap-2 border-b border-dashed pb-8">
      <div className="w-full">
        <div className="text-ink-800 pointer-cursor mb-4 flex flex-row items-center justify-between gap-2 text-lg font-normal">
          <Link to={ROUTES.APP}>
            <Panel bgColor="bg-accent-200" dropOnClick={true}>
              <ArrowLeft className="text-ink-800" />
            </Panel>
          </Link>
          <div className="border-wheat-400 bg-wheat-200 flex flex-row items-center gap-2 rounded-full border px-2 py-1">
            <p className="ml-1">{Object.keys(groupData?.members ?? {}).length}</p>
            <div className="flex flex-row">
              <UserIcon bgColor="bg-wheat-400" border="border-wheat-200" />
              <UserIcon bgColor="bg-wheat-400" border="border-wheat-200" />
              <UserIcon bgColor="bg-wheat-400" border="border-wheat-200" />
            </div>
          </div>
        </div>
        <div className="mb-4 flex w-full flex-row items-center justify-between" ref={ref}>
          <h1 className="font-gieonto text-left text-4xl font-medium">{groupData?.name}</h1>
          <div className="p1 border-wheat-400 flex h-8 w-8 items-center justify-center rounded-lg border">
            <MenuMemo />
          </div>
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
      <div className="border-wheat-400 cursor-pointer rounded-xl border px-3 py-1">See full breakdown</div>
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
          <span className={`font-bold`}>&nbsp;Php {formatToDigit(Math.abs(total))}</span>
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
        <span className="font-outfit text-negative-500 font-bold">Php {formatToDigit(Math.abs(amt))}</span>
      </p>
    );
  else
    return (
      <p className="text-left">
        {name} owes you{' '}
        <span className="font-outfit text-positive-500 font-bold">Php {formatToDigit(Math.abs(amt))}</span>
      </p>
    );
};

const Group = memo(function Group() {
  const navigate = useNavigate();

  const { group: groupParam } = useParams();
  const { group, userGroupId } = useGroupListener(groupParam);
  const groupData = group?.data();

  const { transactions, loading, getPage, endReached, reload, isEmpty } = useTransacations(groupParam!);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuRect = menuRef.current?.getBoundingClientRect();
  const [mainContentRef] = useAtom(MainContentRefAtom);

  // -----------------------------------
  // Computed Variables
  // -----------------------------------

  const simplifiedBalance = useMemo(() => getSimplifiedBalance(group?.data()), [group]);
  const userBalance = {
    total: getTotalFromSimplified(userGroupId, simplifiedBalance),
    records: simplifiedBalance,
  };

  if (import.meta.env.MODE == 'development') {
    useGroupDebugOptions();
  }

  // -----------------------------------
  // Event Listeners
  // -----------------------------------

  const handleAddClicked = useCallback(async () => {
    console.log('param: ', groupParam);
    navigate(`${ROUTES.NEW_TRANSACTION}${groupParam && '?g=' + groupParam}`);
  }, []);

  return (
    <>
      <div className="relative flex shrink-0 grow flex-col pt-3">
        <main className="flex h-full flex-col items-stretch">
          <GroupInfo userBalance={userBalance} groupData={groupData} userGroupUid={userGroupId} ref={menuRef} />
          <section className="font-outfit flex h-full flex-col rounded-t-3xl px-3">
            <div className="text-leather-900 my-6 flex w-full flex-row items-baseline justify-between px-3">
              <h2 className="text-2xl">
                August <span className="font-bold">2024</span>
              </h2>
              {/* <p>2 Transactions</p> */}
            </div>
            <div className="flex flex-col gap-2 pb-24">
              {isEmpty ? (
                <>No Transactions</>
              ) : (
                Object.values(transactions).map((txnArray) =>
                  txnArray.map((txn) => (
                    <TransactionCard currGroup={group!.data()!} userGroupId={userGroupId!} transaction={txn} />
                  )),
                )
              )}
              {/* <TransactionCard />
              <TransactionCard />
              <TransactionCard /> */}
            </div>
          </section>
        </main>
      </div>
    </>
  );
});

export default Group;
