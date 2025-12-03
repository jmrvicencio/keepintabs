import { JSX, useEffect } from 'react';
import { useAtom } from 'jotai';
import { showFabAtom, fabAtom } from '../store/fab';
import DefaultFab from '../components/DefaultFab';

const useFab = (group?: string) => {
  const [showFab, setShowFab] = useAtom(showFabAtom);
  const [fab, setFab] = useAtom<JSX.Element | undefined>(fabAtom);

  const resetFab = () => {
    setShowFab(true);
  };

  useEffect(() => {
    if (!group && fab) return;
    setFab(<DefaultFab group={group ?? ''} />);
  }, [group]);

  return { showFab, setShowFab, fab, setFab, resetFab };
};

export default useFab;
