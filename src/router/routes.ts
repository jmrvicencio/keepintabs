import { createHashRouter } from 'react-router-dom';
import App from '../App';
import Test from '../Test';

const router = createHashRouter([
  {
    path: '/',
    Component: App,
  },
  {
    path: '/test',
    Component: Test,
  },
]);

export default router;
