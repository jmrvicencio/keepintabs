export interface Group {
  // A record of the total amt that [lender] owes to [lent]
  // NOTE: both users can owe each other. ie. [abc] owes 200 to [efg], but [efg] owes 250 to [abc]
  // balance just gives a general lending record. Balance will be simplified by another function.
  createdAt?: number;
  // balance: {
  //   [Lender: MemberUid]: {
  //     [Lent: MemberUid]: number;
  //   };
  // };
  expenses: {
    [member: MemberUid]: number;
  };
  spent: {
    [member: MemberUid]: number;
  };
  name: string;
  memberUids: string[];
  members: Record<MemberUid, Member>;
}

type Lender = MemberUid; // Member who lent the money
type Lent = Record<string, number>; // Members they lent to and the amounts lent

export type MemberUid = string;
export interface Member {
  groupUid?: string;
  linkedUid?: string;
  displayName: string;
  email?: string;
  photoUrl?: string;
}

export interface SimplifiedBalance {
  [lender: MemberUid]: {
    [borrower: MemberUid]: number;
  };
}

export interface UserBalance {
  total: number;
  records: SimplifiedBalance;
}
