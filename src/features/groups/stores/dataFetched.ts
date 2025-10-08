import { atom } from 'jotai';

export interface DataFetched {
  fetched: boolean;
  fetchedAt: number;
  staleTime: number;
}

const dataFetched: DataFetched = {
  fetched: false,
  fetchedAt: 0,
  staleTime: 5 * 60 * 1000,
};

export const dataFetchedAtom = atom(dataFetched);
