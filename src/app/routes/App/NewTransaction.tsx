import {
  useState,
  useEffect,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
  type KeyboardEvent,
  RefObject,
  ForwardedRef,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { type DocumentSnapshot } from 'firebase/firestore';
import { auth } from '@/lib/firebase/auth';
import { format } from 'date-fns';
import { buttonHandleKeypress } from '@/util/buttonHandleKeypress';
import { getMemberPhotoUrl } from '@/features/groups/utils/memberUtil';
import { BalancedSplit, ItemizedSplit, SplitData, Transaction } from '@/features/transactions/types';
import { capitalize, formattedStrToNum } from '@/util/helpers';
import { formatValue as formatToDigit } from '@/hooks/useDigitField';

// Import Custom Components
import SplitTransactionPage from '@/features/new-transaction/components/SplitTransaction';
import Panel from '@/components/neubrutalist/Panel';
import { User as UserIcon, ListFilter } from 'lucide-react';
import DatePicker from '@/features/date-picker/DatePicker';
import Loading from '@/components/Loading';

// Import Custom Hooks
import { usePopupMenu } from '@/features/popup-menu/hooks/usePopupMenu';
import { useGroups } from '@/features/groups/hooks/useGroups';
import { Group } from '@/features/groups/types';
import { SplitRef, FormRef } from '@/features/transactions/types';
import useDigitField, { DigitField } from '@/hooks/useDigitField';
import useInputField from '@/hooks/useInputField';
import useAddTransaction from '@/features/transactions/hooks/useAddTransaction';

const TransactionForm = forwardRef(
  (
    {
      total: { value: total, setValue: setTotal, handleChange: handleTotalChanged },
      currGroup,
      setShowSplitPage,
      paidBy: [paidById, setPaidById],
      date: [date, setDate],
      splitData,
      memberPhotoUrls,
    }: {
      total: DigitField;
      currGroup?: DocumentSnapshot<Group>;
      setShowSplitPage: (val: boolean) => any;
      paidBy: [string, (val: string) => any];
      date: [number, (val: number) => any];
      splitData: SplitData;
      memberPhotoUrls: Record<string, string | undefined>;
    },
    ref: ForwardedRef<FormRef>,
  ) => {
    // ------------------------------
    // Hooks
    // ------------------------------

    const { setShowPopup, setPopup, resetPopup } = usePopupMenu();

    // ------------------------------
    // States
    // ------------------------------

    // Form States
    // const { value: total, setValue: setTotal, handleChange: handleTotalChanged } = useDigitField();
    const { value: description, handleChange: handleDescriptionChanged } = useInputField('');

    // Local States
    const [showPaidBy, setShowPaidby] = useState(false);

    // ------------------------------
    // Computed Values
    // ------------------------------

    const paidByName =
      currGroup && paidById in currGroup.data()?.members!
        ? currGroup.data()?.members[paidById].displayName
        : auth.currentUser!.displayName;
    const paidByPhotoUrl = paidById in memberPhotoUrls ? memberPhotoUrls[paidById] : undefined;
    const groupName: string = currGroup && currGroup.data() ? currGroup.data()!.name : ' ';
    const dateString = format(date, 'dd/MM/yy');
    const timeString = format(date, 'K:mm aaa');

    // Update PaidById to the groupId of user so the uids match.
    // (groupUID might be different from users uid)
    useEffect(() => {
      if (!currGroup) return;

      if (paidById == auth.currentUser!.uid) {
        const member = Object.entries(currGroup!.data()!.members).find(
          ([key, val]) => val.linkedUid == auth.currentUser!.uid,
        );
        setPaidById(member && member[0] ? member[0] : Object.keys(currGroup!.data()!.members)[0]);
      }
    }, [currGroup]);

    // Update the popup when the currGroup or memberPhotoUrls has finished loading
    useEffect(() => {
      if (!currGroup || !showPaidBy) return;

      handlePaidByClicked();
    }, [currGroup, memberPhotoUrls]);

    // ------------------------------
    // Imperative Handle for Ref
    // ------------------------------

    useImperativeHandle(ref, () => ({
      getData: () => ({
        testData: 'this is some test data',
      }),
    }));

    // ------------------------------
    // Event Handlers
    // ------------------------------

    // Call Paid By Popup
    const handlePaidByClicked = () => {
      const members = currGroup?.data() ? (currGroup.data()?.members ? currGroup.data()!.members : {}) : {};

      const handleMemberClicked = (memberId: string) => () => {
        setPaidById(memberId);
        setShowPopup(false);
        setShowPaidby(false);
      };

      const handlePayerKeyDown = (memberId: string) => (e: KeyboardEvent) => {
        if (e.key == 'Enter' || e.key == ' ') {
          handleMemberClicked(memberId)();
        }
      };

      const memberList = (
        <div className="flex flex-col gap-2">
          {Object.entries(members).map(([memberId, member]) => (
            <div
              key={memberId}
              role="button"
              tabIndex={0}
              onKeyDown={handlePayerKeyDown(memberId)}
              onClick={handleMemberClicked(memberId)}
              className="relative flex h-8 cursor-pointer flex-row items-center"
            >
              <div
                className="border-ink-400 absolute left-0 flex h-8 w-8 items-center justify-center rounded-lg border bg-cover"
                style={{ backgroundImage: `url('${memberPhotoUrls[memberId]}')` }}
              >
                {!memberPhotoUrls[memberId] && <UserIcon className="text-ink-400" />}
              </div>
              <p className="grow">{member.displayName}</p>
            </div>
          ))}
        </div>
      );

      setPopup((prev) => ({
        title: 'Paid By',
        body: memberList,
        closeCallback: () => setShowPaidby(false),
      }));

      setShowPaidby(true);
      setShowPopup(true);
    };

    // Call DatePicker Popup
    const handleDateClicked = async () => {
      let _selectedDate: Date | undefined = new Date(date);
      const handleDoneCLicked = () => {
        if (_selectedDate) {
          setDate(_selectedDate.getTime());
        }
        resetPopup();
      };

      // DatePicker Popup JSX
      const PopupElement = () => (
        <>
          <DatePicker
            initialDate={new Date(date)}
            setDateSelected={(date: Date | undefined) => {
              _selectedDate = date;
            }}
          />
          <div className="mt-4 flex w-full flex-row justify-end gap-2">
            <input
              type="button"
              value="Cancel"
              onClick={resetPopup}
              className="border-ink-400 rounded-xl border px-2 py-1"
            />
            <input
              type="button"
              value="Done"
              onClick={handleDoneCLicked}
              className="bg-accent-200 rounded-xl border px-2 py-1"
            />
          </div>
        </>
      );

      setPopup((prev) => ({
        title: 'Date',
        body: <PopupElement />,
      }));

      setShowPopup(true);
    };

    return (
      <form className="min-w-80 px-2 outline-none">
        <div className="m-auto max-w-120 border border-black bg-white p-6">
          <div className="border-ink-400 relative flex flex-col border-b border-dashed py-6">
            <input
              id="total"
              type="text"
              autoComplete="off"
              step="off"
              min="0"
              inputMode="decimal"
              className={`peer w-full rounded-md border-0 text-center text-4xl font-bold outline-none`}
              maxLength={32}
              onChange={handleTotalChanged}
              value={total}
              readOnly={splitData.type == 'itemized'}
              autoFocus
            />
            <div className="flex flex-row items-end justify-center">
              <label htmlFor="total" className="text-ink-400 pr-2 text-sm font-light">
                Total Amount
              </label>
              <p className="font-bold">(PHP)</p>
            </div>
            {splitData.type == 'itemized' && (
              <p className="text-ink-400 text-sm font-light">(Total Amount cannot be edited for itemized split type)</p>
            )}
          </div>
          <div className="border-ink-400 relative flex flex-col gap-2 border-b border-dashed py-6 text-base">
            <p className="text-ink-400 mb-2 font-light">(Tap on items to edit)</p>
            <div className="flex flex-row items-center">
              <label htmlFor="description" className="text-ink-400 text-sm font-light">
                Description:
              </label>
              <input
                id="description"
                type="text"
                autoComplete="off"
                step="off"
                min="0"
                inputMode="text"
                className={`${description == '' && 'empty'} placeholder-ink-400 w-full rounded-md border-0 text-right font-medium outline-none [.empty]:font-normal`}
                maxLength={32}
                value={description}
                placeholder="Add a description"
                onChange={handleDescriptionChanged}
              />
            </div>
            <div className="flex flex-row items-center">
              <label htmlFor="paid_by" className="text-ink-400 text-sm font-light">
                Paid By:
              </label>
              <div className="flex grow flex-row items-center justify-end gap-2">
                <div
                  className="border-ink-400 flex h-5 w-5 items-center justify-center overflow-clip rounded-full border bg-cover"
                  style={{
                    backgroundImage: `url('${paidByPhotoUrl}')`,
                  }}
                >
                  {paidByPhotoUrl == undefined && <UserIcon className="text-ink-400 h-4 w-4" />}
                </div>
                <input
                  id="paid_by"
                  type="button"
                  className={`w-fit cursor-pointer rounded-md border-0 text-right font-medium outline-none`}
                  value={paidByName ?? ''}
                  onClick={handlePaidByClicked}
                />
              </div>
            </div>
            <div className="flex flex-row items-center">
              <label htmlFor="date" className="text-ink-400 text-sm font-light">
                Date:
              </label>
              <div
                id="date"
                role="button"
                tabIndex={0}
                onKeyDown={buttonHandleKeypress(handleDateClicked)}
                className={`flex w-1 grow cursor-pointer flex-col rounded-md border-0 text-right font-medium outline-none`}
                onClick={handleDateClicked}
              >
                {dateString} <span className="text-ink-400 text-sm font-normal">{`(${timeString})`}</span>
              </div>
            </div>
          </div>
          <div className="border-ink-400 relative flex flex-col gap-1 border-b border-dashed py-6 text-base">
            <div className="flex flex-row justify-between">
              <label htmlFor="description" className="text-ink-400 text-sm font-light">
                Group:
              </label>
              <button type="button" className="border-ink-400 rounded-md border px-3 py-0.5">
                {groupName}
              </button>
            </div>
          </div>
          <div className="border-ink-400 relative flex flex-col gap-1 border-b border-dashed py-6 text-base">
            <div className="flex flex-row items-center justify-between">
              <label htmlFor="split-type" className="text-ink-400 text-sm font-light">
                Split Type:
              </label>
              <input
                type="button"
                name="split-type"
                id="split-type"
                className="border-ink-400 rounded-md border px-3 py-0.5"
                onClick={() => setShowSplitPage(true)}
                value={capitalize(splitData.type)}
              />
            </div>
          </div>
          <div className="relative flex flex-col gap-1 py-6 text-base">
            {splitData.type == 'balanced' && (
              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between">
                  <label htmlFor="balanced-split" className="text-ink-400 text-left text-sm font-light">
                    Per member:
                  </label>
                  <input
                    type="text"
                    name="balanced-split"
                    id="balanced-split"
                    className="field-sizing-content py-0.5 outline-0"
                    readOnly={true}
                    value={(() => {
                      const totalNum = formattedStrToNum(total);
                      const toSplit = splitData.data.payingMembers.size;
                      const splitTotal = formatToDigit(Math.floor(totalNum / toSplit));
                      return `php ${splitTotal}`;
                    })()}
                  />
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="user-icons -gap-2 flex">
                    {[...splitData.data.payingMembers].map((memberGroupId) => {
                      const photoUrl = memberPhotoUrls[memberGroupId];
                      return (
                        <div
                          {...(photoUrl && {
                            style: {
                              backgroundImage: `url(${photoUrl})`,
                            },
                          })}
                          data-testid="balanced-member-photo"
                          className="h-6 w-6 rounded-full border border-white bg-gray-200 bg-cover not-first:-ml-1"
                        />
                      );
                    })}
                  </div>
                  <p className="text-ink-400 text-sm">
                    {splitData.data.payingMembers.size} split{splitData.data.payingMembers.size > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    );
  },
);

const TransactionBreakdown = ({ splitData, total }: { splitData: SplitData; total: string }) => {
  const personalAmtNum = useMemo(
    () => Math.floor(formattedStrToNum(total) / (splitData.data as BalancedSplit).payingMembers.size),
    [total, splitData],
  );
  const personalAmt = formatToDigit(personalAmtNum);

  return (
    <div className="mt-6 flex w-full max-w-130 flex-col gap-4 rounded-xl bg-black px-3 py-4">
      <div className="flex cursor-pointer flex-row items-center justify-end gap-2 text-white">
        <p className="font-extralight">filter member</p>
        <ListFilter className="h-4 w-4" />
      </div>
      <div className="bg-accent-200 flex flex-col items-center justify-center rounded-xl py-3">
        <input
          id="personal-share"
          name="personal-share"
          type="text"
          readOnly={true}
          value={personalAmt}
          className="field-sizing-content text-4xl font-bold outline-0"
        />
        <label htmlFor="personal-share" className="text-xl font-light">
          Your Share
        </label>
      </div>
      <div className="flex flex-col gap-2 px-2 text-white">
        <h3 className="w-fit">Breakdown</h3>
        <div className="flex justify-between">
          <label className="text-sm font-extralight">Even Split</label>
          <input type="text" value={personalAmt} className="field-sizing-content font-light" />
        </div>
      </div>
    </div>
  );
};

const NewTransaction = () => {
  // Declare Refs
  const splitRef = useRef<SplitRef>(null);
  const formRef = useRef<FormRef>(null);

  // Call Hooks
  const { groups, loading } = useGroups();
  const location = useLocation();
  const navigate = useNavigate();

  // Local States
  const [groupId, setGroupId] = useState(location.state?.groupId);
  const [showSplitPage, setShowSplitPage] = useState(false);
  const returnRoute = location.state?.groupId ? `${ROUTES.GROUPS}/${groupId}` : ROUTES.APP;
  // We use a state instead of a computed value here since useMemo can't handle async values
  const [memberPhotoUrls, setMemberPhotoUrls] = useState<Record<string, string | undefined>>({});

  // Late Hooks
  const addTransaction = useAddTransaction(groupId);

  // ------------------------------
  // Computed Values
  // ------------------------------

  const currGroup = useMemo(() => {
    let currGroupId: string = groupId;
    if (!groupId || loading) return undefined;

    if (!groupId) {
      const firstGroup = groups[0];
      currGroupId = firstGroup.id;
    }

    const currGroup = groups.find((group) => group.id == currGroupId);
    return currGroup;
  }, [groupId, loading]);

  // ------------------------------
  // Effects
  // ------------------------------

  // Get all member photoUrls every time currGroup has updated
  useEffect(() => {
    if (!currGroup) return;

    const fetchMemberPhotoUrls = async () => {
      const group = currGroup.data()!;
      const groupMembers = group.members;
      const photoUrlsArray = await Promise.all(
        Object.keys(groupMembers).map(async (key) => {
          const photoUrl = await getMemberPhotoUrl(group, key);
          return { key, photoUrl };
        }),
      );

      // convert the array of entries into an actual Record Object
      const photoUrlsObject = photoUrlsArray.reduce((acc: Record<string, string | undefined>, { key, photoUrl }) => {
        acc[key] = photoUrl;
        return acc;
      }, {});

      setMemberPhotoUrls(photoUrlsObject);
    };

    fetchMemberPhotoUrls();
  }, [currGroup]);

  // Update the groupIds after groups are done loading
  useEffect(() => {
    if (loading) return;

    if (!groupId) {
      const firstGroup = groups[0];
      setGroupId(firstGroup.id);
    }
  }, [loading]);

  useEffect(() => {
    const nextSplitData: SplitData = {
      type: 'balanced',
      data: {
        payingMembers: new Set([...Object.keys(currGroup?.data()?.members ?? {})]),
      },
    };

    const isDefined = splitData != undefined && splitData != null;
    const isBalancedSplit: boolean = isDefined && splitData.type == 'balanced';
    const nextPayingMembers: string = [...(nextSplitData.data as BalancedSplit).payingMembers].join('|');
    const prevPayingMembers: string =
      isDefined && isBalancedSplit ? [...(splitData.data as BalancedSplit).payingMembers].join('|') : '';
    const isNewMembers: boolean = nextPayingMembers != prevPayingMembers;
    const updateSplitData = !isDefined || (isBalancedSplit && isNewMembers);

    if (updateSplitData) setSplitData(nextSplitData);
  }, [currGroup]);

  // ------------------------------
  // Form States
  // ------------------------------

  const { value: total, setValue: setTotal, handleChange: handleTotalChanged } = useDigitField();
  const [date, setDate] = useState(Date.now());
  const [paidBy, setPaidBy] = useState(auth.currentUser!.uid);
  const [splitData, setSplitData] = useState<SplitData>({ type: 'balanced', data: { payingMembers: new Set() } });

  // ------------------------------
  // Event Handlers
  // ------------------------------

  const handleCancelClicked = () => {
    if (!showSplitPage) {
      console.log('returning to route: ', returnRoute);
      navigate(returnRoute);
    } else {
      setShowSplitPage(false);
    }
  };

  const handleDoneClicked = () => {
    if (!showSplitPage) {
      const formData = formRef.current?.getData();
      const splitData = splitRef.current?.getData();

      console.log('ref data:', formData, splitData);

      const transactionData: Transaction = {
        amount: 0,
        paidBy,
        date,
        splitData: {
          type: 'balanced',
          data: {
            payingMembers: new Set<string>(),
          },
        },
      };

      addTransaction(transactionData);
      navigate(returnRoute);
    } else {
      const isValid = splitRef.current?.verifySplits() ?? true;
      const splitFormData = splitRef.current?.getData();
      const nextSplitData = splitFormData?.splitData;

      if (!isValid) return;

      setSplitData(nextSplitData!);
      setTotal(formatToDigit(splitFormData?.amount ?? 0));
      setShowSplitPage(false);
    }
  };

  return (
    <div className="relative flex w-full shrink-0 flex-col gap-8 p-3">
      <main className="flex w-full flex-col items-center">
        <div className="mb-4 flex w-full flex-row justify-between">
          <Panel
            bgColor="bg-accent-200"
            className="text-ink-800 flex cursor-pointer flex-row"
            dropOnClick={true}
            onClick={handleCancelClicked}
          >
            {!showSplitPage ? 'Cancel' : 'Back'}
          </Panel>
          <div className="right-0 cursor-pointer">
            <Panel
              bgColor="bg-accent-200"
              className="text-ink-800 flex flex-row"
              dropOnClick={true}
              onClick={handleDoneClicked}
            >
              {!showSplitPage ? 'Done' : 'Continue'}
            </Panel>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : !showSplitPage ? (
          <>
            <TransactionForm
              ref={formRef}
              total={{ value: total, setValue: setTotal, handleChange: handleTotalChanged }}
              setShowSplitPage={setShowSplitPage}
              currGroup={currGroup}
              paidBy={[paidBy, setPaidBy]}
              date={[date, setDate]}
              splitData={splitData}
              memberPhotoUrls={memberPhotoUrls}
            />
            <TransactionBreakdown total={total} splitData={splitData} />
          </>
        ) : (
          <SplitTransactionPage
            ref={splitRef}
            splitType={splitData.type}
            total={[total, setTotal]}
            currGroup={currGroup}
            memberPhotoUrls={memberPhotoUrls}
            splitData={splitData}
          />
        )}
      </main>
    </div>
  );
};

export default NewTransaction;
