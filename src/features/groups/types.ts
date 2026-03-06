import { Timestamp } from 'firebase/firestore';

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
  adminUids: string[];
  invitedUids?: Set<string>;
  members: Record<MemberUid, Member>;
}

export type SerializedGroup = ReplaceSetWithArray<Group>;

type ReplaceSetWithArray<T> =
  T extends Set<infer U> ? U[] : T extends Object ? { [K in keyof T]: ReplaceSetWithArray<T[K]> } : T;

type Lender = MemberUid; // Member who lent the money
type Lent = Record<string, number>; // Members they lent to and the amounts lent

export type MemberUid = string;
export interface Member {
  displayName: string;
  active: boolean;
  groupUid?: string;
  linkedUid?: string;
  email?: string;
  photoUrl?: string;
  inviteKey?: string;
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

export interface InviteKey {
  inviteKey: string;
  valid: boolean;
  expires?: Timestamp | 'none';
}

export interface GroupMember {
  admin: boolean;
  groupUid: string;
  inviteKey?: string;
}
