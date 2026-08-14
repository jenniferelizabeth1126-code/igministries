/* ==========================================================================
   Illuminate Global Ministries

   EDIT YOUR LINKS HERE. Paste each web address between the quotes.
   Leave a link empty and its button will simply open an email instead.
   ========================================================================== */

var CONTACT_EMAIL = 'info@igministries.com';

/* Where the contact forms are delivered. */
var FORM_ENDPOINT = 'https://formspree.io/f/mjybkpbl';

var PAYPAL_URL    = 'https://paypal.me/jjonestheartist';   /* your PayPal giving link */
var AMAZON_URL    = '';   /* your Amazon storefront */
var DOWNLOADS_URL = 'resources.html';   /* where free downloads live */
var SKOOL_URL     = 'https://www.skool.com/illuminate-global-ministries-8644/about';   /* your Skool community */
var COACHING_URL  = 'https://renewedsoul.co/';   /* your Renewed Soul Coaching page */

/* ========================================================================== */

(function () {
  'use strict';

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var open = q.getAttribute('aria-expanded') === 'true';
      q.setAttribute('aria-expanded', open ? 'false' : 'true');
      var answer = q.nextElementSibling;
      if (answer) answer.classList.toggle('open', !open);
    });
  });


  /* ---------- reveal things as they scroll into view ----------
     Elements are only hidden after this runs, so if the script fails
     the page still shows everything.                                */
  (function () {
    var reduced = window.matchMedia &&
                  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) return;

    var SELECTOR = [
      '.eyebrow', '.section-title', '.section-lead', '.prose',
      '.cta-row', '.mission-pull', '.about-body', '.about-card',
      '.verse-block', '.price-card', '.platform-note', '.schedule',
      '.special', '.card', '.topic', '.value', '.service',
      '.member-box', '.portrait', '.faq-group', '.faq-list',
      '.connect-grid', '.socials', '.give-note',
      '.dl-group-title', '.dl-group-lede', '.dl-item', '.page-head-note'
    ].join(',');

    var picked = [];

    /* the hero animates on its own, and the header must never hide */
    Array.prototype.forEach.call(
      document.querySelectorAll('section:not(.hero), .site-footer'),
      function (section) {
        var found = Array.prototype.filter.call(
          section.querySelectorAll(SELECTOR),
          function (el) {
            /* skip anything already inside another revealing element */
            for (var p = el.parentElement; p && p !== section; p = p.parentElement) {
              if (p.matches && p.matches(SELECTOR)) return false;
            }
            return true;
          }
        );

        found.forEach(function (el, i) {
          el.classList.add('reveal');

          /* two-column sections come in from the sides */
          if (el.matches('.about-card, .verse-block, .member-box')) {
            el.classList.add('from-right');
          } else if (el.matches('.portrait')) {
            el.classList.add('from-left');
          }

          /* stagger, but cap it so nothing lags far behind */
          el.style.transitionDelay = Math.min(i * 70, 420) + 'ms';
          picked.push(el);
        });
      }
    );

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    picked.forEach(function (el) { observer.observe(el); });


    /* Jumping straight to a section (nav links, or landing on #faq) can
       skip past elements so the observer never sees them. Sweep for
       anything at or above the fold and show it.                        */
    var ticking = false;

    function sweep() {
      ticking = false;
      var h = window.innerHeight;
      for (var i = picked.length - 1; i >= 0; i--) {
        var el = picked[i];
        if (el.getBoundingClientRect().top < h) {
          el.classList.add('in');
          observer.unobserve(el);
          picked.splice(i, 1);
        }
      }
      if (!picked.length) window.removeEventListener('scroll', onScroll);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(sweep);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    requestAnimationFrame(sweep);
  })();

  /* ---------- FAQ: one click reveals the whole list ---------- */
  var faqToggle = document.getElementById('faqToggle');
  var faqBody = document.getElementById('faqBody');

  if (faqToggle && faqBody) {
    faqToggle.addEventListener('click', function () {
      var open = faqToggle.getAttribute('aria-expanded') === 'true';
      faqToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
      faqBody.hidden = open;
      faqToggle.textContent = open ? 'View the Questions' : 'Hide the Questions';
    });
  }

  /* ---------- contact menu ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.cmenu'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));

  function selectTab(name) {
    if (!name) return;
    tabs.forEach(function (t) {
      t.setAttribute('aria-selected', t.dataset.tab === name ? 'true' : 'false');
    });
    panels.forEach(function (p) {
      p.classList.toggle('active', p.id === 'panel-' + name);
    });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab.dataset.tab); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (next) { e.preventDefault(); next.focus(); selectTab(next.dataset.tab); }
    });
  });

  /* On a phone the menu stacks above the form, so the form you just chose
     is off the bottom of the screen. Bring it up so the tap does something
     you can actually see.                                                 */
  function revealForm() {
    if (window.innerWidth > 1060) return;
    var forms = document.querySelector('.connect-forms');
    if (!forms) return;

    var header = document.querySelector('.site-header');
    var offset = (header && getComputedStyle(header).position === 'sticky')
      ? header.offsetHeight + 12 : 12;

    window.scrollTo({
      top: forms.getBoundingClientRect().top + window.pageYOffset - offset,
      behavior: 'smooth'
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', revealForm);
  });

  document.querySelectorAll('[data-open-tab]').forEach(function (el) {
    el.addEventListener('click', function () {
      selectTab(el.dataset.openTab);

      /* some buttons also preselect a subject in the general form */
      if (el.dataset.topic) {
        var topic = document.getElementById('g-topic');
        if (topic) {
          Array.prototype.forEach.call(topic.options, function (o, i) {
            if (o.text === el.dataset.topic) topic.selectedIndex = i;
          });
        }
      }
    });
  });

  /* ---------- send a panel to the form service ---------- */
  var SUCCESS_MESSAGE = 'Thank you for reaching out to Illuminate Global Ministries. ' +
    'Your message has been received, and a member of our team will respond as soon as possible.';

  function setStatus(panel, text, state) {
    var el = panel.querySelector('.form-status');
    if (!el) return;
    el.textContent = text || '';
    el.className = 'form-status' + (state ? ' ' + state : '');
  }

  document.querySelectorAll('[data-send]').forEach(function (btn) {
    var original = btn.textContent;

    btn.addEventListener('click', function () {
      var panel = btn.closest('.panel');
      if (!panel) return;

      var payload = {};
      var missing = [];
      var replyTo = '';

      panel.querySelectorAll('[data-label]').forEach(function (f) {
        var label = f.dataset.label;

        if (f.type === 'checkbox') {
          payload[label] = f.checked ? 'Yes' : 'No';
          return;
        }

        var value = (f.value || '').trim();
        var required = /^(Name|Email)$/.test(label) || f.tagName === 'TEXTAREA';

        if (required && !value) { missing.push(label); return; }
        if (label === 'Email') replyTo = value;
        if (value) payload[label] = value;
      });

      if (missing.length) {
        setStatus(panel, 'Please fill in: ' + missing.join(', '), 'error');
        return;
      }

      /* spam trap: real people never fill this in */
      var trap = panel.querySelector('.hp');
      if (trap && trap.value) return;

      payload._subject = panel.dataset.subject || 'Website Message';
      payload.email = replyTo;

      btn.disabled = true;
      btn.textContent = 'Sending...';
      setStatus(panel, '');

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed');
          panel.querySelectorAll('[data-label]').forEach(function (f) {
            if (f.type === 'checkbox') { f.checked = false; }
            else if (f.tagName === 'SELECT') { f.selectedIndex = 0; }
            else { f.value = ''; }
          });
          setStatus(panel, SUCCESS_MESSAGE, 'success');
        })
        .catch(function () {
          setStatus(panel,
            'Something went wrong sending that. Please email ' + CONTACT_EMAIL + ' directly.',
            'error');
        })
        .then(function () {
          btn.disabled = false;
          btn.textContent = original;
        });
    });
  });

  /* ---------- wire up the external links ---------- */
  function setLink(id, url, emailSubject) {
    var el = document.getElementById(id);
    if (!el) return;

    if (url) {
      el.setAttribute('href', url);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    } else {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'mailto:' + CONTACT_EMAIL +
          '?subject=' + encodeURIComponent(emailSubject);
      });
    }
  }

  setLink('giveLink', PAYPAL_URL, 'Giving Inquiry');
  setLink('amazonLink', AMAZON_URL, 'Recommended Reading');
  setLink('downloadsLink', DOWNLOADS_URL, 'Free Downloads');
  setLink('skoolLink', SKOOL_URL, 'Discipleship Community');
  setLink('coachingLink', COACHING_URL, 'Renewed Soul Coaching');
})();
