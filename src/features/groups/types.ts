export interface Group {
  balance: Record<lender, lent>;
  name: string;
  memberUids: string[];
  members: Record<userGroupUid, Member>;
}

type lender = string;
type lent = Record<string, number>;

export type userGroupUid = string;
export interface Member {
  groupUid?: string;
  linkedUid: string;
  displayName: string;
}
