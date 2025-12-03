import { useAtom } from 'jotai';
import showFabAtom from '../store/showFab';

const useFab = () => {
  const [showFab, setShowFab] = useAtom(showFabAtom);

  return { showFab, setShowFab };
};

export default useFab;
