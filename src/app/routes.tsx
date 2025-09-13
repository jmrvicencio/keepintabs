import { createHashRouter, Outlet, Navigate } from 'react-router-dom';
import Home from './routes/Home';
import Test from './routes/Test';

export const ROUTES = {
  APP: '/app',
  GROUPS: '/app/groups',
  NEW_GROUP: '/app/groups/new',
  TEST: '/test',
  LANDING: '/',
};

export const getGroupRoute = (groupId: string) => {
  return `${ROUTES.GROUPS}/${groupId}`;
};

const router = createHashRouter([
  {
    index: true,
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
        path: 'groups',
        Component: Outlet,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.APP} replace />,
          },
          {
            path: ':group',
            lazy: async () => {
              let Group = await import('./routes/App/Group');
              return { Component: Group.default };
            },
          },
          {
            path: 'new',
            lazy: async () => {
              let AddGroup = await import('./routes/App/NewGroup');
              return { Component: AddGroup.default };
            },
          },
        ],
      },
    ],
  },
]);

export default router;
