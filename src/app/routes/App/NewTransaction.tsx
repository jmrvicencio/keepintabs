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
import { capitalize } from '@/util/helpers';

// Import Custom Components
import SplitTransactionPage from '@/features/new-transaction/components/SplitTransaction';
import Panel from '@/components/neubrutalist/Panel';
import { User as UserIcon } from 'lucide-react';
import DatePicker from '@/features/date-picker/DatePicker';

// Import Custom Hooks
import { usePopupMenu } from '@/features/popup-menu/hooks/usePopupMenu';
import { useGroups } from '@/features/groups/hooks/useGroups';
import { Group } from '@/features/groups/types';
import { SplitType, SplitRef, FormRef } from '@/features/transactions/types';
import useDigitField from '@/hooks/useDigitField';
import useInputField from '@/hooks/useInputField';
import useAddTransaction from '@/features/transactions/hooks/useAddTransaction';

type CombinedSplitType = BalancedSplit | ItemizedSplit;

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

  // Update the groupIds after groups are done loading
  useEffect(() => {
    if (loading) return;

    if (!groupId) {
      const firstGroup = groups[0];
      setGroupId(firstGroup.id);
    }
  }, [loading]);

  useEffect(() => {
    const nextSplitData = {
      payingMembers: new Set([...Object.keys(currGroup?.data()?.members ?? {})]),
    };

    const isDefined: boolean = splitData != undefined;
    const nextPayingMembers: string = [...nextSplitData.payingMembers].join('|');
    const prevPayingMembers: string = isDefined ? [...(splitData as BalancedSplit).payingMembers].join('|') : '';
    const isNewMembers: boolean = nextPayingMembers != prevPayingMembers;
    const updateSplitData = !isDefined || isNewMembers;

    if (updateSplitData) setSplitData(nextSplitData);
  }, [currGroup]);

  // ------------------------------
  // Form States
  // ------------------------------

  const [date, setDate] = useState(Date.now());
  const [paidBy, setPaidBy] = useState(auth.currentUser!.uid);
  const [splitData, setSplitData] = useState<CombinedSplitType>();

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
          splitType: 'balanced',
          splitData: {
            payingMembers: new Set<string>(),
          },
        },
      };

      addTransaction(transactionData);
      navigate(returnRoute);
    } else {
      debugger;
      // TODO: Make "Done" set the splitData on the transaction
      const testData = splitRef.current?.getData();
      console.log('this is test data:\n', testData);

      setShowSplitPage(false);
    }
  };

  return (
    <div className="relative flex w-full shrink-0 flex-col gap-8 p-3">
      <main className="flex w-full flex-col">
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
        <TransactionForm
          ref={formRef}
          showSplitPage={showSplitPage}
          setShowSplitPage={setShowSplitPage}
          currGroup={currGroup}
          paidBy={[paidBy, setPaidBy]}
          date={[date, setDate]}
          splitData={[splitData ?? { payingMembers: new Set() }, setSplitData]}
          splitRef={splitRef}
        />
      </main>
    </div>
  );
};

const TransactionForm = forwardRef(
  (
    {
      currGroup,
      showSplitPage,
      setShowSplitPage,
      paidBy: [paidById, setPaidById],
      date: [date, setDate],
      splitData: [splitData, setSplitData],
      splitRef,
    }: {
      currGroup?: DocumentSnapshot<Group>;
      showSplitPage: boolean;
      setShowSplitPage: (val: boolean) => any;
      paidBy: [string, (val: string) => any];
      date: [number, (val: number) => any];
      splitData: [CombinedSplitType, (val: CombinedSplitType) => any];
      splitRef: RefObject<SplitRef | null>;
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
    const { value: total, setValue: setTotal, handleChange: handleTotalChanged } = useDigitField();
    const { value: description, handleChange: handleDescriptionChanged } = useInputField('');
    const [splitType, setSplitType] = useState<SplitType>('balanced');

    // We use a state instead of a computed value here since useMemo can't handle async values
    const [memberPhotoUrls, setMemberPhotoUrls] = useState<Record<string, string | undefined>>({});

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
                className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-lg border bg-cover"
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

    return !showSplitPage ? (
      <form className="px-4 outline-none">
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
              autoFocus
            />
            <div className="flex flex-row justify-center">
              <label htmlFor="total" className="text-ink-400 pr-2 text-sm font-light">
                Total Amount
              </label>
              <p className="font-bold">(PHP)</p>
            </div>
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
                  className="flex h-6 w-6 items-center justify-center overflow-clip rounded-full border bg-cover"
                  style={{
                    backgroundImage: `url('${paidByPhotoUrl}')`,
                  }}
                >
                  {paidByPhotoUrl == undefined && <UserIcon className="text-ink-400 h-5 w-5" />}
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
              <button
                name="split-type"
                id="split-type"
                type="button"
                className="border-ink-400 rounded-md border px-3 py-0.5"
                onClick={() => setShowSplitPage(true)}
              >
                {capitalize(splitType)}
              </button>
            </div>
          </div>
        </div>
      </form>
    ) : (
      <SplitTransactionPage
        ref={splitRef}
        splitType={[splitType, setSplitType]}
        total={[total, setTotal]}
        currGroup={currGroup}
        memberPhotoUrls={memberPhotoUrls}
        splitData={splitData}
      />
    );
  },
);

export default NewTransaction;
