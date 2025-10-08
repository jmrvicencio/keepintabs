import { describe, it, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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

describe('New Transaction Page', () => {
  it('Groups section displays the name of the current active group', async () => {
    const { container } = render(
      <MemoryRouter>
        <NewTransaction />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: 'Test Group' })).toBeInTheDocument();
  });
});
