export interface Group {
  balance: Record<Lender, Lent>;
  name: string;
  memberUids: string[];
  members: Record<UserGroupUid, Member>;
}

type Lender = string;
type Lent = Record<string, number>;

type UserGroupUid = string;
export interface Member {
  groupUid?: string;
  linkedUid: string;
  displayName: string;
}
