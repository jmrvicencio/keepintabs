import { describe, it, beforeEach, test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { ROUTES } from '../src/app/routes';
import { Group } from '../src/features/groups/types';
import PopupMenu from '../src/features/popup-menu/components/PopupMenu';

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

vi.mock('../src/lib/firebase/auth', () => ({
  auth: {
    currentUser: {
      uid: '1234',
    },
  },
}));

vi.mock('../src/features/groups/utils/memberUtil', () => ({
  getMemberPhotoUrl: () => undefined,
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

describe('[Unit] [New Transaction] New Transaction Page', () => {
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
          <Route
            path="/transactions/new"
            element={
              <>
                <PopupMenu />
                <NewTransaction />
              </>
            }
          />
          <Route path={`${ROUTES.GROUPS}/abcd`} element={<p>we are in groups</p>} />
        </Routes>
      </MemoryRouter>,
    );
  });

  const user = userEvent.setup();

  it('Tapping Cancel returns the user to the previous group route', async () => {
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();

    await user.click(cancelButton);
    expect(mockNavigate).toBeCalledWith(`${ROUTES.GROUPS}/abcd`);
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

    const julianButton = await screen.findByRole('button', { name: 'Julian' });

    await user.click(julianButton);
    expect(screen.getByLabelText('Paid By:')).toHaveValue('Julian');
  });

  it('Groups section displays the name of the current active group', async () => {
    expect(screen.getByRole('button', { name: 'Test Group' })).toBeInTheDocument();
  });

  it('Can create itemized split type transactions', async () => {
    // Open Split type Page
    const splitTypeButton = screen.getByLabelText('Split Type:');
    await user.click(splitTypeButton);

    // Split Type Page Tests
    const addItemButton = screen.getByRole('button', { name: 'Add Item' });
    await user.click(addItemButton);

    const itemDescInputs = screen.getAllByTestId('item-desc');
    const lastItemDesc = itemDescInputs[itemDescInputs.length - 1];
    expect(lastItemDesc).toHaveFocus();
    await user.type(lastItemDesc, 'Jollibee Chicken');
    expect(lastItemDesc).toHaveValue('Jollibee Chicken');

    const itemPriceInputs = screen.getAllByTestId('item-price');
    const lastItemprice = itemPriceInputs[itemPriceInputs.length - 1];
    await user.type(lastItemprice, '100');
    expect(lastItemprice).toHaveValue('1.00');
  });

  it('Split type transactions show a "remainder" and inputted amount should not go below total of itemized items', async () => {
    // Open Split type Page
    await user.click(screen.getByLabelText('Split Type:'));

    // Split Type Page Tests
    // Add in a few items with prices
    const addItemButton = screen.getByRole('button', { name: 'Add Item' });
    await user.click(addItemButton);
    await user.click(addItemButton);

    let itemPriceInputs = screen.getAllByTestId('item-price');
    expect(itemPriceInputs.length).toBe(2);

    await user.type(itemPriceInputs[0], '200');
    await user.type(itemPriceInputs[1], '400');

    // Check that total value has been automatically updated
    const totalAmountField = screen.getByLabelText('Total Amount');
    expect(totalAmountField).toBeInTheDocument();
    expect(totalAmountField).toHaveValue('6.00');

    // Backspace on total field should not bring the total lower than the computed total of all items
    await user.type(totalAmountField, '{backspace}{backspace}');
    expect(totalAmountField).toHaveValue('6.00');
    await user.clear(totalAmountField);
    expect(totalAmountField).toHaveValue('6.00');

    // User can still set a higher total than the computed totals
    // This should create a remainder field that adds the remaining to the bill
    await user.type(totalAmountField, '000');
    expect(totalAmountField).toHaveValue('6,000.00');

    const remainderField = screen.getByLabelText('Remainder');
    expect(remainderField).toHaveValue('5,994.00');

    // If Item Total is lower than SplitTotal, remainder should increase.
    // Split Total will not change when there is Remainder Remaining.
    await user.click(screen.getAllByRole('button', { name: 'Remove Item' })[1]);
    expect(remainderField).toHaveValue('5,998.00');

    await user.click(addItemButton);
    itemPriceInputs = screen.getAllByTestId('item-price');
    expect(itemPriceInputs.length).toBe(2);
    await user.clear(itemPriceInputs[1]);
    await user.type(itemPriceInputs[1], '700000');
    expect(itemPriceInputs[1]).toHaveValue('7,000.00');

    // If there is no remainder, Split Total will always equal the Item Total
    expect(totalAmountField).toHaveValue('7,002.00');
    expect(remainderField).not.toBeInTheDocument();
    await user.click(screen.getAllByRole('button', { name: 'Remove Item' })[1]);
    expect(totalAmountField).toHaveValue('2.00');
  });

  it('Transactions are submitted properly', async () => {
    const doneButton = screen.getByRole('button', { name: 'Done' });
    expect(doneButton).toBeInTheDocument();

    await user.click(doneButton);
    expect(mockUseAddTransaction).toHaveBeenCalledWith('abcd');
    expect(mockAddTransaction).toHaveBeenCalled();
  });
});

describe('[Unit] [New Transaction] New Transaction Page not passed a GroupId state', () => {
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

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();

    await userEvent.click(cancelButton);
    expect(mockNavigate).toBeCalledWith(ROUTES.APP);
  });
});
