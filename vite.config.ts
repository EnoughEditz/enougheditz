import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

// Server-side Google Drive live scraper & Apps Script proxy
function driveSyncProxyPlugin(): Plugin {
  return {
    name: 'drive-sync-proxy',
    configureServer(server) {
      server.middlewares.use('/api/sync-drive', async (req, res) => {
        try {
          const urlObj = new URL(req.url || '', 'http://localhost:3000');
          const targetUrl = urlObj.searchParams.get('url') || '';
          const folderIdParam = urlObj.searchParams.get('folderId') || '1SG65fVDS0ZnfQxnsQyjuKBnm8rpQMASY';

          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');

          // Case 1: Google Apps Script Web App URL
          if (targetUrl.includes('script.google.com')) {
            const cleanUrl = targetUrl.replace(/\/dev$/, '/exec');
            const response = await fetch(cleanUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
              }
            });
            const text = await response.text();
            let json;
            try {
              json = JSON.parse(text);
              res.statusCode = 200;
              res.end(JSON.stringify(json));
              return;
            } catch {
              // fallback to scraping drive folder if apps script failed
            }
          }

          // Case 2: Direct Google Drive folder scrape
          const rootFolderId = targetUrl.match(/folders\/([a-zA-Z0-9_-]+)/)?.[1] || folderIdParam;

          const rootRes = await fetch(`https://drive.google.com/drive/folders/${rootFolderId}`, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });
          const rootHtml = await rootRes.text();

          const folderRegex = /class="JxSEve"[^>]*?aria-label="([^"]+?)\s+Shared folder"[^>]*?ssk=[\x27"]\d+:auSv\d+:([a-zA-Z0-9_-]+)-/g;
          let match;
          const folders: Array<{ name: string; id: string }> = [];
          while ((match = folderRegex.exec(rootHtml)) !== null) {
            folders.push({ name: match[1], id: match[2].replace(/-0$/, '') });
          }

          const categories = [];
          for (const f of folders) {
            const subRes = await fetch(`https://drive.google.com/drive/folders/${f.id}`, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
              }
            });
            const subHtml = await subRes.text();
            const fileRegex = /class="JxSEve"[^>]*?aria-label="([^"]+?)\s+Video Shared"[^>]*?ssk=[\x27"]\d+:auSv\d+:([a-zA-Z0-9_-]+)-/g;
            let fm;
            const videos = [];
            while ((fm = fileRegex.exec(subHtml)) !== null) {
              const fileId = fm[2].replace(/-0$/, '');
              videos.push({
                id: fileId,
                title: fm[1].replace(/\.(mp4|mov|webm)$/i, '').replace(/&amp;/g, '&'),
                url: `https://drive.google.com/file/d/${fileId}/preview`,
                thumb: `https://lh3.googleusercontent.com/d/${fileId}=w800`
              });
            }

            categories.push({
              id: f.id,
              label: f.name.toLowerCase(),
              folderUrl: `https://drive.google.com/drive/folders/${f.id}`,
              videos
            });
          }

          res.statusCode = 200;
          res.end(JSON.stringify({ status: 'success', categories }));
        } catch (err: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message || 'Server sync failed' }));
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), driveSyncProxyPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
