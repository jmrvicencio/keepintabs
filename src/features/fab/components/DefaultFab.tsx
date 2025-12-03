import { useParams, Link } from 'react-router-dom';
import { ROUTES } from '@/app/routes';
import { Plus } from 'lucide-react';
import FAB from './FAB';

const DefaultFab = ({ group }: { group: string }) => {
  return (
    <Link to={ROUTES.NEW_TRANSACTION} state={{ groupId: group }}>
      <FAB className={`absolute bottom-6 left-1/2 z-5 w-fit -translate-x-1/2 md:hidden`}>
        <Plus />
        Add Transaction
      </FAB>
    </Link>
  );
};

export default DefaultFab;
