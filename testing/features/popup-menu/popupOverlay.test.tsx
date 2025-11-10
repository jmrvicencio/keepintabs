import { act, Children, ReactNode } from 'react';
import { describe, it, beforeEach, test, expect, vi } from 'vitest';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { createStore, Provider } from 'jotai';
import { ROUTES } from '@/app/routes';
import PopupOverlay from '@/features/popup-menu/components/PopupOverlay';
import { usePopupOverlay } from '@/features/popup-menu/hooks/usePopupOverlay';
import { PopupMenu } from '@/features/popup-menu/stores/PopupAtom';

const mockNavigate = vi.fn();
const { mockUseLocation } = vi.hoisted(() => {
  return {
    mockUseLocation: vi.fn(),
  };
});

// Mock useLocation module
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useLocation: mockUseLocation,
    useNavigate: () => mockNavigate,
  };
});

describe('[Unit] [UsePopupOverlay] Popup Overlay', () => {
  beforeEach(() => {
    // Define the groupId in state to be a groupId so that it can be referenced
    // as the previous group before switching to this page.
    mockUseLocation.mockImplementation(() => ({
      pathname: 'overlay-test',
      search: '',
      hash: '',
      state: { groupId: 'abcd' },
      key: '',
    }));

    const store = createStore();
    const wrapper = ({ children }: { children: ReactNode }) => <Provider store={store}>{children}</Provider>;
    const { result } = renderHook(() => usePopupOverlay(), { wrapper });
    const { setPopup, setShowPopup } = result.current;
    const { container } = render(
      <MemoryRouter initialEntries={['/overlay-test']}>
        <Routes>
          <Route
            path="/overlay-test"
            element={
              <Provider store={store}>
                <PopupOverlay />
                <button type="button" onClick={() => setShowPopup(true)}>
                  call overlay
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const nextPopup: PopupMenu = {
                      type: 'menu',
                      options: [
                        {
                          label: 'first option',
                        },
                      ],
                    };

                    setPopup(nextPopup);
                    setShowPopup(true);
                  }}
                >
                  call menu
                </button>
              </Provider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );
  });

  const user = userEvent.setup();

  it('Overlay can be called with usePopupOverlay hook', async () => {
    const callButton = screen.getByRole('button', { name: 'call overlay' });

    await act(async () => {
      await user.click(callButton);
    });

    const popup = screen.getByTestId('popup-menu');
    expect(popup).toBeInTheDocument();

    await act(async () => {
      await user.click(popup);
    });

    expect(popup).toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByTestId('popup-overlay'));
    });

    expect(popup).not.toBeInTheDocument();
  });

  it('Overlay can be called with usePopupOverlay hook', async () => {
    const callButton = screen.getByRole('button', { name: 'call menu' });

    await act(async () => {
      await user.click(callButton);
    });

    expect(screen.getByText('first option')).toBeInTheDocument();
  });
});
