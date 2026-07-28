import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const outputRoot = resolve(projectRoot, 'dist');
const clientRoot = resolve(outputRoot, 'client');
const serverRoot = resolve(outputRoot, 'server');

const publicFiles = [
  'index.html',
  'favicon.svg',
  'favicon-32.png',
  'favicon.ico',
  'robots.txt',
  'sitemap.xml',
];

await rm(outputRoot, { recursive: true, force: true });
await mkdir(clientRoot, { recursive: true });
await mkdir(serverRoot, { recursive: true });

for (const file of publicFiles) {
  await cp(resolve(projectRoot, file), resolve(clientRoot, file));
}

await cp(resolve(projectRoot, 'assets'), resolve(clientRoot, 'assets'), {
  recursive: true,
});

const workerSource = `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    const fallbackUrl = new URL('/index.html', request.url);
    return env.ASSETS.fetch(new Request(fallbackUrl, request));
  },
};
`;

await writeFile(resolve(serverRoot, 'index.js'), workerSource, 'utf8');

console.log('Portfolio build ready in dist/.');
