// Tap-to-zoom for case-study boards.
// Opens the full-resolution image in an overlay; pan by scroll/drag,
// pinch-zoom stays available. Esc / tap backdrop / × to close.
(function () {
  var SEL = '.fig img, .wide img, .sgbox img, .styleguide img, .uwide img';
  var imgs = document.querySelectorAll(SEL);
  if (!imgs.length) return;

  var overlay = document.createElement('div');
  overlay.className = 'zoomov';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', '放大檢視圖片');
  overlay.innerHTML = '<button class="zoomclose" aria-label="關閉">×</button><div class="zoomscroll"><img alt="" /></div>';
  document.body.appendChild(overlay);
  var zimg = overlay.querySelector('img');
  var scroller = overlay.querySelector('.zoomscroll');

  function open(src, alt) {
    zimg.src = src;
    zimg.alt = alt || '';
    overlay.classList.add('on');
    document.body.style.overflow = 'hidden';
    scroller.scrollTop = 0; scroller.scrollLeft = 0;
    overlay.querySelector('.zoomclose').focus();
  }
  function close() {
    overlay.classList.remove('on');
    document.body.style.overflow = '';
    zimg.src = '';
  }

  imgs.forEach(function (im) {
    im.classList.add('zoomable');
    im.setAttribute('tabindex', '0');
    im.setAttribute('role', 'button');
    im.setAttribute('aria-label', '點擊放大檢視');
    im.addEventListener('click', function () { open(im.currentSrc || im.src, im.alt); });
    im.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(im.currentSrc || im.src, im.alt); }
    });
  });

  overlay.querySelector('.zoomclose').addEventListener('click', close);
  overlay.addEventListener('click', function (e) { if (e.target === overlay || e.target === scroller) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay.classList.contains('on')) close(); });
})();
