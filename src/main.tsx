import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <ToastProvider /> */}
  </StrictMode>,
);

const Toaster = () => {
  return <div id={TOASTER_ID} />;
};

// ! 토스트는 좀 더 알아보고 다른 브랜치에서 수정할게요.
