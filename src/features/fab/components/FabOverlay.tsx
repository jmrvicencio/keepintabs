import { useParams } from 'react-router-dom';
import useFab from '../hooks/useFab';
import DefaultFab from './DefaultFab';

const FabOverlay = () => {
  const { group } = useParams();
  const { showFab, fab } = useFab(group);

  return <>{showFab && fab}</>;
};

export default FabOverlay;
