import '@shared/styles/globals.css';
import { createRoot } from 'react-dom/client';
import { AppProviders } from '@shared/providers/AppProviders';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { routes } from './config/appRoutes';

const router = createHashRouter(routes);

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <AppProviders>
    <RouterProvider router={router} />
  </AppProviders>,
);
