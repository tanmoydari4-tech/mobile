import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const docsDir = path.resolve('docs');
const bundleDir = path.resolve('gh-bundle');

if (fs.existsSync(distDir)) {
  // 1. Sync dist -> docs (for 'Deploy from a branch: main -> /docs')
  fs.rmSync(docsDir, { recursive: true, force: true });
  fs.cpSync(distDir, docsDir, { recursive: true });
  fs.writeFileSync(path.join(docsDir, '.nojekyll'), '');
  if (fs.existsSync(path.join(docsDir, 'index.html'))) {
    fs.copyFileSync(path.join(docsDir, 'index.html'), path.join(docsDir, '404.html'));
  }

  // 2. Sync compiled JS & CSS -> gh-bundle (for 'Deploy from a branch: main -> / (root)')
  fs.rmSync(bundleDir, { recursive: true, force: true });
  fs.mkdirSync(bundleDir, { recursive: true });
  const assetsDir = path.join(distDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    const jsFile = files.find(f => f.endsWith('.js'));
    const cssFile = files.find(f => f.endsWith('.css'));
    if (jsFile) {
      fs.copyFileSync(path.join(assetsDir, jsFile), path.join(bundleDir, 'app.js'));
    }
    if (cssFile) {
      fs.copyFileSync(path.join(assetsDir, cssFile), path.join(bundleDir, 'app.css'));
    }
  }

  // 3. Ensure root .nojekyll exists
  fs.writeFileSync(path.resolve('.nojekyll'), '');
  console.log('Synced GitHub Pages artifacts to /docs and /gh-bundle');
}
