export interface Group {
  // A record of the total amt that [lender] owes to [lent]
  // NOTE: both users can owe each other. ie. [abc] owes 200 to [efg], but [efg] owes 250 to [abc]
  // balance just gives a general lending record. Balance will be simplified by another function.
  balance: {
    [Lender: UserGroupUid]: {
      [Lent: UserGroupUid]: number;
    };
  };
  name: string;
  memberUids: string[];
  members: Record<UserGroupUid, Member>;
}

type Lender = UserGroupUid; // Member who lent the money
type Lent = Record<string, number>; // Members they lent to and the amounts lent

export type UserGroupUid = string;
export interface Member {
  groupUid?: string;
  linkedUid?: string;
  displayName: string;
  email?: string;
  photoUrl?: string;
}

export interface SimplifiedBalance {
  [lender: UserGroupUid]: {
    [borrower: UserGroupUid]: number;
  };
}

export interface UserBalance {
  total: number;
  records: SimplifiedBalance;
}
