const fs = require('fs');

const path = 'styles.css';
let css = fs.readFileSync(path, 'utf8');

// The first script didn't match the regex perfectly. 
// Let's rewrite the ROOT variables manually to ensure it applies for both light/dark.

const rootLight = `/* Light Theme Variables (Default) */
:root[data-theme="light"] {
  --bg-app: #f9f6eeb3; /* Soft creamy white, slightly transparent for pattern */
  --bg-sidebar: #f2efe9c2;
  --bg-panel: #ffffff;
  --bg-panel-hover: #fdfbf7;
  --bg-input: #ffffff;
  --border-color: #e6dfd3;
  
  --text-main: #4a5d4e; /* Sage green tinted dark gray */
  --text-muted: #7d8c7f;
  --text-inverse: #ffffff;
  
  /* Accents */
  --accent-primary: #d59a7f; /* Soft rose/terracotta */
  --accent-primary-hover: #c48a70;
  --accent-secondary: #e2ecd9; /* Pale sage green */
  --accent-secondary-hover: #d2dfc7;
  
  /* Status Colors */
  --status-not-started: #f0ebe1;
  --status-in-progress: #fadcb5; /* Warm peach */
  --status-completed: #c5d8c8; /* Soft sage green */
  --status-planned: #f0ebe1;
  --status-running: #cce0eb; /* Soft sky blue */
  --status-done: #c5d8c8;

  --shadow-sm: 0 4px 12px rgba(74, 93, 78, 0.04);
  --shadow-md: 0 8px 24px rgba(74, 93, 78, 0.06);
  --shadow-modal: 0 12px 32px rgba(74, 93, 78, 0.1);
}`;

const rootDark = `/* Dark Theme Variables */
:root[data-theme="dark"] {
  --bg-app: #28312a; /* Deep forest green-gray */
  --bg-sidebar: #222a24;
  --bg-panel: #2f3830;
  --bg-panel-hover: #354037;
  --bg-input: #232b25;
  --border-color: #3f4a41;
  
  --text-main: #e8ede9; /* Soft pale green-white */
  --text-muted: #9eaea2;
  --text-inverse: #28312a;
  
  /* Accents */
  --accent-primary: #d59a7f; /* Soft rose/terracotta */
  --accent-primary-hover: #e6aa8f;
  --accent-secondary: #3f4a41;
  --accent-secondary-hover: #4d594f;

  /* Status Colors */
  --status-not-started: #3f4a41;
  --status-in-progress: #906b53; /* Dark muted peach */
  --status-completed: #5c7a61; /* Darker sage */
  --status-planned: #3f4a41;
  --status-running: #4b6b85; /* Muted blue */
  --status-done: #5c7a61;

  --shadow-sm: 0 4px 12px rgba(0,0,0,0.15);
  --shadow-md: 0 8px 24px rgba(0,0,0,0.25);
  --shadow-modal: 0 12px 32px rgba(0,0,0,0.4);
}`;

css = css.replace(/\/\* Light Theme Variables \(Default\) \*\/[\s\S]*?\/\* Dark Theme Variables \*\//, rootLight + '\n\n/* Dark Theme Variables */');
css = css.replace(/\/\* Dark Theme Variables \*\/[\s\S]*?\/\* --- Resets & Base Styles --- \*\//, rootDark + '\n\n/* --- Resets & Base Styles --- */');


fs.writeFileSync(path, css);
