import {
  useState,
  memo,
  useCallback,
  useRef,
  ReactNode,
  RefObject,
  useMemo,
  useEffect,
  Fragment,
  ChangeEvent,
} from 'react';
import useGroupListener from '@/features/groups/hooks/useGroupListener';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
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
import { PopupConfirmation, PopupMenu, PopupOverlay } from '@/features/popup-menu/types';
import { Menu, ArrowLeft, X, Check } from 'lucide-react';

// Custom Hooks
import useTransactions from '@/features/transactions/hooks/useTransactions';
import { useGroupDebugOptions } from '@/features/groups/utils/debuggerFunctions';
import { usePopupOverlay } from '@/features/popup-menu/hooks/usePopupOverlay';
import useFab from '@/features/fab/hooks/useFab';
import FAB from '@/features/fab/components/FAB';
import useDeleteTransactions from '@/features/transactions/hooks/useDeleteTransactions';
import { Transaction } from '@/features/transactions/types';

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
        Object.entries(record).map(([borrower, amount], i) => {
          if (amount > 0)
            return (
              <div
                key={i}
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

const SelectionFab = ({
  selections: { selection, setSelection, setIsSelecting },
  onClose: handleClose = () => {},
  onDelete: handleDelete = () => {},
}: {
  selections: {
    selection: Record<string, Transaction>;
    setSelection: (val: Record<string, Transaction>) => void;
    setIsSelecting: (val: boolean) => void;
  };
  onClose?: () => any;
  onDelete?: () => any;
}) => {
  return (
    <FAB dropOnClick={false} bgColor="bg-accent-200" className="absolute bottom-6 left-1/2 z-5 w-fit -translate-x-1/2">
      <div className="flex flex-row text-black">
        <div className="border-ink-800 flex w-40 flex-row justify-between gap-2 border-r px-4">
          <X className="cursor-pointer" onClick={handleClose} />{' '}
          <p className="grow text-center">{Object.keys(selection).length} Selected</p>
        </div>
        <div className="flex cursor-pointer flex-row gap-2 px-8 text-nowrap" onClick={handleDelete}>
          Delete Selected
        </div>
      </div>
    </FAB>
  );
};

const RenameOverlay = ({
  initialGroupName,
  updateName,
  onSubmit: handleSubmit,
}: {
  initialGroupName: string;
  updateName: (val: string) => any;
  onSubmit: () => any;
}) => {
  const [groupName, setGroupName] = useState(initialGroupName);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextGroupName = e.currentTarget.value;
    setGroupName(nextGroupName);
  };

  const handlePreSubmit = () => {
    updateName(groupName);
    handleSubmit();
  };

  return (
    <form className="flex w-full flex-col items-center gap-2 py-8" onSubmit={handlePreSubmit}>
      <input
        className="border-charcoal-300 focus:outline-accent-400/60 [.error]:placeholder:text-error w-full rounded-md border bg-white px-2 py-1 focus:outline-2"
        type="text"
        value={groupName}
        onChange={handleChange}
        autoFocus
      />
      <Panel bgColor="bg-accent-200 [.inactive]:bg-ink-300" padding="px-2 py-0.5" onClick={handlePreSubmit}>
        Submit
      </Panel>
    </form>
  );
};

const GroupInfo = ({
  userBalance,
  groupData,
  userGroupUid,
  updateName,
  deleteGroup,
  selections: { selection, setSelection, setIsSelecting },
  customFab: { customFab, setCustomFab },
  onDelete,
  setForceLoading,
}: {
  userBalance: { total: number; records: SimplifiedBalance };
  groupData: Group;
  userGroupUid: string | undefined;
  updateName: (val: string) => any;
  deleteGroup: () => any;
  selections: {
    selection: Record<string, Transaction>;
    setSelection: (val: Record<string, Transaction>) => void;
    setIsSelecting: (val: boolean) => void;
  };
  customFab: { customFab: boolean; setCustomFab: (val: boolean) => any };
  onDelete: () => any;
  setForceLoading: (val: boolean) => any;
}) => {
  // Refernces
  const menuRef = useRef<HTMLDivElement>(null);

  // Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const { setShowPopup, setPopup, resetPopup } = usePopupOverlay();
  const { group: groupParam } = useParams();
  const { setFab, resetFab, setShowFab } = useFab(groupParam);

  // Local States

  // ------------------------
  // Effect
  // ------------------------

  useEffect(() => {
    if (!customFab) return;

    setFab(<SelectionFabMemo selection={selection} />);
  }, [selection]);

  // ------------------------
  // Event Listeners
  // ------------------------

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
    const handleRenameSubmit = () => {};

    const renamePopup: PopupOverlay = {
      type: 'popup-overlay',
      title: 'Rename Group',
      body: <RenameOverlay initialGroupName={groupData.name} onSubmit={() => resetPopup()} updateName={updateName} />,
    };

    const menuPopup: PopupMenu = {
      type: 'menu',
      options: [
        {
          label: 'Rename Group',
          action: () => {
            setPopup(renamePopup);
          },
        },
        {
          label: 'Select Items',
          action: () => {
            resetPopup();
            setCustomFab(true);
            setIsSelecting(true);
            setFab(<SelectionFabMemo selection={selection} />);
          },
        },
        {
          label: 'Leave Group',
          action: async () => {
            const confirmationPopup: PopupConfirmation = {
              type: 'popup-confirmation',
              title: 'Delete Group',
              body: `Are you sure you want to delete '${groupData.name}'?`,
              confirmCallback: async () => {
                setForceLoading(true);
                setShowFab(false);

                await deleteGroup();
                navigate(ROUTES.APP);
              },
            };

            setPopup(confirmationPopup);
          },
        },
      ],
      reference: menuRef,
    };

    setPopup(menuPopup);
    setShowPopup(true);
  }, []);

  const handleSelectionClosed = () => {
    setCustomFab(false);
    setIsSelecting(false);
    resetFab();
  };

  // ------------------------
  // Component Renders
  // ------------------------

  const MenuMemo = memo(() => <Menu onClick={handleMenuClicked} className="w-8 cursor-pointer" />);

  const SelectionFabMemo = memo(({ selection }: { selection: Record<string, Transaction> }) => (
    <SelectionFab
      selections={{ selection, setSelection, setIsSelecting }}
      onClose={handleSelectionClosed}
      onDelete={onDelete}
    />
  ));

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
            <div className="flex cursor-pointer flex-row">
              {[...Array(3)].map((_, i) => {
                const member = Object.values(groupData?.members!)[i];
                console.log('photo url: ', member?.photoUrl);
                return (
                  <UserIcon
                    key={i}
                    imageUrl={member?.photoUrl ?? ''}
                    bgColor="bg-wheat-400"
                    border="border-wheat-200"
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="mb-4 flex w-full flex-row items-center justify-between" ref={menuRef}>
          <h1 className="font-gieonto text-left text-4xl font-medium">{groupData?.name}</h1>
          <div className="p1 border-wheat-400 bg-wheat-200 flex h-8 w-8 items-center justify-center rounded-lg border">
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
  const { group, userGroupId, updateName, deleteGroup, loading: groupLoading } = useGroupListener(groupParam!);
  const groupData = group?.data();
  const {
    transactions,
    loading: transactionLoading,
    getPage,
    endReached,
    reload,
    isEmpty,
    removeTransactions,
  } = useTransactions(groupParam!);
  const deleteTransactions = !groupLoading ? useDeleteTransactions(groupParam!, groupData!) : undefined;
  const { resetFab, setShowFab } = useFab(groupParam);

  // Local States

  const [forceLoading, setForceLoading] = useState(false);
  const [selection, setSelection] = useState<Record<string, Transaction>>({});
  const [isSelecting, setIsSelecting] = useState(false);
  const [customFab, setCustomFab] = useState(false);

  // Computed Variables

  const loading = forceLoading || groupLoading;

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
  // Effects
  // -----------------------------------

  useEffect(() => {
    setSelection({});
  }, [isSelecting]);

  // -----------------------------------
  // Event Listeners
  // -----------------------------------

  const transactionSelectionPressed = (id: string, txn: Transaction) => () => {
    if (!isSelecting) return;

    const nextSelections = { ...selection };

    if (id in selection) delete nextSelections[id];
    else nextSelections[id] = txn;

    setSelection(nextSelections);
  };

  const handleDelete = async () => {
    if (!deleteTransactions) return;

    setForceLoading(true);
    setIsSelecting(false);
    setCustomFab(false);
    setShowFab(false);
    await deleteTransactions(selection); // Delete Transaction from Database

    // setForceLoading(false);
    // removeTransactions(selection); // Remove from Transaction Array (view display)
    // resetFab();
    window.location.reload();
  };

  // -----------------------------------
  // Component Render
  // -----------------------------------

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="relative flex shrink-0 grow flex-col pt-3">
        <main className="flex h-full flex-col items-stretch">
          <GroupInfo
            userBalance={userBalance}
            groupData={groupData!}
            userGroupUid={userGroupId}
            updateName={updateName}
            deleteGroup={deleteGroup}
            selections={{ selection, setSelection, setIsSelecting }}
            customFab={{ customFab, setCustomFab }}
            onDelete={handleDelete}
            setForceLoading={setForceLoading}
          />
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
                      {txns.map((txn) => {
                        // const selected = selection.has(txn.id);
                        const selected = txn.id in selection;

                        return (
                          <div
                            key={txn.id}
                            className={`${isSelecting && 'selecting'} flex flex-row items-center gap-2 [.selecting]:cursor-pointer`}
                            onClick={transactionSelectionPressed(txn.id, txn)}
                          >
                            {isSelecting && (
                              <>
                                <input type="checkbox" checked={selected} readOnly className="sr-only" />
                                <div
                                  className={`${selected && 'selected'} [.selected]:bg-accent-200 flex aspect-square h-6 w-6 items-center justify-center rounded-full border-[1.5px] border-black`}
                                >
                                  {selected && <Check className="w-4" />}
                                </div>
                              </>
                            )}
                            <TransactionCard
                              groupId={group!.id}
                              currGroup={group!}
                              userGroupId={userGroupId!}
                              transaction={txn}
                              disable={isSelecting}
                              selected={selected}
                            />
                          </div>
                        );
                      })}
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
