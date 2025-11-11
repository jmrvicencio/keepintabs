export interface Group {
  // A record of the total amt that [lender] owes to [lent]
  // NOTE: both users can owe each other. ie. [abc] owes 200 to [efg], but [efg] owes 250 to [abc]
  // balance just gives a general lending record. Balance will be simplified by another function.
  balance: Record<Lender, Lent>;
  name: string;
  memberUids: string[];
  members: Record<userGroupUid, Member>;
}

type Lender = string;
type Lent = Record<string, number>;

export type userGroupUid = string;
export interface Member {
  groupUid?: string;
  linkedUid?: string;
  displayName: string;
  email?: string;
  photoUrl?: string;
}
