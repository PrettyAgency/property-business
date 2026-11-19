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
    var limit = window.innerWidth >= 1024 ? topRow.offsetHeight : 4;
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
    if (e.target.closest('a[href]') && window.innerWidth < 1024) setOpen(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024 && body.classList.contains('nav-open')) setOpen(false);
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
    if (window.innerWidth >= 1024 && !e.target.closest('.has-sub')) {
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
