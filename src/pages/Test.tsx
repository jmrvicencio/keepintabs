import { useNavigate } from 'react-router-dom';

function Test() {
  const navigate = useNavigate();

  return <p onClick={() => navigate('/app')}>This is a test</p>;
}

export default Test;
