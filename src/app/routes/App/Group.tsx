import { useState, memo, useCallback, useRef, ReactNode, RefObject, useMemo, useEffect, Fragment } from 'react';
import useGroupListener from '@/features/groups/hooks/useGroupListener';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSimplifiedBalance, getTotalFromSimplified } from '@/features/groups/utils/balance';
import { SimplifiedBalance, UserBalance } from '@/features/groups/types';
import { MainContentRefAtom } from '@/store/mainArea';
import { useAtom } from 'jotai';
import { formatValue as formatToDigit } from '@/hooks/useDigitField';
import { type Group } from '@/features/groups/types';
import { ROUTES } from '../../routes';
import { format } from 'date-fns';

// Custom Components
import Loading from '@/components/Loading';
import TransactionCard from '@/features/groups/components/TransactionCard';
import Panel from '@/components/neubrutalist/Panel';
import UserIcon from '@/components/user_stack/UserIcon';
import { PopupMenu, PopupOverlay } from '@/features/popup-menu/stores/PopupAtom';
import { Menu, ArrowLeft } from 'lucide-react';

// Custom Hooks
import useTransactions from '@/features/transactions/hooks/useTransactions';
import { useGroupDebugOptions } from '@/features/groups/utils/debuggerFunctions';
import { usePopupOverlay } from '@/features/popup-menu/hooks/usePopupOverlay';

const BalanceLabel = ({ total }: { total: number }) => {
  return (
    <h2 className="font-outfit w-fit text-xl font-light">
      {!total ? (
        'debts clear'
      ) : (
        <>
          {total > 0 ? 'You are owed' : 'You owe'}
          <span className={`font-outfit font-bold`}>&nbsp;Php {formatToDigit(Math.abs(total))}</span>
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

const BreakdownOverlay = ({ userBalance, groupData }: { userBalance: UserBalance; groupData: Group }) => {
  const members = groupData.members;

  return (
    <>
      <div className="bg-wheat-400/30 grid grid-cols-4 items-center justify-items-center px-4 py-2 font-bold">
        <h2>Name</h2>
        <h2>Expenses</h2>
        <h2>Paid</h2>
        <h2>Balance</h2>
      </div>
      {Object.keys(members).map((memberUid, i) => {
        const balance = (groupData.spent[memberUid] ?? 0) - (groupData.expenses[memberUid] ?? 0);
        const balanceString = formatToDigit(balance);

        return (
          <div
            key={i}
            className="odd:bg-wheat-400/20 grid w-full grid-cols-4 items-center justify-items-center px-4 py-2"
          >
            <p>{members[memberUid].displayName}</p>
            <p>{formatToDigit(groupData.expenses[memberUid] ?? 0)}</p>
            <p>{formatToDigit(groupData.spent[memberUid] ?? 0)}</p>
            <p>{balance < 0 ? `(${balanceString.replaceAll('-', '')})` : balanceString}</p>
          </div>
        );
      })}
    </>
  );
};

const PayoutOverlay = ({ userBalance, groupData }: { userBalance: UserBalance; groupData: Group }) => {
  const members = groupData.members;

  return (
    <>
      {Object.entries(userBalance.records).map(([lender, record]) =>
        Object.entries(record).map(([borrower, amount]) => {
          if (amount > 0)
            return (
              <div
                key={`${lender}-${borrower}`}
                className="odd:bg-wheat-400/20 grid w-full grid-cols-[repeat(3,1fr)_2fr] items-center justify-items-center px-4 py-2"
              >
                <p className="border-ink-300 h-fit w-fit rounded-lg border px-2">{members[borrower].displayName}</p>
                <p className="middle align-middle">owes</p>
                <p className="border-ink-300 h-fit w-fit rounded-lg border px-2">{members[lender].displayName}</p>
                <p className="font-cascadia-code justify-self-end font-semibold">
                  {formatToDigit(amount)} <span className="text-sm font-light">php</span>
                </p>
              </div>
            );
        }),
      )}
    </>
  );
};

const GroupInfo = ({
  userBalance,
  groupData,
  userGroupUid,
  ref,
}: {
  userBalance: { total: number; records: SimplifiedBalance };
  groupData: Group;
  userGroupUid: string | undefined;
  ref: RefObject<HTMLDivElement | null>;
}) => {
  const { setShowPopup, setPopup } = usePopupOverlay();

  const handleShowBreakdownClicked = () => {
    const breakdownPopup: PopupOverlay = {
      type: 'popup-overlay',
      title: 'Breakdown',
      options: {
        padding: {
          x: 0,
          y: 4,
        },
      },
      body: <BreakdownOverlay userBalance={userBalance} groupData={groupData} />,
    };

    setPopup(breakdownPopup);
    setShowPopup(true);
  };

  const handleShowPayoutsClicked = () => {
    const payoutsOverlay: PopupOverlay = {
      type: 'popup-overlay',
      title: 'Payouts',
      options: {
        padding: {
          x: 0,
          y: 4,
        },
      },
      body: <PayoutOverlay userBalance={userBalance} groupData={groupData} />,
    };

    setPopup(payoutsOverlay);
    setShowPopup(true);
  };

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
      <div className="flex flex-row gap-2">
        <div
          onClick={handleShowBreakdownClicked}
          className="border-wheat-400 cursor-pointer rounded-xl border px-3 py-1"
        >
          See Breakdown
        </div>
        <div onClick={handleShowPayoutsClicked} className="border-wheat-400 cursor-pointer rounded-xl border px-3 py-1">
          See Payouts
        </div>
      </div>
    </section>
  );
};

const Group = memo(function Group() {
  const { group: groupParam } = useParams();
  const { group, userGroupId, loading: groupLoading } = useGroupListener(groupParam!);
  const groupData = group?.data();

  const { transactions, loading, getPage, endReached, reload, isEmpty } = useTransactions(groupParam!);

  const menuRef = useRef<HTMLDivElement>(null);

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

  // -----------------------------------
  // Component Render
  // -----------------------------------

  return groupLoading ? (
    <Loading />
  ) : (
    <>
      <div className="relative flex shrink-0 grow flex-col pt-3">
        <main className="flex h-full flex-col items-stretch">
          <GroupInfo userBalance={userBalance} groupData={groupData!} userGroupUid={userGroupId} ref={menuRef} />
          <section className="font-outfit flex h-full flex-col rounded-t-3xl px-3 pb-24">
            {isEmpty ? (
              <>No Transactions</>
            ) : (
              Object.entries(transactions).map(([month, txns]) => {
                const date = new Date(month);
                return (
                  <Fragment key={month}>
                    <div className="text-leather-900 my-6 flex w-full flex-row items-baseline justify-between px-3">
                      <h2 className="text-2xl">
                        {format(date, 'MMMM')} <span className="font-bold">{format(date, 'yyyy')}</span>
                      </h2>
                    </div>
                    <div className="flex flex-col gap-2">
                      {txns.map((txn) => (
                        <TransactionCard
                          key={txn.id}
                          groupId={group!.id}
                          currGroup={group!}
                          userGroupId={userGroupId!}
                          transaction={txn}
                        />
                      ))}
                    </div>
                  </Fragment>
                );
              })
            )}
          </section>
        </main>
      </div>
    </>
  );
});

export default Group;
