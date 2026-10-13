// Preserve the original work navigation and Butterfly category layout, while
// keeping resume entries out of the blog post count, search and archives.
hexo.extend.generator.register('work-pages', function (locals) {
  const pages = locals.pages.filter(page => page.source.startsWith('work/'));
  return {
    path: 'categories/work/index.html',
    layout: ['category', 'index'],
    data: {
      category: '工作经历',
      posts: pages.sort('date', -1),
      total: 1,
      current: 1,
      base: 'categories/work/',
      current_url: 'categories/work/',
      prev: 0,
      next: 0
    }
  };
});
