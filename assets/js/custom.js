$(".top-bar .top-bar-section ul li").find("ul").each(function() {
  $(this).parent("li").addClass("has-dropdown");
  $(".top-bar .top-bar-section ul li.has-dropdown ul li").removeClass("has-dropdown");
});
$(".top-bar .top-bar-section ul li.has-dropdown ul").addClass("dropdown");


// JavaScript Document
$('input, textarea').placeholder();



// ======= Foundation ==============================================

$(document).foundation();

// ======= Active Nav =================================================
var path = decodeURIComponent(location.pathname.substring(1)).replace(/index\.html$/,'').replace(/"/g,'');
if (path) { // if there is a value for the varible path

  /*-- for the primary nav - if path equals the href give the parent a class of selected
           example: nav ul li.selected a --*/
  $('nav a[href$="' + path + '"]').parent().addClass('selected');

  /*-- for dropdown nav - if path equals the href of the drop down links give the top level link a class of selected
           example: nav ul li.selected a --*/
  $('nav ul ul a[href$="' + path + '"]').parents(':eq(2)').addClass('selected');

  /*-- for the aside nav - if path equals the href give the parent a class of selected
           example: aside ul li.selected a --*/
  $('aside li a[href$="' + path + '"]').parent().addClass('selected');
};

$(document).ready(function(e) {

  $(".faq-question a").click(function(e) {
    $(this).toggleClass("active");
  });

  //Home Main Slider
  $('.home-slider').slick({
    dots: true,
    fade: true,
    cssEase: 'ease-in-out',
    speed: 1400,
    slidesToShow: 1,
    infinite: true,
    touchMove: false,
    slide: 'li',
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: false,
  });

  //Testimonial Slider
  // Only 3 testimonials and 3 visible: duplicate them so the carousel can always scroll
  var $testi = $('.testimonal');
  if ($testi.length && $testi.children('.slide').length <= 3) {
    $testi.children('.slide').clone().addClass('is-dup').attr('aria-hidden', 'true')
      .find('a, button').attr('tabindex', '-1').end()
      .appendTo($testi);
  }
  $('.testimonal').slick({
    dots: false,
    arrows: true,
    appendArrows: $('.testimonials .t-arrows').length ? $('.testimonials .t-arrows') : $('.testimonal'),
    prevArrow: '<button type="button" class="t-arrow t-prev" aria-label="Previous testimonial"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>',
    nextArrow: '<button type="button" class="t-arrow t-next" aria-label="Next testimonial"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>',
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    touchMove: true,
    slide: '.slide',
    autoplay: true,
    autoplaySpeed: 5500,
    pauseOnHover: true,

    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 700,  settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  });

  var form = {

    antiSpamForm: function(dataSource, dataForm) {
      var ds = $(dataForm).data(dataSource);
      $(dataForm).attr('action', ds);
    } //  form.antiSpamForm

  }

  if ( $('#contact-form').length ) { form.antiSpamForm('act', '#contact-form'); }

  if ( $('#sub-form').length ) { form.antiSpamForm('act', '#sub-form'); }

  if ( $('#popup-form').length ) { form.antiSpamForm('act', '#popup-form'); }

});

// This nicescroll feature cause issues on the website
//$(document).ready(function() {
// This nicescroll feature cause issues on the website
// $("html").niceScroll({styler:"fb",cursorcolor:"#000"});
// $('.scroll').niceScroll({styler:"fb",cursorcolor:"#000"});
//     if ($('img').length) {
//         $('img').each(function () {
//             var srcPath = $(this).attr('src')
//             if( srcPath.substring(0, 6) != '/Admin' ){
//                 if(srcPath[0] == "~"){ srcPath = srcPath.substring(1) }
//                 srcPath = "/Admin" + srcPath
//             }

//             $(this).attr('src', srcPath)
//         })
//     }
// });

// ======= Site header: floating nav + mobile drawer ======================
(function () {
  var header = document.getElementById('site-header');
  if (!header) return;
  var body = document.body;
  var nav = document.getElementById('site-nav');
  var burger = header.querySelector('.sh-burger');
  var closeBtn = header.querySelector('.sh-close');
  var overlay = document.querySelector('.sh-overlay');
  if (overlay) { overlay.removeAttribute('hidden'); header.appendChild(overlay); } // inside the header so it stacks under the drawer

  // Floating state: set once the top row has scrolled away
  function onScroll() {
    var topRow = header.querySelector('.sh-top');
    var limit = 4;
    header.classList.toggle('is-stuck', window.pageYOffset > limit);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // Drawer
  function setOpen(open) {
    body.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) { setTimeout(function () { closeBtn.focus(); }, 50); }
    else if (document.activeElement && nav.contains(document.activeElement)) { burger.focus(); }
  }
  burger.addEventListener('click', function () { setOpen(true); });
  closeBtn.addEventListener('click', function () { setOpen(false); });
  if (overlay) overlay.addEventListener('click', function () { setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && body.classList.contains('nav-open')) setOpen(false);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a[href]') && window.innerWidth < 1200) setOpen(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1200 && body.classList.contains('nav-open')) setOpen(false);
  });

  // Features sub-menu (click to toggle; hover also works on desktop)
  Array.prototype.forEach.call(header.querySelectorAll('.sh-sub-toggle'), function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var li = btn.parentNode, open = !li.classList.contains('open');
      li.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function (e) {
    if (window.innerWidth >= 1200 && !e.target.closest('.has-sub')) {
      Array.prototype.forEach.call(header.querySelectorAll('.has-sub.open'), function (li) {
        li.classList.remove('open');
        li.querySelector('.sh-sub-toggle').setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Smooth "back to top"
  Array.prototype.forEach.call(document.querySelectorAll('.to-top'), function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  });
})();

// ======= Reveal-on-scroll (home sections) ===============================
(function () {
  var els = document.querySelectorAll('[data-reveal]');
  if (!els.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('reveal-on');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  Array.prototype.forEach.call(els, function (el) { io.observe(el); });
})();

// ======= Contact form (posts straight to JotForm) =======================
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('form.cp-jf'), function (form) {
    var id = form.querySelector('[name="formID"]').value;
    var spc = form.querySelector('.simple_spc');
    if (spc) spc.value = id + '-' + id;            // JotForm's basic bot check
    form.addEventListener('submit', function () {
      var btn = form.querySelector('.cp-submit');
      if (btn) { btn.disabled = true; btn.classList.add('is-sending'); btn.firstChild.nodeValue = 'Sending… '; }
    });
  });
})();

// ======= Services row: arrows for the swipe carousel on tablet/phone ======
(function () {
  var grid = document.querySelector('.svc-grid');
  var nav = document.querySelector('.svc-arrows');
  if (!grid || !nav) return;
  var prev = nav.querySelector('.t-prev'), next = nav.querySelector('.t-next');
  function step() {
    var card = grid.querySelector('.svc-card');
    var gap = parseFloat(getComputedStyle(grid).columnGap) || 16;
    return card ? card.getBoundingClientRect().width + gap : grid.clientWidth;
  }
  function update() {
    var max = grid.scrollWidth - grid.clientWidth - 2;
    prev.disabled = grid.scrollLeft <= 2;
    next.disabled = grid.scrollLeft >= max;
  }
  prev.addEventListener('click', function () { grid.scrollBy({ left: -step(), behavior: 'smooth' }); });
  next.addEventListener('click', function () { grid.scrollBy({ left: step(), behavior: 'smooth' }); });
  grid.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

// ======= Active menu item (works with relative links / any base folder) ===
(function () {
  function norm(p) { try { p = decodeURIComponent(p); } catch (e) {} return p.replace(/index\.html$/, '').replace(/\/+$/, '').toLowerCase(); }
  var here = norm(location.pathname);
  var home = norm(document.querySelector('.sh-logo') ? document.querySelector('.sh-logo').pathname : '/');
  Array.prototype.forEach.call(document.querySelectorAll('.sh-menu a[href]'), function (a) {
    var p = norm(a.pathname);
    if (!p || p === home) return;
    if (here === p || here.indexOf(p + '/') === 0) {
      var li = a.closest('li'); if (li) li.classList.add('selected');
      var parent = li && li.parentNode.closest('li.has-sub'); if (parent) parent.classList.add('selected');
    }
  });
})();

// ======= Scroll-to-top button (every page) ===============================
(function () {
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'to-top-fab';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = '<svg class="ring" viewBox="0 0 58 58" aria-hidden="true"><circle cx="29" cy="29" r="27"/></svg>' +
                  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(btn);
  var ring = btn.querySelector('.ring circle');
  var len = 2 * Math.PI * 27;
  ring.style.strokeDasharray = len;
  function update() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    btn.classList.toggle('is-visible', y > 400);
    ring.style.strokeDashoffset = len * (1 - (max > 0 ? Math.min(y / max, 1) : 0));   // red ring shows reading progress
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
  btn.addEventListener('click', function () {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
})();

// ======= Resource library: filter chips + search =========================
(function () {
  var lib = document.querySelector('.lib');
  if (!lib) return;
  var chips = lib.querySelectorAll('.lib-chip');
  var groups = lib.querySelectorAll('.lib-group');
  var input = lib.querySelector('.lib-search input');
  var empty = lib.querySelector('.lib-empty');
  var filter = 'all';
  function apply() {
    var q = (input.value || '').trim().toLowerCase();
    var shown = 0;
    Array.prototype.forEach.call(groups, function (g) {
      var inCat = filter === 'all' || g.getAttribute('data-cat') === filter;
      var n = 0;
      Array.prototype.forEach.call(g.querySelectorAll('.lib-item'), function (it) {
        var ok = inCat && (!q || it.getAttribute('data-search').indexOf(q) !== -1);
        it.hidden = !ok;
        if (ok) n++;
      });
      g.hidden = n === 0;
      shown += n;
    });
    empty.hidden = shown !== 0;
  }
  Array.prototype.forEach.call(chips, function (c) {
    c.addEventListener('click', function () {
      filter = c.getAttribute('data-filter');
      Array.prototype.forEach.call(chips, function (o) {
        var on = o === c;
        o.classList.toggle('is-active', on);
        o.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      apply();
    });
  });
  input.addEventListener('input', apply);
})();

// ======= Re-measure sliders once the page has fully laid out =============
// Slick measures width at start-up; if the scrollbar or fonts appear later the
// fading hero slides end up shifted, leaving a dark strip down the left edge.
(function ($) {
  if (!$ || !$.fn.getSlick) return;
  function refresh() {
    $('.home-slider.slick-initialized, .testimonal.slick-initialized').each(function () {
      var s = $(this).getSlick();
      if (s && s.setPosition) s.setPosition();
    });
  }
  $(window).on('load', function () { refresh(); setTimeout(refresh, 300); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  var t; $(window).on('resize orientationchange', function () { clearTimeout(t); t = setTimeout(refresh, 150); });
  if ('ResizeObserver' in window) {
    var el = document.querySelector('.slider');
    if (el) { var last = 0; new ResizeObserver(function (e) { var w = Math.round(e[0].contentRect.width); if (w !== last) { last = w; refresh(); } }).observe(el); }
  }
})(window.jQuery);

// ======= Site search (modal, searches as you type) =======================
(function () {
  var trigger = document.querySelector('.sh-search');
  var logo = document.querySelector('.sh-logo');
  if (!trigger || !logo) return;
  var ROOT = logo.href;                                   // absolute URL of the site root
  var INDEX_URL = new URL('assets/search-index.json?v=1', ROOT).href;
  var data = null, loading = null, active = -1, items = [], lastFocus = null;

  var ICON = {
    Page: '<path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z"/>',
    Blog: '<path d="M5 4h11l3 3v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm3 6h8M8 14h8M8 18h5"/>',
    Resource: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'
  };
  function svg(p) { return '<svg aria-hidden="true" viewBox="0 0 24 24">' + p + '</svg>'; }
  function reEsc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  var el = document.createElement('div');
  el.className = 'sx';
  el.hidden = true;
  el.innerHTML =
    '<div class="sx-backdrop" data-sx-close></div>' +
    '<div class="sx-panel" role="dialog" aria-modal="true" aria-label="Search the site">' +
      '<div class="sx-bar">' + svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>') +
        '<input aria-autocomplete="list" aria-controls="sx-results" aria-label="Search pages, articles and resources" autocomplete="off" class="sx-input" placeholder="Search pages, articles and resources…" role="combobox" spellcheck="false" type="search"/>' +
        '<button aria-label="Close search" class="sx-close" data-sx-close type="button"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
      '</div>' +
      '<div class="sx-body" id="sx-results" role="listbox"></div>' +
      '<div class="sx-foot"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span class="sx-count"></span></div>' +
    '</div>';
  document.body.appendChild(el);
  var input = el.querySelector('.sx-input'), body = el.querySelector('.sx-body'), count = el.querySelector('.sx-count');

  function norm(s) {
    s = (s || '').toLowerCase().replace(/[’‘`]/g, "'");
    return s.normalize ? s.normalize('NFD').replace(/[̀-ͯ]/g, '') : s;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function mark(text, toks) {
    var out = esc(text);
    toks.forEach(function (t) {
      if (t.length < 2) return;
      out = out.replace(new RegExp('(' + reEsc(esc(t)) + ')', 'ig'), '<mark>$1</mark>');
    });
    return out;
  }
  function load() {
    if (data) return Promise.resolve(data);
    if (!loading) loading = fetch(INDEX_URL).then(function (r) { return r.json(); }).then(function (j) {
      data = j.map(function (e, i) { e.i = i; e._t = norm(e.title); e._x = norm(e.x + ' ' + e.d); e._k = norm(e.k); return e; });
      return data;
    });
    return loading;
  }

  function search(q) {
    var toks = norm(q).split(/\s+/).filter(Boolean);
    if (!toks.length) return null;
    var whole = norm(q).trim();
    var res = [];
    data.forEach(function (e) {
      var score = 0;
      for (var i = 0; i < toks.length; i++) {
        var t = toks[i];
        if (e._t.indexOf(t) !== -1) score += new RegExp('(^|[^a-z0-9])' + reEsc(t)).test(e._t) ? 30 : 18;
        else if (e._x.indexOf(t) !== -1) score += 8;
        else if (e._k.indexOf(t) !== -1) score += 4;
        else return;                                      // every word must match somewhere
      }
      if (e._t.indexOf(whole) === 0) score += 40;
      if (e.t === 'Page') score += 12;
      if (e.t === 'Blog') score += Math.max(0, 6 - e.i / 40); // newer posts slightly first
      res.push({ e: e, s: score });
    });
    res.sort(function (a, b) { return b.s - a.s; });
    return { toks: toks, list: res.map(function (r) { return r.e; }) };
  }

  function itemHtml(e, toks) {
    var url = new URL(e.url, ROOT).href;
    var ext = e.t === 'Resource' ? ' target="_blank" rel="noopener"' : '';
    var sub = e.t === 'Blog' && e.d ? e.d : e.x;
    return '<a class="sx-item sx-' + e.t.toLowerCase() + '" href="' + url + '" role="option"' + ext + '>' +
      '<span class="sx-ico">' + svg(ICON[e.t]) + '</span>' +
      '<span class="sx-txt"><strong>' + mark(e.title, toks) + '</strong><small>' + mark(sub, toks) + '</small></span>' +
      '<span aria-hidden="true" class="sx-go">→</span></a>';
  }
  function group(label, list, toks, max) {
    if (!list.length) return '';
    return '<div class="sx-group"><div class="sx-label">' + label + '<span>' + list.length + '</span></div>' +
      list.slice(0, max).map(function (e) { return itemHtml(e, toks); }).join('') + '</div>';
  }

  function render() {
    var q = input.value;
    var r = search(q);
    if (!r) {                                             // nothing typed yet: suggestions
      var pick = ['buyers-services/', 'rental-management/', 'sellers-advocate/', 'relocating-options/', 'contact/', 'features/downloads/'];
      var pages = pick.map(function (u) { return data.filter(function (e) { return e.url === u; })[0]; }).filter(Boolean);
      var posts = data.filter(function (e) { return e.t === 'Blog'; }).slice(0, 4);
      body.innerHTML = group('Popular pages', pages, [], 6) + group('Latest articles', posts, [], 4);
      count.textContent = '';
    } else if (!r.list.length) {
      body.innerHTML = '<div class="sx-empty"><strong>No results for “' + esc(q.trim()) + '”</strong><span>Try another word, or <a href="' + new URL('contact/', ROOT).href + '">ask Ann directly</a>.</span></div>';
      count.textContent = '0 results';
    } else {
      var by = { Page: [], Blog: [], Resource: [] };
      r.list.forEach(function (e) { by[e.t].push(e); });
      body.innerHTML = group('Pages', by.Page, r.toks, 6) + group('Blog', by.Blog, r.toks, 8) + group('Resources', by.Resource, r.toks, 5);
      count.textContent = r.list.length + (r.list.length === 1 ? ' result' : ' results');
    }
    items = Array.prototype.slice.call(body.querySelectorAll('.sx-item'));
    active = -1;
    setActive(items.length ? 0 : -1, false);
    body.scrollTop = 0;
  }
  function setActive(i, scroll) {
    if (items[active]) { items[active].classList.remove('is-active'); items[active].removeAttribute('aria-selected'); items[active].removeAttribute('id'); }
    active = i;
    if (items[active]) {
      items[active].classList.add('is-active');
      items[active].setAttribute('aria-selected', 'true');
      items[active].id = 'sx-active';
      input.setAttribute('aria-activedescendant', 'sx-active');
      if (scroll !== false) items[active].scrollIntoView({ block: 'nearest' });
    } else input.removeAttribute('aria-activedescendant');
  }

  function open() {
    if (!el.hidden) return;
    lastFocus = document.activeElement;
    el.hidden = false;
    document.body.classList.add('sx-open');
    requestAnimationFrame(function () { el.classList.add('is-open'); });
    input.focus();
    input.select();
    if (!data) body.innerHTML = '<div class="sx-loading"><span></span><span></span><span></span></div>';
    load().then(render).catch(function () {
      body.innerHTML = '<div class="sx-empty"><strong>Search is unavailable right now.</strong><span>Please try again in a moment.</span></div>';
    });
  }
  function close() {
    if (el.hidden) return;
    el.classList.remove('is-open');
    document.body.classList.remove('sx-open');
    setTimeout(function () { el.hidden = true; }, 200);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  trigger.addEventListener('click', open);
  el.addEventListener('click', function (e) { if (e.target.closest('[data-sx-close]')) close(); });
  var timer;
  input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(function () { if (data) render(); }, 50); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (items.length) setActive((active + 1) % items.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (items.length) setActive((active - 1 + items.length) % items.length); }
    else if (e.key === 'Enter' && items[active]) { e.preventDefault(); items[active].click(); }
  });
  body.addEventListener('mousemove', function (e) {
    var a = e.target.closest('.sx-item');
    if (a) { var i = items.indexOf(a); if (i !== active) setActive(i, false); }
  });
  document.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName) || '';
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(tag) || (e.target && e.target.isContentEditable);
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); if (el.hidden) open(); else close(); }
    else if (e.key === '/' && !typing && el.hidden) { e.preventDefault(); open(); }
    else if (e.key === 'Escape' && !el.hidden) { e.preventDefault(); close(); }
    else if (e.key === 'Tab' && !el.hidden) {             // keep focus inside the dialog
      var f = [input].concat(items, [el.querySelector('.sx-close')]);
      var i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });
})();
