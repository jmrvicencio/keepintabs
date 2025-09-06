import { type Group } from '../types';
import { clamp } from '../../../lib/helpers';

type UserGroupUid = string;
type Borrower = UserGroupUid;
type Lender = UserGroupUid;

export const getSimplifiedBalance = (group: Group) => {
  console.log('group data: ', group);
  if (!group.balance) return null;

  const totalBorrowed: Record<Borrower, number> = {};
  const totalLent: Record<Lender, number> = {};
  const balanced: Record<UserGroupUid, number> = {};
  /**
   * Record of all debts owed to a group member, balanced to avoid cyclical debts.
   */
  const simplified: Record<UserGroupUid, Record<Borrower, number>> = {};

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
};
