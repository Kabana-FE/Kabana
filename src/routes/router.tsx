import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { Error } from '@/pages';

const { ROOT, SIGNIN, SIGNUP, MYPAGE, DASHBOARD_LIST, DASHBOARD_DETAIL, DASHBOARD_EDIT, NOT_FOUND } = ROUTES;

const router = createBrowserRouter([
  {
    path: ROOT,
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
        path: SIGNUP,
        lazy: async () => {
          const { default: Component } = await import('@/pages/auth/Signup');
          const { action } = await import('@/actions/Signup.action');
          return { Component, action };
        },
      },
      {
        path: SIGNIN,
        lazy: async () => {
          const { default: Component } = await import('@/pages/auth/Signin');
          const { action } = await import('@/actions/Signin.action');
          return { Component, action };
        },
      },
      {
        path: MYPAGE,
        lazy: async () => {
          const { default: Component } = await import('@/pages/user/Mypage');
          const { loader } = await import('@/loaders/Account.loader');
          const { action } = await import('@/actions/Account.action');
          return { Component, loader, action };
        },
      },
      {
        path: DASHBOARD_LIST,
        index: true,
        lazy: async () => {
          const { default: Component } = await import('@/pages/dashboards/DashboardList');
          const { loader } = await import('@/loaders/DashboardList.loader');
          const { action } = await import('@/actions/DashboardList.action');
          return { Component, loader, action };
        },
      },
      {
        path: DASHBOARD_DETAIL,
        lazy: async () => {
          const { default: Component } = await import('@/pages/dashboards/DashboardDetail');
          const { loader } = await import('@/loaders/DashboardDetail.loader');
          const { action } = await import('@/actions/DashboardDetail.action');
          return { Component, loader, action };
        },
      },
      {
        path: DASHBOARD_EDIT,
        lazy: async () => {
          const { default: Component } = await import('@/pages/dashboards/DashboardEdit');
          const { loader } = await import('@/loaders/DashboardEdit.loader');
          const { action } = await import('@/actions/DashboardEdit.action');
          return { Component, loader, action };
        },
      },
      {
        path: NOT_FOUND,
        lazy: async () => {
          const { default: Component } = await import('@/pages/error/NotFound');
          return { Component };
        },
      },
    ],
  },
]);

export default router;
