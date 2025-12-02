import { useState, useEffect, useMemo, useRef, type MouseEvent } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { auth } from '@/lib/firebase/auth';
import { getMemberPhotoUrl, getUserGroupId } from '@/features/groups/utils/memberUtil';
import {
  BalancedSplit,
  SerializedTransaction,
  SplitData,
  SplitTotal,
  Transaction,
} from '@/features/transactions/types';
import { formattedStrToNum } from '@/util/helpers';
import { formatValue as formatToDigit } from '@/hooks/useDigitField';

// Import Custom Components
import SplitTransactionPage from '@/features/new-transaction/components/SplitTransaction';
import Panel from '@/components/neubrutalist/Panel';
import Loading from '@/components/Loading';
import TransactionForm from '@/features/transactions/components/TransactionForm';
import TransactionBreakdown from '@/features/transactions/components/TransactionBreakdown';

// Import Custom Hooks
import { SplitRef, FormRef } from '@/features/transactions/types';
import useDigitField from '@/hooks/useDigitField';
import useInputField from '@/hooks/useInputField';
import toast from 'react-hot-toast';
import { deserializeTransaction, serializeTransaction } from '@/features/transactions/utils/serializer';
import { getMemberSplitTotals } from '@/features/transactions/utils/splitUtils';
import useFetchTransaction from '@/features/transactions/hooks/useFetchTransaction';
import useFetchGroup from '@/features/groups/hooks/useFetchGroup';
import { Group } from '@/features/groups/types';
import useUpdateTransaction from '@/features/transactions/hooks/useUpdateTransaction';

const TransactionPage = () => {
  // Declare Refs
  const splitRef = useRef<SplitRef>(null);
  const formRef = useRef<FormRef>(null);

  // Call Hooks
  const { group: groupParam, transaction: transactionParam } = useParams();
  const fetchGroup = useFetchGroup(groupParam!);
  const fetchTransaction = useFetchTransaction(groupParam!, transactionParam!);
  const location = useLocation();
  const navigate = useNavigate();

  // Local States
  const [txnData, setTxnData] = useState<Transaction>(location.state?.transaction);
  const [currGroup, setCurrGroup] = useState<Group>(location.state?.groupData);
  const [groupId, setGroupId] = useState(location.state?.groupId);
  const [showSplitPage, setShowSplitPage] = useState(false);
  const returnRoute = groupId ? `${ROUTES.GROUPS}/${groupId}` : ROUTES.APP;
  // We use a state instead of a computed value here since useMemo can't handle async values
  const [memberPhotoUrls, setMemberPhotoUrls] = useState<Record<string, string | undefined>>({});
  const [forceLoading, setForceLoading] = useState(false);
  const [fatalError, setFatalError] = useState<Error>();

  const loading = forceLoading || !txnData || !currGroup;

  if (fatalError) throw fatalError;

  // ------------------------------
  // Form States
  // ------------------------------

  const {
    value: total,
    setValue: setTotal,
    handleChange: handleTotalChanged,
  } = useDigitField(formatToDigit(txnData?.amount));
  const {
    value: description,
    setValue: setDescription,
    handleChange: handleDescriptionChanged,
  } = useInputField(txnData?.description);
  const [date, setDate] = useState(txnData?.date);
  const [paidBy, setPaidBy] = useState(txnData?.paidBy);
  const [splitData, setSplitData] = useState<SplitData>(txnData?.splitData);

  // ------------------------------
  // Computed Values
  // ------------------------------

  const splitTotals: SplitTotal = useMemo(() => {
    if (!splitData) return {};
    return getMemberSplitTotals(formattedStrToNum(total), splitData, paidBy);
  }, [splitData, total]);

  // ------------------------------
  // Effects
  // ------------------------------

  // Get all member photoUrls every time currGroup has updated
  useEffect(() => {
    if (!currGroup) return;

    const fetchMemberPhotoUrls = async () => {
      const group = currGroup;
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

  useEffect(() => {
    if (!currGroup) {
      fetchGroup().then((groupSnap) => {
        if (!groupSnap.exists()) {
          setFatalError(new Error('Test Error'));
          return;
        }

        setCurrGroup(groupSnap.data()!);
        setGroupId(groupSnap.id);
      });
    }
    if (!txnData) {
      fetchTransaction().then((txnSnap) => {
        if (!txnSnap.exists()) {
          setFatalError(new Error('Test Error'));
          return;
        }

        const txn = deserializeTransaction(txnSnap.data()!);
        setTxnData(txn);
        setTotal(formatToDigit(txn.amount));
        setDescription(txn.description);
        setDate(txn.date);
        setPaidBy(txn.paidBy);
        setSplitData(txn.splitData);
      });
    }
  }, []);

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
        const formData: SerializedTransaction = serializeTransaction(formRef.current!.getData());
        console.log(formData);
        setForceLoading(true);
        await updateTransaction(formData, splitTotals);
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

  const updateTransaction = useMemo(
    () => useUpdateTransaction(groupId, transactionParam!, currGroup, txnData),
    [groupId, transactionParam, currGroup, txnData],
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
              currGroup={currGroup}
              paidBy={[paidBy, setPaidBy]}
              date={[date, setDate]}
              splitData={splitData}
              splitTotals={splitTotals}
              memberPhotoUrls={memberPhotoUrls}
            />
            <TransactionBreakdown total={total} splitData={splitData} splitTotals={splitTotals} currGroup={currGroup} />
          </>
        ) : (
          <>
            <SplitTransactionPage
              ref={splitRef}
              splitType={splitData.type}
              total={[total, setTotal]}
              currGroup={currGroup}
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

export default TransactionPage;
