import { createHashRouter, Outlet } from 'react-router-dom';
import Home from './routes/Home';
import Test from './routes/Test';
// import Dashboard from '../app/routes/App/Dashboard';

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
      let App = await import('./routes/App/App');
      return { Component: App.default };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          let Dashboard = await import('./routes/App/Dashboard');
          return { Component: Dashboard.default };
        },
      },
      {
        path: ':group',
        Component: Outlet,
        children: [
          {
            index: true,
            lazy: async () => {
              let Group = await import('./routes/App/Group');
              return { Component: Group.default };
            },
          },
          {
            path: 'new',
            lazy: async () => {
              let AddTransaction = await import('./routes/App/AddTransaction');
              return { Component: AddTransaction.default };
            },
          },
        ],
      },
    ],
  },
]);

export default router;
