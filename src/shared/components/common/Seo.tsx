import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title?: string;
  description?: string;
}

const SITE_NAME = 'Jair Manosalva';

export function Seo({ title, description = 'Portfolio & Proyectos' }: SeoProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
