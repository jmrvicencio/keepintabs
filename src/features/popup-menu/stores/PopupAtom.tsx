import { atom } from 'jotai';
import { ReactNode, type RefObject } from 'react';

export interface PopupOverlay {
  type: 'popup-overlay';
  title?: string;
  body: ReactNode;
  options?: {
    padding?: {
      x: number;
      y: number;
    };
  };
  closeCallback?: () => any;
}

export interface PopupMenu {
  type: 'menu';
  reference?: RefObject<HTMLElement | null>;
  options: {
    label: string;
    action?: () => any;
  }[];
  closeCallback?: () => any;
}

const popup: PopupOverlay | PopupMenu = {
  type: 'popup-overlay',
  title: 'Popup Title',
  body: (
    <>
      <p>Popup Body</p>
    </>
  ),
};

export const popupAtom = atom<PopupOverlay | PopupMenu>(popup);

export const showPopupAtom = atom<boolean>(false);
