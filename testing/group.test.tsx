import { describe, it, beforeEach, vi, expect } from 'vitest';
import { act, render, screen, within } from '@testing-library/react';
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
        expenses: {},
        spent: {},
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

// const foo(): {bar: string; foobar: boolean};

// const buzz(): ReturnType<typeof foo>;

vi.mock('@/features/transactions/hooks/useTransactions', () => ({
  default: vi.fn(
    (): ReturnType<typeof useTransactions> => ({
      transactions: {
        '2025-10': [
          {
            id: 't-1',
            amount: 1200,
            description: 'test 1',
            paidBy: 'a',
            date: new Date('2025-10-24').getTime(),
            splits: 4,
            splitData: {
              type: 'balanced',
              data: {
                payingMembers: new Set(['a', 'b', 'c', 'd']),
              },
            },
          },
        ],
        '2025-11': [
          {
            id: 't-2',
            amount: 1200,
            description: 'test 2',
            paidBy: 'c',
            date: new Date('2025-11-24').getTime(),
            splits: 4,
            splitData: {
              type: 'balanced',
              data: {
                payingMembers: new Set(['a', 'b', 'c', 'd']),
              },
            },
          },
          {
            id: 't-3',
            amount: 1200,
            description: 'test 3',
            paidBy: 'a',
            date: new Date('2025-11-24').getTime(),
            splits: 2,
            splitData: {
              type: 'balanced',
              data: {
                payingMembers: new Set(['a', 'b']),
              },
            },
          },
        ],
      },
      loading: false,
      getPage: async () => {},
      endReached: true,
      reload: () => {},
      isEmpty: false,
    }),
  ),
}));

// -------------------------------------
// Import Module to test
// -------------------------------------

import Group from '@/app/routes/App/Group';
import { el } from 'date-fns/locale';

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

    const nov = screen.getByText('November', { exact: false }).closest('h2');
    expect(nov).toBeInTheDocument();
    expect(within(nov!).getByText('2025')).toBeInTheDocument();

    const oct = screen.getByText('October', { exact: false }).closest('h2');
    expect(nov).toBeInTheDocument();
    expect(within(nov!).getByText('2025')).toBeInTheDocument();

    // expect(screen.getByText((content, element) => element?.textContent === 'November 2025')).toBeInTheDocument();
    // expect(screen.getByText('November 2025')).toBeInTheDocument();
    // expect(screen.getByText('October 2025')).toBeInTheDocument();
  });

  it('Multi-item selection', async () => {
    const menuButton = screen.getByLabelText('options menu');

    await user.click(menuButton);

    const selectItems = screen.getByText('Select Items');
    expect(selectItems).toBeInTheDocument;

    await user.click(selectItems);
  });
});
