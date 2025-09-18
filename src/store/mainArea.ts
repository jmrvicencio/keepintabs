import { type RefObject } from 'react';
import { atom } from 'jotai';

export const MainContentRefAtom = atom<RefObject<HTMLDivElement | null> | null>(null);
