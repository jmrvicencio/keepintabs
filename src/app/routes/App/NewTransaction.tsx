import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const NewTransaction = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return <div>New Transaction Page</div>;
};

export default NewTransaction;
