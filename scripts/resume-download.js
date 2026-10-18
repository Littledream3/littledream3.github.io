// The theme exposes the author button URL, but not download attributes.
// Add them at build time so it works without JavaScript and bypasses Pjax.
hexo.extend.filter.register('after_render:html', function (html) {
  return html.replace(
    /<a\b(?=[^>]*\bid="card-info-btn")(?=[^>]*\bhref="\/files\/ling-chao-resume\.pdf")[^>]*>/g,
    '<a id="card-info-btn" href="/files/ling-chao-resume.pdf" download="凌超_游戏策划_系统策划方向.pdf" data-pjax="false">'
  );
});
