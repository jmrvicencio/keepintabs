import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';

function Test() {
  const navigate = useNavigate();

  return <p onClick={() => navigate(ROUTES.APP)}>This is a test</p>;
}

export default Test;
