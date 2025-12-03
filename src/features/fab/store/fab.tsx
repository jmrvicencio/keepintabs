import { atom } from 'jotai';
import DefaultFab from '../components/DefaultFab';
import { JSX } from 'react';

export const showFabAtom = atom(true);

export const fabAtom = atom<JSX.Element | undefined>();
