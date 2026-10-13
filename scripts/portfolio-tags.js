hexo.extend.generator.register('portfolio-tags', function (locals) {
  const entries = locals.posts.toArray().map(post => ({
    url: '/' + post.path.replace(/^\/+/, ''),
    tags: post.tags.toArray().map(tag => tag.name)
  }));
  return { path: 'portfolio-tags.json', data: JSON.stringify(entries) };
});
