import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@/constants/paths/routes';
import { Error } from '@/pages';

const { APP, SIGNIN, SIGNUP, MYPAGE, DASHBOARD_LIST, DASHBOARD_DETAIL, DASHBOARD_EDIT, NOT_FOUND } = ROUTES;

const router = createBrowserRouter([
  {
    path: APP,
    lazy: async () => {
      const { default: Root } = await import('@/App');
      const { rootLoader } = await import('@/loaders/rootLoader');
      return { Component: Root, loader: rootLoader };
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
          const { action } = await import('@/actions/signupAction');
          return { Component, action };
        },
      },
      {
        path: SIGNIN,
        lazy: async () => {
          const { default: Component } = await import('@/pages/auth/Signin');
          const { action } = await import('@/actions/signinAction');
          return { Component, action };
        },
      },

      {
        lazy: async () => {
          const { default: DashboardLayout } = await import('@/layouts/Dashboard');
          const { authGuardLoader } = await import('@/loaders/authGuardLoader');
          return { Component: DashboardLayout, loader: authGuardLoader };
        },
        children: [
          // --- Protected Routes (인증이 필요한 페이지들) ---
          {
            path: MYPAGE,
            lazy: async () => {
              const { default: Component } = await import('@/pages/user/MyPage');
              const { loader } = await import('@/loaders/myPageLoader');
              const { action } = await import('@/actions/myPageAction');
              return { Component, loader, action };
            },
          },
          {
            path: DASHBOARD_LIST,
            lazy: async () => {
              const { default: Component } = await import('@/pages/dashboards/DashboardList');
              const { loader } = await import('@/loaders/dashboardListLoader');
              const { action } = await import('@/actions/dashboardListAction');
              return { Component, loader, action };
            },
          },
          {
            path: DASHBOARD_DETAIL,
            lazy: async () => {
              const { default: Component } = await import('@/pages/dashboards/DashboardDetail');
              const { loader } = await import('@/loaders/dashboardDetailLoader');
              const { action } = await import('@/actions/dashboardDetailAction');
              return { Component, loader, action };
            },
          },
          {
            path: DASHBOARD_EDIT,
            lazy: async () => {
              const { default: Component } = await import('@/pages/dashboards/DashboardEdit');
              const { loader } = await import('@/loaders/dashboardEditLoader');
              const { action } = await import('@/actions/dashboardEditAction');
              return { Component, loader, action };
            },
          },
        ],
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
