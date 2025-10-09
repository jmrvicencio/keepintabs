import { describe, it, beforeEach, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Group } from '../src/features/groups/types';

// Mock the module before it gets imported
vi.mock('../src/features/groups/hooks/useGroups', () => ({
  useGroups: vi.fn(() => ({
    groups: [
      {
        id: 'abcd',
        data: (): Group => ({
          balance: {},
          name: 'Test Group',
          memberUids: [],
          members: {},
        }),
      },
    ],
    loading: false,
    reload: vi.fn(),
  })),
}));

import NewTransaction from '../src/app/routes/App/NewTransaction';

beforeEach(() => {
  const { container } = render(
    <MemoryRouter>
      <NewTransaction />
    </MemoryRouter>,
  );
});

describe('[New Transaction] [Unit] New Transaction Page', () => {
  const user = userEvent.setup();

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

  it('Groups section displays the name of the current active group', async () => {
    expect(screen.getByRole('button', { name: 'Test Group' })).toBeInTheDocument();
  });
});
