const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');
const matches1 = [...html.matchAll(/class=.*?material-symbols-outlined.*?>([^<]+)</g)];
const matches2 = [...js.matchAll(/class=.*?material-symbols-outlined.*?>([^<]+)</g)];
const matches3 = [...js.matchAll(/icon\.textContent = '([^']+)'/g)];
const icons = [...new Set([...matches1, ...matches2, ...matches3].map(m => m[1].trim()))].filter(i => i.length > 0 && i.length < 30);
console.log(icons.join(','));
