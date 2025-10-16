import { atom } from 'jotai';
import { ReactNode } from 'react';

export interface Popup {
  title?: string;
  body: ReactNode;
  closeCallback?: () => any;
}

const popup: Popup = {
  title: 'Popup Title',
  body: (
    <>
      <p>Popup Body</p>
    </>
  ),
};

export const popupAtom = atom<Popup>(popup);

export const showPopupAtom = atom<boolean>(false);
