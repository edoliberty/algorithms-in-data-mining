// Scroll-spy: highlight the table-of-contents entry for the section in view.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.toc__list a[href^="#"]'));
  if (!links.length) return;

  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var sections = links
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);
  if (!sections.length) return;

  var current = null;
  function setActive(id) {
    if (id === current) return;
    current = id;
    links.forEach(function (a) { a.classList.remove('active'); a.removeAttribute('aria-current'); });
    if (map[id]) { map[id].classList.add('active'); map[id].setAttribute('aria-current', 'true'); }
  }

  var observer = new IntersectionObserver(function (entries) {
    var visible = entries.filter(function (e) { return e.isIntersecting; });
    if (visible.length) {
      visible.sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      setActive(visible[0].target.id);
    }
  }, { rootMargin: '-10% 0px -75% 0px', threshold: 0 });

  sections.forEach(function (s) { observer.observe(s); });
  setActive(sections[0].id);

  // Keep the active chip centered in the mobile strip — scroll the strip
  // horizontally only, never the page (which would unpin the sticky bars).
  var list = document.querySelector('.toc__list');
  links.forEach(function (a) {
    a.addEventListener('click', function () {
      if (!list) return;
      setTimeout(function () {
        var aRect = a.getBoundingClientRect();
        var listRect = list.getBoundingClientRect();
        var delta = (aRect.left + aRect.width / 2) - (listRect.left + listRect.width / 2);
        list.scrollBy({ left: delta, behavior: 'smooth' });
      }, 50);
    });
  });
})();

// Mobile: pin the chip strip just below the (possibly two-line) top bar, and
// auto-hide it on scroll-down / reveal it on scroll-up to reclaim screen space.
(function () {
  var toc = document.querySelector('.toc');
  var topbar = document.querySelector('.topbar');
  if (!toc || !topbar) return;
  var root = document.documentElement;
  var mq = window.matchMedia('(max-width: 767.98px)');

  // The top bar wraps to two lines on narrow phones, so its height isn't a
  // fixed value — measure it (and the strip) and expose both to the CSS.
  function sync() {
    root.style.setProperty('--topbar-h', topbar.offsetHeight + 'px');
    root.style.setProperty('--strip-h', toc.offsetHeight + 'px');
  }
  sync();
  window.addEventListener('resize', sync);
  window.addEventListener('load', sync);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sync);

  var lastY = window.pageYOffset;
  var lockUntil = 0;
  function show() { toc.classList.remove('toc--hidden'); }
  function hide() { toc.classList.add('toc--hidden'); }

  function onScroll() {
    if (!mq.matches) { show(); return; }
    var y = window.pageYOffset;
    if (Date.now() < lockUntil) { lastY = y; return; }
    if (y <= topbar.offsetHeight + 4) {
      show();                         // always visible near the top
    } else if (y > lastY + 6) {
      hide();                         // scrolling down
    } else if (y < lastY - 6) {
      show();                         // scrolling up
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // A chip tap is intentional — keep the strip visible through the jump.
  toc.addEventListener('click', function (e) {
    if (e.target.closest('a')) { show(); lockUntil = Date.now() + 900; }
  });
})();
