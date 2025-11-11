import { describe, it, beforeEach, test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { ROUTES } from '../src/app/routes';
import { Group } from '../src/features/groups/types';
import PopupOverlay from '../src/features/popup-menu/components/PopupOverlay';

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
  getUserGroupId: () => 'a',
}));

vi.mock('@/features/transactions/hooks/useAddTransaction', () => ({
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
import { act } from 'react';
import { getUserGroupId } from '@/features/groups/utils/memberUtil';

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
                <PopupOverlay />
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

    await act(async () => {
      await user.click(cancelButton);
    });
    expect(mockNavigate).toBeCalledWith(`${ROUTES.GROUPS}/abcd`);
  });

  it('Total inputs format respond and format correctly when typed into', async () => {
    const totalInput = screen.getByLabelText('Total Amount', { selector: 'input' });
    expect(totalInput).toBeInTheDocument();

    await act(async () => {
      await user.clear(totalInput);
      await user.type(totalInput, '100.00');
    });
    expect(totalInput).toHaveValue('100.00');

    await act(async () => {
      await user.type(totalInput, '{backspace}');
    });
    expect(totalInput).toHaveValue('10.00');

    await act(async () => {
      await user.type(totalInput, '00000');
    });
    expect(totalInput).toHaveValue('1,000,000.00');
  });

  it('Description Field updates when typed into', async () => {
    const descInput = screen.getByLabelText('Description:', { selector: 'input' });
    expect(descInput).toBeInTheDocument();

    await act(async () => {
      await user.clear(descInput);
    });
    expect(descInput).toHaveValue('');

    await act(async () => {
      await user.type(descInput, 'Burgers Out');
    });
    expect(descInput).toHaveValue('Burgers Out');
  });

  it('Paid By can be updated when pressed', async () => {
    const paidByButton = screen.getByLabelText('Paid By:');
    expect(paidByButton).toBeInTheDocument();

    await act(async () => {
      await user.click(paidByButton);
    });

    const julianButton = await screen.findByRole('button', { name: 'Julian' });

    await act(async () => {
      await user.click(julianButton);
    });
    expect(screen.getByLabelText('Paid By:')).toHaveValue('Julian');
  });

  it('Groups section displays the name of the current active group', async () => {
    expect(screen.getByRole('button', { name: 'Test Group' })).toBeInTheDocument();
  });

  it('Transactions are submitted properly', async () => {
    const doneButton = screen.getByRole('button', { name: 'Done' });
    expect(doneButton).toBeInTheDocument();

    await act(async () => {
      await user.click(doneButton);
    });
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

    await act(async () => {
      await userEvent.click(cancelButton);
    });
    expect(mockNavigate).toBeCalledWith(ROUTES.APP);
  });
});

