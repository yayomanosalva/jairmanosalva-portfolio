import { Link } from 'react-router-dom';
import { Seo } from '@components/common/Seo';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="404 - Página no encontrada" />
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-8xl font-bold text-primary">404</h1>
        <p className="mb-8 text-lg text-gray-400">
          La página que buscas no existe o fue movida.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark"
        >
          <Home size={16} />
          Volver al inicio
        </Link>
      </div>
    </>
  );
}
