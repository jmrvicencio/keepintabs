import { atom } from 'jotai';
import { ReactNode, type RefObject } from 'react';
import { Popup } from '../types';

const popup: Popup = {
  type: 'popup-overlay',
  title: 'Popup Title',
  body: (
    <>
      <p>Popup Body</p>
    </>
  ),
};

export const popupAtom = atom<Popup>(popup);

export const showPopupAtom = atom<boolean>(false);
