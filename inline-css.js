const fs = require('fs');
const tailwind = fs.readFileSync('tailwind.css', 'utf8');
const style = fs.readFileSync('style.css', 'utf8');
let html = fs.readFileSync('index.html', 'utf8');

const linkStr = `<link href="./tailwind.css" rel="stylesheet"/>
  <link href="./style.css" rel="stylesheet"/>`;

if (html.includes(linkStr)) {
  html = html.replace(linkStr, `<style>\n${tailwind}\n${style}\n</style>`);
  fs.writeFileSync('index.html', html);
  console.log('Successfully inlined CSS');
} else {
  console.log('Could not find CSS links in index.html');
}
