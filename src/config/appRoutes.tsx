import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

const PortfolioPage = lazy(() => import('@app/page'));

function LazyLoad({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background text-foreground">Cargando...</div>}>{children}</Suspense>;
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <LazyLoad>
        <PortfolioPage />
      </LazyLoad>
    ),
  },
];
