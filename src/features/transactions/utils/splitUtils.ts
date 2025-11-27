import { SplitData, SplitTotal } from '../types';

export const getMemberSplitTotals = (total: number, splitData: SplitData) => {
  if (splitData.type == 'balanced') {
    const splitCount = splitData.data.payingMembers.size;
    const evenSplit = Math.floor(total / splitCount);
    const splitTotal: SplitTotal = {};

    for (let member of Array.from(splitData.data.payingMembers)) {
      splitTotal[member] = evenSplit;
    }

    return splitTotal;
  } else if (splitData.type == 'itemized') {
    const data = splitData.data;
    const remainder = data.remainder;
    const splitTotal: SplitTotal = {};

    // Iterate through and add totals for all entries
    for (let entry of data.entries) {
      const evenSplit = Math.floor(entry.amount / entry.payingMembers.size);

      for (let member of Array.from(entry.payingMembers)) {
        splitTotal[member] = (splitTotal[member] ?? 0) + evenSplit;
      }
    }

    // Add totals for remainder
    const evenRemainderSplit = Math.floor(remainder.amount / remainder.payingMembers.size);
    for (let member of Array.from(remainder.payingMembers)) {
      splitTotal[member] = (splitTotal[member] ?? 0) + evenRemainderSplit;
    }

    return splitTotal;
  }

  return {};
};
