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
var DOWNLOADS_URL = '';   /* where free downloads live */
var SKOOL_URL     = '';   /* your Skool community */
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
