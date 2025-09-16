import { describe, it, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import NewTransaction from '../src/app/routes/App/NewTransaction';
import { MemoryRouter } from 'react-router-dom';

describe('New Transaction Page', () => {
  it('allows users to input transaction amount', async () => {
    const { container } = render(
      <MemoryRouter>
        <NewTransaction />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