describe('[Unit] [New Transaction] New Transaction Split Types', () => {
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
                <PopupOverlay />
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

  it('Can create itemized split type transactions', async () => {
    // Open Split type Page
    const splitTypeButton = screen.getByLabelText('Split Type:');
    expect(splitTypeButton).toHaveValue('Balanced');

    await act(async () => {
      await user.click(splitTypeButton);
      await user.click(screen.getByRole('button', { name: 'Itemized' }));
    });

    // Split Type Page Tests
    const addItemButton = screen.getByRole('button', { name: 'Add Item' });

    await act(async () => {
      await user.click(addItemButton);
    });

    let itemDescInputs = screen.getAllByTestId('item-desc');
    const lastItemDesc = itemDescInputs[0];
    expect(lastItemDesc).toHaveFocus();

    // Update Desc of item
    await act(async () => {
      await user.type(lastItemDesc, 'Jollibee Chicken');
    });
    expect(lastItemDesc).toHaveValue('Jollibee Chicken');

    // Get Item Price Fields
    let itemPriceInputs = screen.getAllByTestId('item-price');
    const lastItemprice = itemPriceInputs[0];

    await act(async () => {
      await user.type(lastItemprice, '100');
    });
    expect(lastItemprice).toHaveValue('1.00');

    const memberCheckboxes = screen.getAllByTestId('item-member');
    const memberAmts = screen.getAllByTestId('item-member-amt');

    await act(async () => {
      for (const member of memberCheckboxes) {
        await user.click(member);
      }
    });

    // All Members should split the item
    for (const amt of memberAmts) {
      expect(amt).toHaveTextContent('0.25');
    }

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Continue' }));
    });

    expect(screen.getByLabelText('Total Amount')).toHaveValue('1.00');
    expect(screen.getByLabelText('Split Type:')).toHaveValue('Itemized');
  });

  it('Itemized Split type transactions show a "remainder" and inputted amount should not go below total of itemized items', async () => {
    // Open Split type Page
    await act(async () => {
      await user.click(screen.getByLabelText('Split Type:'));
      await user.click(screen.getByRole('button', { name: 'Itemized' }));
    });

    // Split Type Page Tests
    // Add in a few items with prices
    const addItemButton = screen.getByRole('button', { name: 'Add Item' });
    await act(async () => {
      await user.click(addItemButton);
      await user.click(addItemButton);
    });

    let itemPriceInputs = screen.getAllByTestId('item-price');
    expect(itemPriceInputs.length).toBe(2);

    await act(async () => {
      await user.type(itemPriceInputs[0], '200');
      await user.type(itemPriceInputs[1], '400');
    });

    // Check that total value has been automatically updated
    const totalAmountField = screen.getByLabelText('Total Amount');
    expect(totalAmountField).toBeInTheDocument();
    expect(totalAmountField).toHaveValue('6.00');

    // Backspace on total field should not bring the total lower than the computed total of all items
    await act(async () => {
      await user.type(totalAmountField, '{backspace}{backspace}');
    });
    expect(totalAmountField).toHaveValue('6.00');

    await act(async () => {
      await user.clear(totalAmountField);
    });
    expect(totalAmountField).toHaveValue('6.00');

    // User can still set a higher total than the computed totals
    // This should create a remainder field that adds the remaining to the bill
    await act(async () => {
      await user.type(totalAmountField, '000');
    });
    expect(totalAmountField).toHaveValue('6,000.00');

    const remainderField = screen.getByLabelText('Remainder');
    expect(remainderField).toHaveValue('5,994.00');

    // If Item Total is lower than SplitTotal, remainder should increase.
    // Split Total will not change when there is Remainder Remaining.
    await act(async () => {
      await user.click(screen.getAllByRole('button', { name: 'Remove Item' })[1]);
    });
    expect(remainderField).toHaveValue('5,998.00');

    await act(async () => {
      await user.click(addItemButton);
    });
    itemPriceInputs = screen.getAllByTestId('item-price');
    expect(itemPriceInputs.length).toBe(2);
    await act(async () => {
      await user.clear(itemPriceInputs[1]);
      await user.type(itemPriceInputs[1], '700000');
    });
    expect(itemPriceInputs[1]).toHaveValue('7,000.00');

    // If there is no remainder, Split Total will always equal the Item Total
    expect(totalAmountField).toHaveValue('7,002.00');
    expect(remainderField).not.toBeInTheDocument();
    await act(async () => {
      await user.click(screen.getAllByRole('button', { name: 'Remove Item' })[1]);
    });
    expect(totalAmountField).toHaveValue('2.00');
  });

  it('Itemized Split error if no paying members is chosen', async () => {
    // Open Split type Page
    await act(async () => {
      await user.click(screen.getByLabelText('Split Type:'));
      await user.click(screen.getByRole('button', { name: 'Itemized' }));
      await user.click(screen.getByRole('button', { name: 'Add Item' }));
      await user.click(screen.getByRole('button', { name: 'Continue' }));
    });

    const errorText = screen.getByText('Must have atleast 1 paying member');
    expect(errorText).toBeInTheDocument();

    await act(async () => {
      await user.click(await screen.getAllByTestId('item-member')[0]);
    });
    expect(errorText).not.toBeInTheDocument();
  });

  it('Split total should reflect the shown total when entering split type page', async () => {
    const totalField = screen.getByLabelText('Total Amount');
    await act(async () => {
      await user.type(totalField, '1000');
    });
    expect(totalField).toHaveValue('10.00');

    // Open Split type Page
    await act(async () => {
      await user.click(screen.getByLabelText('Split Type:'));
    });

    const splitTypeTotal = screen.getByLabelText('Total Amount');
    expect(splitTypeTotal).toHaveValue('10.00');

    await act(async () => {
      await setTimeout(() => {}, 5000);
    });
    expect(splitTypeTotal).toHaveValue('10.00');
  });

  it(
    'Switching between Balanced and Itemized Split types should remember the items in itemized type ' +
      'and update the total appropriately. Itemized total takes precedent over balanced split type.',
    async () => {
      // Open split type page
      await act(async () => {
        await user.click(screen.getByLabelText('Split Type:'));
      });
      const balancedButton = screen.getByRole('button', { name: 'Balanced' });
      const itemizedButton = screen.getByRole('button', { name: 'Itemized' });
      const totalInput = screen.getByLabelText('Total Amount');

      // Make sure we are in itemized split type and add an item
      await act(async () => {
        await user.click(itemizedButton);
        await user.click(screen.getByRole('button', { name: 'Add Item' }));
      });

      // set item price to 2,000.00
      await act(async () => {
        await user.type(screen.getByTestId('item-price'), '200000');
      });
      expect(totalInput).toHaveValue('2,000.00');

      // Update total to get a remainder
      await act(async () => {
        await user.type(totalInput, '5');
      });
      expect(totalInput).toHaveValue('20,000.05');
      expect(screen.getByLabelText('Remainder')).toHaveValue('18,000.05');

      // Switch to balanced button and update value
      await act(async () => {
        await user.click(balancedButton);
      });
      expect(totalInput).toHaveValue('20,000.05');
      await act(async () => {
        await user.clear(totalInput);
        await user.type(totalInput, '30000');
      });
      expect(totalInput).toHaveValue('300.00');

      // Returning to itemized split type, total should update to be atleast sum of itemized totals
      await act(async () => {
        await user.click(itemizedButton);
      });
      expect(totalInput).toHaveValue('2,000.00');

      // Switch to balanced type
      await act(async () => {
        await user.click(balancedButton);
        await user.type(totalInput, '00');
      });
      expect(totalInput).toHaveValue('200,000.00');

      // Switch to Itemized type
      // Since total is larger than itemized total, totalInput should not be changed.
      await act(async () => {
        await user.click(itemizedButton);
      });
      expect(totalInput).toHaveValue('200,000.00');
    },
  );

  it('Balanced Split Type Flow', async () => {
    await act(async () => {
      await user.click(screen.getByLabelText('Split Type:'));
      await user.click(screen.getByRole('button', { name: 'Balanced' }));
    });

    const balancedCheckboxes = screen.getAllByRole('checkbox');
    const totalInput = screen.getByLabelText('Total Amount');
    const continueButton = screen.getByRole('button', { name: 'Continue' });

    await act(async () => {
      await user.type(totalInput, '10000');
    });
    expect(balancedCheckboxes.length).toBe(4);

    for (let checkbox of balancedCheckboxes) {
      expect(checkbox).toBeChecked();
    }

    const balancedAmts = screen.getAllByTestId('balanced-amt');
    expect(balancedAmts[0]).toHaveTextContent('25.00');

    await act(async () => {
      await user.click(balancedCheckboxes[3]);
      await user.click(balancedCheckboxes[2]);
    });

    expect(balancedAmts[0]).toHaveTextContent('50.00');
    expect(balancedAmts[1]).toHaveTextContent('50.00');

    await act(async () => {
      await user.click(balancedCheckboxes[0]);
      await user.click(balancedCheckboxes[1]);
    });

    // Error message shows up when no items are selected and continue is pressed
    expect(balancedAmts[0]).toHaveTextContent('0.00');

    await act(async () => {
      await user.click(continueButton);
    });

    const errorText = screen.getByText('Must have atleast 1 paying member');
    expect(errorText).toBeInTheDocument();

    // Error message is removed when user checks any boxes
    await act(async () => {
      await user.click(balancedCheckboxes[0]);
      await user.click(balancedCheckboxes[1]);
    });

    expect(errorText).not.toBeInTheDocument();

    // Display the balanced split info on the NewTransaction Component
    await act(async () => {
      await user.click(continueButton);
    });

    const balancedSplit = screen.getByLabelText('Per member:');
    expect(balancedSplit).toBeInTheDocument();
    expect(balancedSplit).toHaveValue('php 50.00');
    expect(screen.getAllByTestId('balanced-member-photo').length).toBe(2);

    const yourShareInput = screen.getByLabelText('member share');
    expect(yourShareInput).toBeInTheDocument();
    expect(yourShareInput).toHaveValue('50.00');

    await act(async () => {
      await user.type(
        screen.getByLabelText('Total Amount'),
        '{backspace}{backspace}{backspace}{backspace}{backspace}20000',
      );
    });
    expect(balancedSplit).toHaveValue('php 100.00');
    expect(yourShareInput).toHaveValue('100.00');

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'filter member' }));
      await user.click(screen.getByRole('button', { name: 'Jayni' }));
    });

    expect(screen.getByText("Jayni's Share")).toBeInTheDocument();
    expect(yourShareInput).toHaveValue('0.00');
  });
});
