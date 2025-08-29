import { createHashRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Test from '../pages/Test';
// import Dashboard from '../pages/App/Dashboard';

const router = createHashRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: 'test',
    Component: Test,
  },
  {
    path: 'app',
    lazy: async () => {
      let App = await import('../pages/App');
      return { Component: App.default };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          let Dashboard = await import('../pages/App/Dashboard');
          return { Component: Dashboard.default };
        },
      },
      {
        path: ':group',
        lazy: async () => {
          let Group = await import('../pages/App/Group');
          return { Component: Group.default };
        },
      },
    ],
  },
]);

export default router;
