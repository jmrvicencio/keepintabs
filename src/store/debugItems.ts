import { atom } from 'jotai';

interface DebugOption {
  text: string;
  action: () => void;
}

export const debugOptionsAtom = atom<Record<string, () => void>>({});
