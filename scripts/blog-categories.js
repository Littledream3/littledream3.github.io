// Use Butterfly's category-list styling, including work entries stored as pages.
hexo.extend.tag.register('blog_categories', function () {
  const categories = hexo.locals.get('categories').toArray();
  const escape = value => String(value).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
  const root = '/' + (hexo.config.root || '/').replace(/^\/+|\/+$/g, '');
  const href = path => escape(root.replace(/\/$/, '') + '/' + path.replace(/^\/+/, ''));
  const item = (name, path, count, children = '') =>
    `<li class="category-list-item"><a class="category-list-link" href="${href(path)}">${escape(name)}</a><span class="category-list-count">${count}</span>${children}</li>`;
  const render = category => {
    const children = categories.filter(child => String(child.parent) === String(category._id))
      .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
    const nested = children.length
      ? `<ul class="category-list-child">${children.map(render).join('')}</ul>` : '';
    return item(category.name, category.path, category.length, nested);
  };
  const portfolio = categories.find(category => category.name === '作品集' && !category.parent);
  const workCount = hexo.locals.get('pages').toArray()
    .filter(page => page.source.startsWith('work/')).length;
  return '<div class="category-lists"><ul class="category-list">'
    + (portfolio ? render(portfolio) : item('作品集', 'categories/portfolio/', 0))
    + item('工作经历', 'categories/work/', workCount)
    + '</ul></div>';
});
