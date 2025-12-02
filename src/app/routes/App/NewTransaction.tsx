import { useState, useEffect, useMemo, useRef, type MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { auth } from '@/lib/firebase/auth';
import { getMemberPhotoUrl, getUserGroupId } from '@/features/groups/utils/memberUtil';
import { BalancedSplit, SplitData, SplitTotal, Transaction } from '@/features/transactions/types';
import { formattedStrToNum } from '@/util/helpers';
import { formatValue as formatToDigit } from '@/hooks/useDigitField';

// Import Custom Components
import SplitTransactionPage from '@/features/new-transaction/components/SplitTransaction';
import Panel from '@/components/neubrutalist/Panel';
import Loading from '@/components/Loading';
import TransactionForm from '@/features/transactions/components/TransactionForm';
import TransactionBreakdown from '@/features/transactions/components/TransactionBreakdown';

// Import Custom Hooks
import { useGroups } from '@/features/groups/hooks/useGroups';
import { SplitRef, FormRef } from '@/features/transactions/types';
import useDigitField from '@/hooks/useDigitField';
import useInputField from '@/hooks/useInputField';
import useAddTransaction from '@/features/transactions/hooks/useAddTransaction';
import toast from 'react-hot-toast';
import { serializeTransaction } from '@/features/transactions/utils/serializer';
import { getMemberSplitTotals } from '@/features/transactions/utils/splitUtils';

const NewTransaction = ({
  total: initialTotal = '0.00',
  date: initialDate = Date.now(),
  paidBy: initialPaidBy = auth.currentUser!.uid,
  splitData: initialSplitData = {
    type: 'balanced',
    data: {
      payingMembers: new Set(),
    },
  },
}: {
  total?: string;
  date?: number;
  paidBy?: string;
  splitData?: SplitData;
}) => {
  // Declare Refs
  const splitRef = useRef<SplitRef>(null);
  const formRef = useRef<FormRef>(null);

  // Call Hooks
  const { groups, loading, setLoading } = useGroups();
  const location = useLocation();
  const navigate = useNavigate();

  // Local States
  const [groupId, setGroupId] = useState(location.state?.groupId);
  const [showSplitPage, setShowSplitPage] = useState(false);
  const returnRoute = location.state?.groupId ? `${ROUTES.GROUPS}/${groupId}` : ROUTES.APP;
  // We use a state instead of a computed value here since useMemo can't handle async values
  const [memberPhotoUrls, setMemberPhotoUrls] = useState<Record<string, string | undefined>>({});

  // ------------------------------
  // Form States
  // ------------------------------

  const { value: total, setValue: setTotal, handleChange: handleTotalChanged } = useDigitField(initialTotal);
  const { value: description, setValue: setDescription, handleChange: handleDescriptionChanged } = useInputField();
  const [date, setDate] = useState(initialDate);
  const [paidBy, setPaidBy] = useState(initialPaidBy);
  const [splitData, setSplitData] = useState<SplitData>(initialSplitData);

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

  const splitTotals: SplitTotal = useMemo(() => {
    return getMemberSplitTotals(formattedStrToNum(total), splitData, paidBy);
  }, [splitData, total]);

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
  // Event Handlers
  // ------------------------------

  const handleCancelClicked = () => {
    if (!showSplitPage) {
      navigate(returnRoute);
    } else {
      setShowSplitPage(false);
    }
  };

  const handleDoneClicked = async () => {
    if (!showSplitPage) {
      try {
        const formData: Transaction = formRef.current!.getData();
        setLoading(true);
        await addTransaction(serializeTransaction(formData), splitTotals);
      } catch (err) {
        const error: Error = err as Error;
        toast.error(error.message);
        throw err;
      } finally {
        navigate(returnRoute);
      }
    } else {
      // From Split Page
      const isValid = splitRef.current?.verifySplits() ?? true;
      const splitFormData = splitRef.current?.getData();
      const nextSplitData = splitFormData?.splitData;

      if (!isValid) return;

      setSplitData(nextSplitData!);
      setTotal(formatToDigit(splitFormData?.amount ?? 0));
      setShowSplitPage(false);
    }
  };

  // ------------------------------
  // Late Hooks
  // ------------------------------

  const addTransaction = useMemo(
    () =>
      useAddTransaction(
        groupId,
        currGroup?.data() ?? { expenses: {}, spent: {}, name: '', members: {}, memberUids: [] },
      ),
    [groupId, currGroup],
  );

  // ------------------------------
  // Component Render
  // ------------------------------

  return loading ? (
    <Loading />
  ) : (
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
        {!showSplitPage ? (
          <>
            <TransactionForm
              ref={formRef}
              total={{ value: total, setValue: setTotal, handleChange: handleTotalChanged }}
              description={{ value: description, setValue: setDescription, handleChange: handleDescriptionChanged }}
              setShowSplitPage={setShowSplitPage}
              currGroup={currGroup!.data()!}
              paidBy={[paidBy, setPaidBy]}
              date={[date, setDate]}
              splitData={splitData}
              splitTotals={splitTotals}
              memberPhotoUrls={memberPhotoUrls}
            />
            <TransactionBreakdown
              total={total}
              splitData={splitData}
              splitTotals={splitTotals}
              currGroup={currGroup!.data()}
            />
          </>
        ) : (
          <>
            <SplitTransactionPage
              ref={splitRef}
              splitType={splitData.type}
              total={[total, setTotal]}
              currGroup={currGroup!.data()}
              memberPhotoUrls={memberPhotoUrls}
              splitData={splitData}
            />
            <Panel
              onClick={handleDoneClicked}
              margin="my-5"
              bgColor="bg-accent-600"
              className="cursor-pointer text-white"
              padding="px-8 py-2"
            >
              Continue
            </Panel>
          </>
        )}
      </main>
    </div>
  );
};

export default NewTransaction;
