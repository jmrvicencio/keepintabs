import { createHashRouter, Outlet, Navigate } from 'react-router-dom';
import Home from './routes/Home';
import Test from './routes/Test';

export const ROUTES = {
  APP: '/app',
  GROUPS: '/app/groups',
  NEW_GROUP: '/app/groups/new',
  TEST: '/test',
  LANDING: '/',
  NEW_TRANSACTION: '/app/transactions/new',
  TRANSACTION: '/transactions',
  NOTIFICATION: '/app/notifications',
};

export const getGroupRoute = (groupId: string) => {
  return `${ROUTES.GROUPS}/${groupId}`;
};

export const getTransactionRoute = (groupId: string, transactionId: string) => {
  return `${getGroupRoute(groupId)}${ROUTES.TRANSACTION}/${transactionId}`;
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
            children: [
              {
                index: true,
                lazy: async () => {
                  let Group = await import('./routes/App/Group');
                  return { Component: Group.default };
                },
              },
              {
                path: 'members',
                lazy: async () => {
                  let Members = await import('@/app/routes/App/Members');
                  return { Component: Members.default };
                },
              },
              {
                path: 'transactions/:transaction',
                lazy: async () => {
                  let Transaction = await import('@/app/routes/App/Transaction');
                  return { Component: Transaction.default };
                },
              },
            ],
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
      {
        path: 'transactions',
        Component: Outlet,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.NEW_TRANSACTION} replace />,
          },
          {
            path: 'new',
            lazy: async () => {
              let NewTransaction = await import('./routes/App/NewTransaction');
              return { Component: NewTransaction.default };
            },
          },
        ],
      },
    ],
  },
]);

export default router;
