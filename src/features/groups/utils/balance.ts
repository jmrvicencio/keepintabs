import { type Group, SimplifiedBalance } from '../types';
import { clamp } from '../../../lib/helpers';

type UserGroupUid = string;
type Borrower = UserGroupUid;
type Lender = UserGroupUid;

export function getSimplifiedBalance(group?: Group): SimplifiedBalance {
  if (!group || !group.balance) return {};

  /**
   * Record of all debts owed/lent to a group member, balanced to avoid cyclical debts.
   */
  const simplified: SimplifiedBalance = {};

  /**
   * Record of the lent balance by all users
   */
  const lent: Record<string, number> = {};

  /**
   * Record of the borrowed balance owed by all users.
   */
  const borrowed: Record<string, number> = {};

  for (let memberUid of Object.keys(group.members)) {
    const balance = (group.spent[memberUid] ?? 0) - (group.expenses[memberUid] ?? 0);
    if (balance > 0) lent[memberUid] = balance;
    else if (balance < 0) borrowed[memberUid] = -balance;
  }

  for (let lender of Object.keys(lent)) {
    simplified[lender] = simplified[lender] ?? {};

    for (let borrower of Object.keys(borrowed)) {
      if (lent[lender] < 1) break; // Once Lent amount has exhausted, move on to next lender.

      simplified[borrower] = simplified[borrower] ?? {};
      const amt = clamp(borrowed[borrower], 0, lent[lender]);

      simplified[lender][borrower] = amt;
      simplified[borrower][lender] = -amt;

      // Reduce the amt borrowed and lent. This should approach 0
      // as the balance is being settled into 'Simplified' object.
      borrowed[borrower] -= amt;
      lent[lender] -= amt;
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

/**
 * Gets the total expenses of all users in a group
 */
export function getGroupTotalExpenses(group: Group): Record<string, number> {
  const expenses: Record<string, number> = {};

  if (!group.balance) return expenses;

  for (let lent of Object.values(group.balance)) {
    for (let [borrower, amt] of Object.entries(lent)) {
      expenses[borrower] = (expenses[borrower] ?? 0) + amt;
    }
  }

  return expenses;
}
