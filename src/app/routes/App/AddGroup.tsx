import { Link } from 'react-router-dom';

import { ChevronLeft } from 'lucide-react';
import { ROUTES } from '../../routes';

const AddGroup = () => {
  return (
    <main className="flex w-full flex-col border-1 border-red-500">
      <div className="w-full">
        <Link to={ROUTES.APP}>
          <p>test</p>
        </Link>
      </div>
      <p>test 2</p>
    </main>
  );
};

export default AddGroup;
