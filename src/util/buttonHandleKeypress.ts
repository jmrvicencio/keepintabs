import { KeyboardEvent } from 'react';

export const buttonHandleKeypress = (callback: () => any) => (e: KeyboardEvent) => {
  if (e.key == 'Enter' || e.key == ' ') {
    callback();
  }
};
