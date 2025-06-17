import { createBrowserRouter } from 'react-router-dom';

import { ApiErrorBoundary } from '@/components/errorBoundary/ApiErrorBoundary';
import GlobalErrorBoundary from '@/components/errorBoundary/GlobalErrorBoundary';
import { ROUTES } from '@/constants/paths/routes';
import errorTestLoader from '@/loaders/test/errorTestLoader';

const { APP, SIGNIN, SIGNUP, MYPAGE, DASHBOARD_LIST, DASHBOARD_DETAIL, DASHBOARD_EDIT, NOT_FOUND } = ROUTES;

const router = createBrowserRouter([
  {
    path: APP,
    lazy: async () => {
      const { default: Root } = await import('@/App');
      const { rootLoader } = await import('@/loaders/rootLoader');
      return { Component: Root, loader: rootLoader };
    },
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        lazy: async () => {
          const { default: LandingLayout } = await import('@/layouts/Landing');
          return { Component: LandingLayout };
        },
        children: [
          {
            index: true,
            lazy: async () => {
              const { default: Component } = await import('@/pages/landing');
              return { Component };
            },
          },
        ],
      },
      {
        lazy: async () => {
          const { default: SimpleLayout } = await import('@/layouts/Simple');
          return { Component: SimpleLayout };
        },
        errorElement: <ApiErrorBoundary />,
        children: [
          {
            path: SIGNUP,
            lazy: async () => {
              const { default: Component } = await import('@/pages/auth/Signup');
              const { action } = await import('@/actions/auth/signupAction');
              return { Component, action };
            },
          },
          {
            path: SIGNIN,
            lazy: async () => {
              const { default: Component } = await import('@/pages/auth/Signin');
              const { action } = await import('@/actions/auth/signinAction');
              return { Component, action };
            },
          },
        ],
      },

      {
        lazy: async () => {
          const { default: DashboardLayout } = await import('@/layouts/Dashboard');
          const { authGuardLoader } = await import('@/loaders/authGuardLoader');
          return { Component: DashboardLayout, loader: authGuardLoader };
        },
        children: [
          {
            errorElement: <ApiErrorBoundary />,
            children: [
              {
                path: MYPAGE,
                lazy: async () => {
                  const { default: Component } = await import('@/pages/user/Mypage');
                  const { loader } = await import('@/loaders/myPage/myPageLoader');
                  const { action } = await import('@/actions/myPage/myPageAction');
                  return { Component, loader, action };
                },
              },
              {
                path: DASHBOARD_LIST,
                lazy: async () => {
                  const { default: Component } = await import('@/pages/dashboards/DashboardList');
                  const { loader } = await import('@/loaders/dashboard/listLoader');
                  const { action } = await import('@/actions/dashboard/listAction');
                  return { Component, loader, action };
                },
              },
              {
                path: DASHBOARD_DETAIL,
                lazy: async () => {
                  const { default: Component } = await import('@/pages/dashboards/DashboardDetail');
                  const { loader } = await import('@/loaders/dashboard/detailLoader');
                  const { action } = await import('@/actions/dashboard/detailAction');
                  return { Component, loader, action };
                },
              },
              {
                path: DASHBOARD_EDIT,
                lazy: async () => {
                  const { default: Component } = await import('@/pages/dashboards/DashboardEdit');
                  const { loader } = await import('@/loaders/dashboard/editLoader');
                  const { action } = await import('@/actions/dashboard/editAction');
                  return { Component, loader, action };
                },
              },
              ...(import.meta.env.DEV
                ? [
                    {
                      path: 'test-api-error',
                      loader: errorTestLoader,
                    },
                  ]
                : []),
            ],
          },
        ],
      },
      ...(import.meta.env.DEV
        ? [
            {
              path: 'test-global-error',
              loader: errorTestLoader,
            },
          ]
        : []),
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
