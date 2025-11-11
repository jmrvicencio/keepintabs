import { KeyboardEvent, HTMLAttributes } from 'react';

export const buttonHandleKeypress = (callback: (() => any) | undefined) => (e: KeyboardEvent) => {
  if (e.key == 'Enter' || e.key == ' ') {
    callback?.();
  }
};

export const buttonRole = (callback: (() => any) | undefined): HTMLAttributes<HTMLElement> => ({
  role: 'button',
  onClick: callback,
  onKeyDown: (e: KeyboardEvent) => {
    if (e.key == 'Enter' || e.key == ' ') callback?.();
  },
});
