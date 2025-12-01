import { type Group } from '../types';
import { clamp } from '../../../lib/helpers';

type UserGroupUid = string;
type Borrower = UserGroupUid;
type Lender = UserGroupUid;
// export type SimplifiedBalance = Record<UserGroupUid, Record<Borrower, number>>
export interface SimplifiedBalance {
  [Lender: UserGroupUid]: {
    [borrower: Borrower]: number;
  };
}

export function getSimplifiedBalance(group?: Group): SimplifiedBalance {
  if (!group || !group.balance) return {};

  /**
   * Record of total amount each member has borrowed.
   */
  const totalBorrowed: Record<Borrower, number> = {};
  /**
   * Record of total amount each member has lent.
   */
  const totalLent: Record<Lender, number> = {};
  /**
   * Record of the simplified balance of all members. Positive if they are
   * owed money, and negative if they owe others money.
   */
  const balanced: Record<UserGroupUid, number> = {};
  /**
   * Record of all debts owed/lent to a group member, balanced to avoid cyclical debts.
   */
  const simplified: SimplifiedBalance = {};

  // Balance all debts and loans to get the total of how much a user owes/is owed.
  for (let [lender, borrowers] of Object.entries(group.balance)) {
    for (let [borrower, value] of Object.entries(borrowers)) {
      totalBorrowed[borrower] = (totalBorrowed[borrower] ?? 0) + value;
      totalLent[lender] = (totalLent[lender] ?? 0) + value;

      balanced[borrower] = (balanced[borrower] ?? 0) - value;
      balanced[lender] = (balanced[lender] ?? 0) + value;
    }
  }

  for (let member of Object.keys(balanced)) {
    simplified[member] = simplified[member] ?? {};
    for (let payee of Object.keys(balanced)) {
      simplified[payee] = simplified[payee] ?? {};
      if (member != payee && balanced[member] < 0 && balanced[payee] > 0) {
        const amt = clamp(-balanced[member], 0, balanced[payee]);

        simplified[member][payee] = -amt;
        simplified[payee][member] = amt;
        balanced[member] += amt;
        balanced[payee] -= amt;
      }
    }
  }

  return simplified;
}

/**
 * Checks through a simplified balance and returns the total that a user owes.
 * user is defined by using their uid.
 */
export function getTotalFromSimplified(
  uid: UserGroupUid | null | undefined,
  balance: SimplifiedBalance | null | undefined,
) {
  if (!uid || !balance || !balance[uid]) return 0;
  return Object.values(balance[uid]).reduce((acc, curr) => {
    return acc + curr;
  }, 0);
}
