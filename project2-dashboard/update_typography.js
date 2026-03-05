const fs = require('fs');

const path = 'index.html';
let html = fs.readFileSync(path, 'utf8');

html = html.replace(
  /<link href="https:\/\/fonts.googleapis.com\/css2\?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">/,
  `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Quicksand:wght@400;500;600&display=swap" rel="stylesheet">`
);

fs.writeFileSync(path, html);

const cssPath = 'styles.css';
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(/--font-heading: 'Lora', serif;/, `--font-heading: 'Cormorant Garamond', serif;`);
css = css.replace(/--font-body: 'Nunito', sans-serif;/, `--font-body: 'Quicksand', sans-serif;`);

css = css.replace(
  /\.sidebar-header \.subtitle {[\s\S]*?}/,
`.sidebar-header .subtitle {
  color: var(--accent-primary);
  font-size: 1rem;
  font-family: var(--font-heading);
  font-style: italic;
}`
);

fs.writeFileSync(cssPath, css);
