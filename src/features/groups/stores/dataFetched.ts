import { atom } from 'jotai';

const dataFetched = {
  fetched: false,
  fetchedAt: 0,
  staleTime: 5 * 60 * 1000,
};

export const dataFetchedAtom = atom(dataFetched);
