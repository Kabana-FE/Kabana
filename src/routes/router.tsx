import { createBrowserRouter } from 'react-router-dom';

import { Error } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { default: Root } = await import('@/Root');
      return { Component: Root };
    },
    errorElement: <Error />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: Component } = await import('@/pages/landing/Landing');
          return { Component };
        },
      },
      {
        path: 'signup',
        lazy: async () => {
          const { default: Component } = await import('@/pages/auth/Signup');
          const { action } = await import('@/actions/Signup.action');
          return { Component, action };
        },
      },
      {
        path: 'login',
        lazy: async () => {
          const { default: Component } = await import('@/pages/auth/Signin');
          const { action } = await import('@/actions/Signin.action');
          return { Component, action };
        },
      },
      {
        path: 'mypage',
        lazy: async () => {
          const { default: Component } = await import('@/pages/user/Me');
          const { loader } = await import('@/loaders/Account.loader');
          const { action } = await import('@/actions/Account.action');
          return { Component, loader, action };
        },
      },
      {
        path: 'mydashboard',
        children: [
          {
            index: true,
            lazy: async () => {
              const { default: Component } = await import('@/pages/dashboards/DashboardList');
              const { loader } = await import('@/loaders/DashboardList.loader');
              const { action } = await import('@/actions/DashboardList.action');
              return { Component, loader, action };
            },
          },
          {
            path: 'dashboard/:dashboardId',
            lazy: async () => {
              const { default: Component } = await import('@/pages/dashboards/DashboardDetail');
              const { loader } = await import('@/loaders/DashboardDetail.loader');
              const { action } = await import('@/actions/DashboardDetail.action');
              return { Component, loader, action };
            },
          },
          {
            path: 'dashboard/:dashboardId/edit',
            lazy: async () => {
              const { default: Component } = await import('@/pages/dashboards/DashboardEdit');
              const { loader } = await import('@/loaders/DashboardEdit.loader');
              const { action } = await import('@/actions/DashboardEdit.action');
              return { Component, loader, action };
            },
          },
        ],
      },
      {
        path: '*',
        lazy: async () => {
          const { default: Component } = await import('@/pages/error/NotFound');
          return {
            Component,
          };
        },
      },
    ],
  },
]);

export default router;
