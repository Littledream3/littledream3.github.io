const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../public');
const files = fs.readdirSync(root, { recursive: true }).filter(f => f.endsWith('.html'));
const missing = [];
for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of html.matchAll(/(?:href|src)="(\/[^\"]*)"/g)) {
    if (match[1].startsWith('//')) continue;
    const target = decodeURIComponent(match[1].split(/[?#]/)[0]);
    if (!fs.existsSync(path.join(root, target))) missing.push(`${file} -> ${target}`);
  }
}
const postPages = files.filter(f => /^posts[\\/]/.test(f)).length;
const searchEntries = (fs.readFileSync(path.join(root, 'search.xml'), 'utf8').match(/<entry>/g) || []).length;
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.equal(postPages, 1, 'Only one blog article should be generated');
assert.equal(searchEntries, 1, 'Search should contain only the representative article');
assert(home.includes('天小梦') && home.includes('github.com/Littledream3'));
assert(!home.includes('784536651@qq.com') && !home.includes('space.bilibili.com/27962591'));
for (const route of ['categories/work', 'categories/portfolio', 'about', 'link', 'tags', 'archives']) {
  assert(fs.existsSync(path.join(root, route, 'index.html')), route);
}
assert.deepEqual(missing, [], 'Local links and assets must resolve');
console.log(JSON.stringify({ htmlPages: files.length, postPages, searchEntries, missingLocalLinks: missing }, null, 2));
