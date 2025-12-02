import { SplitData, SplitTotal } from '../types';

export const getMemberSplitTotals = (total: number, splitData: SplitData, paidByUid: string) => {
  let remainingSplit = total;

  if (splitData.type == 'balanced') {
    const splitCount = splitData.data.payingMembers.size;
    const evenSplit = Math.round(total / splitCount);
    const splitTotal: SplitTotal = {};

    for (let member of Array.from(splitData.data.payingMembers)) {
      if (member == paidByUid) continue;
      remainingSplit -= evenSplit;
      splitTotal[member] = evenSplit;
    }

    splitTotal[paidByUid] = remainingSplit;
    return splitTotal;
  } else if (splitData.type == 'itemized') {
    const data = splitData.data;
    const remainder = data.remainder;
    const splitTotal: SplitTotal = {};

    // Iterate through and add totals for all entries
    for (let entry of data.entries) {
      const evenSplit = Math.round(entry.amount / entry.payingMembers.size);

      for (let member of Array.from(entry.payingMembers)) {
        if (member == paidByUid) continue;
        splitTotal[member] = (splitTotal[member] ?? 0) + evenSplit;
        remainingSplit -= evenSplit;
      }
    }

    // Add totals for remainder
    const evenRemainderSplit = Math.round(remainder.amount / remainder.payingMembers.size);
    for (let member of Array.from(remainder.payingMembers)) {
      if (member == paidByUid) continue;
      splitTotal[member] = (splitTotal[member] ?? 0) + evenRemainderSplit;
      remainingSplit -= evenRemainderSplit;
    }

    splitTotal[paidByUid] = remainingSplit;
    return splitTotal;
  }

  return {};
};
