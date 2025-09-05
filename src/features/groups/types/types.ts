export interface Group {
  balance: Record<Lender, Lent>;
  name: string;
  memberUids: string[];
  members: Record<UserGroupUid, Member>;
}

type Lender = string;
type Lent = Record<string, number>;

type UserGroupUid = string;
interface Member {
  linkedUid: string;
  displayName: string;
}
