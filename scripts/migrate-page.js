import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcPath = path.join(root, 'app/page.tsx');
const destPath = path.join(root, 'src/App.tsx');

let content = fs.readFileSync(srcPath, 'utf8');

content = content.replace(/'use client';\n\n/, '');
content = content.replace(/import Image from 'next\/image';\n/, '');
content = content.replace(
  /(const ADDRESS = 'Москва, ВДНХ, ул\. Ярославская';)/,
  "$1\nconst API_LEAD_URL = import.meta.env.VITE_API_LEAD_URL ?? '/api/lead';"
);
content = content.replace(
  /<Image src=\{s\.img\} alt=\{s\.title\} fill className="object-cover group-hover:scale-110 transition-transform duration-500" \/>/g,
  '<img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />'
);
content = content.replace(
  /<Image src=\{r\.img \|\| '\/service-1\.jpg'\} alt=\{r\.title\} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="[^"]*" \/>/g,
  '<img src={r.img || \'/service-1.jpg\'} alt={r.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />'
);
content = content.replace(
  /<Image src=\{p\.img\} alt=\{p\.title\} fill className="object-cover" sizes="[^"]*" \/>/g,
  '<img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />'
);
content = content.replace(
  /<Image src=\{item\.image\} alt=\{item\.title\} fill className="object-cover group-hover:scale-110 transition-transform duration-500" \/>/g,
  '<img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />'
);
content = content.replace(
  /<Image src=\{portfolioItems\[lightboxIndex\]\.image\} alt=\{portfolioItems\[lightboxIndex\]\.title\} width=\{1200\} height=\{800\} className="max-w-full max-h-full object-contain" \/>/g,
  '<img src={portfolioItems[lightboxIndex].image} alt={portfolioItems[lightboxIndex].title} className="max-w-full max-h-full object-contain" />'
);
content = content.replace(
  /<Image src=\{src\} alt="" fill className="object-contain object-center" sizes="420px" onError=\{\(\) => fallback && setSrc\(fallback\)\} \/>/g,
  '<img src={src} alt="" className="absolute inset-0 w-full h-full object-contain object-center" onError={() => fallback && setSrc(fallback)} />'
);
content = content.replace(/fetch\('\/api\/lead',/g, 'fetch(API_LEAD_URL,');
content = content.replace(/export default function HomePage\(\)/, 'export default function App()');

fs.mkdirSync(path.dirname(destPath), { recursive: true });
fs.writeFileSync(destPath, content);
console.log('Created src/App.tsx');
