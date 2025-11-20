import { SerializedSplitData, SerializedTransaction, SplitData, Transaction } from '../types';

function replaceSetWithArray(obj: any) {}

export function serializeTransaction(txn: Transaction): SerializedTransaction {
  const nextTxn = { ...txn };
  const nextSplitData = { ...nextTxn.splitData };
  let nextData: SerializedSplitData | undefined;

  if (nextSplitData.type == 'balanced') {
    nextData = {
      ...nextSplitData,
      data: {
        payingMembers: Array.from(nextSplitData.data.payingMembers),
      },
    };
  } else {
    nextData = {
      ...nextSplitData,
      data: {
        ...nextSplitData.data,
        remainder: {
          ...nextSplitData.data.remainder,
          payingMembers: Array.from(nextSplitData.data.remainder.payingMembers),
        },
        entries: nextSplitData.data.entries.map((entry) => ({
          ...entry,
          payingMembers: Array.from(entry.payingMembers),
        })),
      },
    };
  }

  return {
    ...nextTxn,
    splitData: nextData,
  };
}

export function deserializeTransaction(serializedTxn: SerializedTransaction): Transaction {
  const nextTxn = { ...serializedTxn };
  const nextSplitData = { ...nextTxn.splitData };
  let nextData: SplitData | undefined;

  if (nextSplitData.type == 'balanced') {
    nextData = {
      ...nextSplitData,
      data: {
        payingMembers: new Set(nextSplitData.data.payingMembers),
      },
    };
  } else {
    nextData = {
      ...nextSplitData,
      data: {
        ...nextSplitData.data,
        remainder: {
          ...nextSplitData.data.remainder,
          payingMembers: new Set(nextSplitData.data.remainder.payingMembers),
        },
        entries: nextSplitData.data.entries.map((entry) => ({
          ...entry,
          payingMembers: new Set(entry.payingMembers),
        })),
      },
    };
  }

  return {
    ...nextTxn,
    splitData: nextData,
  };
}
