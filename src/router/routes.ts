import { createHashRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Test from '../pages/Test';
import App from '../pages/App';

const router = createHashRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/test',
    Component: Test,
  },
  {
    path: '/app',
    Component: App,
  },
]);

export default router;
