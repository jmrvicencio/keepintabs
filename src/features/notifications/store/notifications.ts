import { atom } from 'jotai';
import { Notification } from '../types';
import { QuerySnapshot } from 'firebase/firestore';

export const notificationsAtom = atom<QuerySnapshot<Notification>>();
