import { atom } from 'jotai';
import { ReactNode } from 'react';

interface Popup {
  title?: string;
  body: ReactNode;
}

const popup: Popup = {
  title: '',
  body: null,
};

export const popupAtom = atom<Popup>(popup);

export const showPopupAtom = atom(false);
