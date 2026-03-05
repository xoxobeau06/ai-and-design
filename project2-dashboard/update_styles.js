const fs = require('fs');

const path = 'styles.css';
let css = fs.readFileSync(path, 'utf8');

// Update variables
css = css.replace(
  /\/\* Light Theme Variables \(Default\) \*\/[\s\S]*?\/\* Dark Theme Variables \*\//,
`/* Light Theme Variables (Default) */
:root[data-theme="light"] {
  --bg-app: #f9f6f0; /* Soft creamy white */
  --bg-sidebar: #f2efe9;
  --bg-panel: #ffffff;
  --bg-panel-hover: #fdfbf7;
  --bg-input: #ffffff;
  --border-color: #e6dfd3;
  
  --text-main: #4a5d4e; /* Sage green tinted dark gray */
  --text-muted: #7d8c7f;
  --text-inverse: #ffffff;
  
  /* Accents */
  --accent-primary: #d4a373; /* Warm wheat/soft gold */
  --accent-primary-hover: #c49363;
  --accent-secondary: #eaddcf; /* Very pale warm wheat */
  --accent-secondary-hover: #dfcebd;
  
  /* Status Colors */
  --status-not-started: #f0ebe1;
  --status-in-progress: #ffdcb3;
  --status-completed: #c5d8c8; /* Soft sage green */
  --status-planned: #f0ebe1;
  --status-running: #cce0eb; /* Soft sky blue */
  --status-done: #c5d8c8;

  --shadow-sm: 0 2px 8px rgba(74, 93, 78, 0.06);
  --shadow-md: 0 6px 16px rgba(74, 93, 78, 0.08);
  --shadow-modal: 0 10px 30px rgba(74, 93, 78, 0.12);
}

/* Dark Theme Variables */`
);

css = css.replace(
  /\/\* Dark Theme Variables \*\/[\s\S]*?\/\* --- Resets & Base Styles --- \*\//,
`/* Dark Theme Variables */
:root[data-theme="dark"] {
  --bg-app: #2b332d; /* Deep forest green-gray */
  --bg-sidebar: #222924;
  --bg-panel: #333d36;
  --bg-panel-hover: #3d4a41;
  --bg-input: #272f2a;
  --border-color: #46544a;
  
  --text-main: #e8ede9; /* Soft pale green-white */
  --text-muted: #a4b3a8;
  --text-inverse: #2b332d;
  
  /* Accents */
  --accent-primary: #d4a373; /* Warm wheat */
  --accent-primary-hover: #e5b484;
  --accent-secondary: #46544a;
  --accent-secondary-hover: #546358;

  /* Status Colors */
  --status-not-started: #46544a;
  --status-in-progress: #a47a56;
  --status-completed: #5c7a61;
  --status-planned: #46544a;
  --status-running: #5c728a;
  --status-done: #5c7a61;

  --shadow-sm: 0 2px 8px rgba(0,0,0,0.2);
  --shadow-md: 0 6px 16px rgba(0,0,0,0.3);
  --shadow-modal: 0 10px 30px rgba(0,0,0,0.4);
}

/* --- Resets & Base Styles --- */`
);

// Update typography and curves to be rounder and softer
css = css.replace(/--radius-sm: 4px;/g, '--radius-sm: 8px;');
css = css.replace(/--radius-md: 8px;/g, '--radius-md: 16px;');
css = css.replace(/--radius-lg: 12px;/g, '--radius-lg: 24px;');

// Add floral background pattern in light mode
css = css.replace(
  /body {[\s\S]*?}/,
`body {
  font-family: var(--font-body);
  background-color: var(--bg-app);
  color: var(--text-main);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  transition: background-color 0.4s ease, color 0.4s ease;
  background-image: var(--bg-pattern, none);
}

:root[data-theme="light"] body {
  /* Subtle wildflower pattern */
  --bg-pattern: url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 5 c-2 5 -8 8 -12 10 c4 2 10 5 12 10 c2 -5 8 -8 12 -10 c-4 -2 -10 -5 -12 -10 Z" fill="%23d4a373" fill-opacity="0.05"/></svg>');
}`
);

// Soften inputs
css = css.replace(
  /input\[type="text"\], input\[type="url"\], textarea, select {[\s\S]*?}/,
`input[type="text"], input[type="url"], textarea, select {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 2px solid transparent;
  background-color: var(--bg-app);
  border-radius: var(--radius-md);
  color: var(--text-main);
  font-family: var(--font-body);
  transition: all 0.3s ease;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.02);
}`
);

// Focus states for input
css = css.replace(
  /input:focus, textarea:focus, select:focus {[\s\S]*?}/,
`input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--accent-primary);
  background-color: var(--bg-input);
  box-shadow: 0 0 0 4px rgba(212, 163, 115, 0.15);
}`
);

// Panel header borders
css = css.replace(
  /\.panel h2 {[\s\S]*?}/,
`.panel h2 {
  margin-bottom: 0;
  font-size: 1.6rem;
  color: var(--accent-primary);
  font-style: italic;
  font-weight: 400;
  padding-bottom: 4px;
}`
);

fs.writeFileSync(path, css);
