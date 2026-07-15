import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginTailwindcss(),
  ],
  source: {
    alias: {
      '@': './src',
      '@app': './src/app',
      '@features': './src/features',
      '@shared': './src/shared',
      '@components': './src/shared/components',
      '@hooks': './src/shared/hooks',
      '@lib': './src/shared/lib',
    },
  },
  html: {
    title: 'Jair Manosalva - Portfolio',
    favicon: './public/portfolio/firma.png',
  },
});
