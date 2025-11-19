// Split Data
export type SplitType = 'balanced' | 'itemized';

export type GroupUserId = string;

export interface Transaction {
  amount: number;
  description: string;
  paidBy: GroupUserId;
  date: number; //timestamp is a number, not a Date object
  splitData: SplitData;
}

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
  totals: Record<string, number>;
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
  getData: () => {
    amount: number;
    description: string;
    paidBy: GroupUserId;
    date: number;
    splitData: SplitData;
  };
}

export interface SplitRef {
  verifySplits: () => boolean;
  getData: () => {
    amount: number;
    splitData: SplitData;
  };
}
