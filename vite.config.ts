import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import {ROUTES} from './src/routes';

// Writes dist/<route>/index.html for every page so direct visits to URLs like
// /privacy load the app on any static host instead of returning a 404.
function routePages(): Plugin {
  return {
    name: 'route-pages',
    apply: 'build',
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist');
      const html = fs.readFileSync(path.join(outDir, 'index.html'), 'utf-8');
      for (const {path: routePath} of Object.values(ROUTES)) {
        if (routePath === '/') continue;
        const dir = path.join(outDir, routePath);
        fs.mkdirSync(dir, {recursive: true});
        fs.writeFileSync(path.join(dir, 'index.html'), html);
      }
      // Unknown URLs fall back to the app (hosts that support 404.html)
      fs.writeFileSync(path.join(outDir, '404.html'), html);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), routePages()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
