type ReplaceSetWithArray<T> =
  T extends Set<infer U>
    ? U[] // if T is a Set, replace it with an array of T
    : T extends Object
      ? { [K in keyof T]: ReplaceSetWithArray<T[K]> } // if it is an object, recursively replace all keys
      : T; // Otherwise, just return the original type

// Split Data
export type SplitType = 'balanced' | 'itemized';

export type GroupUserId = string;

export interface Transaction {
  amount: number;
  description: string;
  paidBy: GroupUserId;
  date: number; //timestamp is a number, not a Date object
  splits: number;
  splitData: SplitData;
}

export type SerializedTransaction = ReplaceSetWithArray<Transaction>;
export type SerializedSplitData = ReplaceSetWithArray<SplitData>;

export type SplitData =
  | {
      type: 'balanced';
      data: BalancedSplit;
    }
  | {
      type: 'itemized';
      data: ItemizedSplit;
    };

/**
 * An array of members who are splitting the transaction evenly
 */
export interface BalancedSplit {
  payingMembers: Set<GroupUserId>;
}

/**
 * An array of entries which split and make up the entire transaction
 */
export interface ItemizedSplit {
  entries: {
    description: string;
    amount: number;
    payingMembers: Set<GroupUserId>;
  }[];
  remainder: {
    amount: number;
    payingMembers: Set<GroupUserId>;
  };
}

export interface FormRef {
  getData: () => Transaction;
}

export interface SplitRef {
  verifySplits: () => boolean;
  getData: () => {
    amount: number;
    splitData: SplitData;
  };
}

export interface SplitTotal {
  [memberUid: string]: number;
}
