import { describe, it, beforeEach, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// -------------------------------------
// Mock Imports
// -------------------------------------

import useGroupListener from '@/features/groups/hooks/useGroupListener';
import useTransactions from '@/features/transactions/hooks/useTransactions';

vi.mock('@/features/groups/hooks/useGroupListener', () => ({
  default: vi.fn(() => ({
    group: {
      id: 'abcd',
      data: (): Group => ({
        balance: {},
        name: 'Test Group',
        memberUids: ['user'],
        members: {
          a: {
            displayName: 'Kyle',
            linkedUid: 'user',
          },
          b: {
            displayName: 'Marlon',
          },
          c: {
            displayName: 'Julian',
          },
          d: {
            displayName: 'Jayni',
          },
        },
      }),
    },
    userGroupId: 'a',
  })),
}));

vi.mock('@/features/transactions/hooks/useTransactions', () => ({
  useTransactions: vi.fn(() => ({
    transactions: {
      0: [
        {
          amount: 1200,
          description: 'test 1',
          paidBy: 'a',
          date: new Date('2025-10-24').getTime(),
          splits: 4,
          splitData: {
            type: 'balanced',
            data: {
              payingMembers: ['a', 'b', 'c', 'd'],
            },
          },
        },
        {
          amount: 1200,
          description: 'test 2',
          paidBy: 'c',
          date: new Date('2025-11-24').getTime(),
          splits: 4,
          splitData: {
            type: 'balanced',
            data: {
              payingMembers: ['a', 'b', 'c', 'd'],
            },
          },
        },
        {
          amount: 1200,
          description: 'test 3',
          paidBy: 'a',
          date: new Date('2025-11-24').getTime(),
          splits: 2,
          splitData: {
            type: 'balanced',
            data: {
              payingMembers: ['a', 'b'],
            },
          },
        },
      ],
    },
    loading: false,
  })),
}));

// -------------------------------------
// Import Module to test
// -------------------------------------

import Group from '@/app/routes/App/Group';

// -------------------------------------
// Test
// -------------------------------------

describe('[Unit] [Group] Group Page', () => {
  beforeEach(() => {
    const { container } = render(
      <MemoryRouter initialEntries={['/groups/abcd']}>
        <Routes>
          <Route path="/groups/abcd" element={<Group />} />
        </Routes>
      </MemoryRouter>,
    );
  });

  const user = userEvent.setup();

  it('Transactions are rendered properly', async () => {
    expect(screen.getAllByText('You paid 12.00')[0]).toBeInTheDocument();
    expect(screen.getByText('November 2025')).toBeInTheDocument();
    expect(screen.getByText('October 2025')).toBeInTheDocument();
  });
});
