import { createHashRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Test from '../pages/Test';
import App from '../pages/App';
import Dashboard from '../pages/App/Dashboard';

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
    children: [
      {
        index: true,
        Component: Dashboard,
      },
    ],
  },
]);

export default router;
