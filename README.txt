ILLUMINATE GLOBAL MINISTRIES
============================

FILES
  index.html   the whole page
  styles.css   all styling
  script.js    menu, FAQ, forms, external links
  assets/      logo files and your headshot

TO VIEW: double-click index.html


YOUR HEADSHOT
-------------
Your photo is in place at assets/jennifer.jpg. To change it later,
replace that file keeping the same filename. A tall photo works best
(roughly 4 wide by 5 tall).


ADD YOUR LINKS
--------------
Open script.js. The first lines look like this:

  var PAYPAL_URL    = 'https://paypal.me/jjonestheartist';   (filled in)
  var AMAZON_URL    = '';
  var DOWNLOADS_URL = '';
  var SKOOL_URL     = '';
  var COACHING_URL  = 'https://renewedsoul.co/';   (already filled in)

Paste each address between the quotes, for example:

  var PAYPAL_URL = 'https://paypal.me/yourname';

Any link left empty opens an email to info@igministries.com instead,
so nothing breaks while you gather them.


CHANGING THE ACCENT COLOUR
--------------------------
Open styles.css. Near the very top you will find:

  --gold:#C0854A;
  --gold-light:#E2B481;

Those two lines control every gold accent on the site. Alternatives
are listed in a comment right above them. Change the two values and
the whole site updates.


SCROLL ANIMATION
----------------
Headings, cards, and images fade and lift into place as you scroll,
with the two-column sections sliding in from the sides. Anyone whose
computer is set to reduce motion sees the page appear normally with
no movement at all.


PAGE ORDER
----------
  1. Hero
  2. Our Mission
  3. About the Ministry
  4. Our Values
  5. Our Foundation
  6. How We Equip
  7. Illuminate Discipleship Community
  8. What We Teach
  9. Community Rhythm (incl. year-end fast and January 1)
 10. Healing and Freedom
 11. Personal Ministry
 12. Watch
 13. Meet the Founder
 14. Resources
 15. FAQ
 16. Connect
 17. Give
 18. Footer


FORMS
-----
Six options: Prayer Request, Deliverance Ministry, Biblical Counseling,
The Community, Share a Testimony, General Questions.

All six are delivered through Formspree to info@igministries.com.
The endpoint is at the top of script.js:

  var FORM_ENDPOINT = 'https://formspree.io/f/mjybkpbl';

The visitor stays on the page. On success they see a thank-you message
and the fields clear. If delivery fails they are told to email you
directly instead, so no one is left guessing.

IMPORTANT: the forms will NOT work while you are opening index.html by
double-clicking it on your computer. Browsers block that kind of request
from a local file. They start working as soon as the site is published
to a real web address. Test them there, not locally.

Formspree will email you to confirm the first submission. Check your
inbox after the first real test.

Renewed Soul Coaching has no form. Its button opens renewedsoul.co.
