import { Transaction } from '@/features/transactions/types';
import { Group } from '../types';
import Panel from '@/components/neubrutalist/Panel';
import { formatValue as formatToDigit } from '@/hooks/useDigitField';
import { getMemberSplitTotals } from '@/features/transactions/utils/splitUtils';

import { format } from 'date-fns';

const TransactionCard = ({
  transaction,
  currGroup,
  userGroupId,
}: {
  transaction: Transaction;
  currGroup: Group;
  userGroupId: string;
}) => {
  const date = new Date(transaction.date);
  const splitTotal = getMemberSplitTotals(transaction.amount, transaction.splitData);
  const description = transaction.description == '' ? 'No Description' : transaction.description;
  const isPaidByUser = userGroupId == transaction.paidBy;
  const paidBy = isPaidByUser ? 'You' : currGroup.members[transaction.paidBy].displayName;
  const shareAmount = (isPaidByUser ? transaction.amount - splitTotal[userGroupId] : splitTotal[userGroupId]) ?? 0;

  return (
    <Panel className="justfiy-center flex flex-row gap-3" dropOnClick={true}>
      <div className="bg-accent-200 text-ink-800 flex w-10 flex-col justify-center gap-0 rounded-lg">
        <p className="text-base/4">{format(date, 'LLL')}</p>
        <p className="text-2xl font-bold">{date.getDate()}</p>
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
        <p className="text-charcoal-600 font-medium">Php {formatToDigit(shareAmount)}</p>
        <p className="mb-2 flex flex-row items-center justify-end gap-1 text-sm font-light">
          {isPaidByUser ? 'You lent' : 'You borrowed'}
          <span className="bg-positive-500 h-2 w-2 rounded-full" />
        </p>
        <Panel padding="py-0 px-4" bgColor=" cursor-pointer bg-accent-200" rounded="rounded-lg" dropOnClick={true}>
          <p className="text-sm font-normal">Details</p>
        </Panel>
      </div>
    </Panel>
  );
};

export default TransactionCard;
