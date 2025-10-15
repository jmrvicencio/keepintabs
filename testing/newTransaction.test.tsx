import { describe, it, beforeEach, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Group } from '../src/features/groups/types';
import { ROUTES } from '../src/app/routes';

const mockNavigate = vi.fn();
const { mockUseLocation, mockAddTransaction, mockUseAddTransaction } = vi.hoisted(() => {
  const mockAddTransaction = vi.fn();
  const mockUseAddTransaction = vi.fn((groupId: string) => mockAddTransaction);

  return {
    mockUseLocation: vi.fn(),
    mockAddTransaction,
    mockUseAddTransaction,
  };
});

// Mock the module before it gets imported
// Creates a fake group data
vi.mock('../src/features/groups/hooks/useGroups', () => ({
  useGroups: vi.fn(() => ({
    groups: [
      {
        id: 'abcd',
        data: (): Group => ({
          balance: {},
          name: 'Test Group',
          memberUids: [],
          members: {
            a: {
              displayName: 'Kyle',
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
    ],
    loading: false,
    reload: () => {},
  })),
}));

vi.mock('../src/features/groups/hooks/useAddTransaction', () => ({
  default: mockUseAddTransaction,
}));

// Mock useLocation module
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useLocation: mockUseLocation,
    useNavigate: () => mockNavigate,
  };
});

import NewTransaction from '../src/app/routes/App/NewTransaction';

describe('[New Transaction] [Unit] New Transaction Page', () => {
  beforeEach(() => {
    // Define the groupId in state to be a groupId so that it can be referenced
    // as the previous group before switching to this page.
    mockUseLocation.mockImplementation(() => ({
      pathname: 'transactions/new',
      search: '',
      hash: '',
      state: { groupId: 'abcd' },
      key: '',
    }));
    const { container } = render(
      <MemoryRouter initialEntries={['/transactions/new']}>
        <Routes>
          <Route path="/transactions/new" element={<NewTransaction />} />
          <Route path={`${ROUTES.GROUPS}/abcd`} element={<p>we are in groups</p>} />
        </Routes>
      </MemoryRouter>,
    );
  });

  const user = userEvent.setup();

  it('Tapping Cancel returns the user to the previous group route', async () => {
    const backButton = screen.getByRole('link', { name: 'Cancel' });
    expect(backButton).toBeInTheDocument();

    await user.click(backButton);
    const groupsGreeting = screen.getByText('we are in groups');
    expect(groupsGreeting).toBeInTheDocument();
  });

  it('Total inputs format respond and format correctly when typed into', async () => {
    const totalInput = screen.getByLabelText('Total Amount', { selector: 'input' });
    expect(totalInput).toBeInTheDocument();

    await user.clear(totalInput);
    await user.type(totalInput, '100.00');
    expect(totalInput).toHaveValue('100.00');

    await user.type(totalInput, '{backspace}');
    expect(totalInput).toHaveValue('10.00');

    await user.type(totalInput, '00000');
    expect(totalInput).toHaveValue('1,000,000.00');
  });

  it('Description Field updates when typed into', async () => {
    const descInput = screen.getByLabelText('Description:', { selector: 'input' });
    expect(descInput).toBeInTheDocument();

    await user.clear(descInput);
    expect(descInput).toHaveValue('');

    await user.type(descInput, 'Burgers Out');
    expect(descInput).toHaveValue('Burgers Out');
  });

  it('Paid By can be updated when pressed', async () => {
    const paidByButton = screen.getByLabelText('Paid By:');
    expect(paidByButton).toBeInTheDocument();

    await user.click(paidByButton);
    const julianButton = screen.getByRole('button', { name: 'Julian' });

    await user.click(julianButton);
  });

  it('Groups section displays the name of the current active group', async () => {
    expect(screen.getByRole('button', { name: 'Test Group' })).toBeInTheDocument();
  });

  it('Transactions are submitted properly', async () => {
    const doneButton = screen.getByRole('button', { name: 'Done' });
    expect(doneButton).toBeInTheDocument();

    await user.click(doneButton);
    expect(mockUseAddTransaction).toHaveBeenCalledWith('abcd');
    expect(mockAddTransaction).toHaveBeenCalled();
  });
});

describe('[New Transaction] [Unit] New Transaction Page not passed a GroupId state', () => {
  beforeEach(() => {
    // Not defining a groupId in the state to simluate clicking
    //  new transaction from outside of a group.
    mockUseLocation.mockImplementation(() => ({
      pathname: 'transactions/new',
      search: '',
      hash: '',
      state: {},
      key: '',
    }));

    const { container } = render(
      <MemoryRouter initialEntries={['/transactions/new']}>
        <Routes>
          <Route path="/transactions/new" element={<NewTransaction />} />
          <Route path={`${ROUTES.APP}`} element={<p>We are in app</p>} />
        </Routes>
      </MemoryRouter>,
    );
  });

  it('Groups section displays the name of the first group it can find, and pressing back should return to app', async () => {
    expect(screen.getByRole('button', { name: 'Test Group' })).toBeInTheDocument();

    const cancelButton = screen.getByRole('link', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();

    await userEvent.click(cancelButton);
    expect(screen.getByText('We are in app')).toBeInTheDocument();
  });
});
