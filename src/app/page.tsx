import { SiteHeader } from '@features/home/site-header';
import { Hero } from '@features/home/hero';
import { About } from '@features/home/about';
import { Services } from '@features/home/services';
import { Skills } from '@features/home/skills';
import { Projects } from '@features/home/projects';
import { Faq } from '@features/home/faq';
import { Blog } from '@features/home/blog';
import { Contact } from '@features/home/contact';
import { SiteFooter } from '@features/home/site-footer';
import { Seo } from '@components/common/Seo';

export default function HomePage() {
  return (
    <>
      <Seo
        title="Jair Manosalva — Senior Frontend Developer"
        description="Portafolio de Jair Manosalva, Senior Frontend Developer con más de 10 años de experiencia en React, Angular y TypeScript."
      />
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Faq />
        <Blog />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
