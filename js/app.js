/* ==========================================================================
   SONAKSHI – HINDI POET & AUTHOR | Portfolio Application Script (js/app.js)
   - Supports multi-page navigation (index.html, about-sonakshi.html, books.html,
     hindi-poetry.html, novels.html, writings.html, contact.html) + smooth SPA switching
   - Updates <title>, <meta name="description">, <link rel="canonical">, and Open Graph tags
   - Clearly labels all localStorage drafts as Local Browser Preview Only
   - Uses explicit placeholders for all unpublished poems, shayari, articles, and email
   ========================================================================== */

(function () {
  var BASE_URL = 'https://sonakshi-author.github.io';

  var PAGE_SEO = {
    home: {
      file: 'index.html',
      path: '/',
      canonical: BASE_URL + '/',
      title: 'SONAKSHI – Hindi Poet | Author | Writer | Official Website',
      desc: 'Official website of Sonakshi, Hindi Poet, Author & Writer of "मेरी खामोशी मेरे अल्फ़ाज़ (Words of My Silence)". Read original Hindi poetry, shayari, and novels.'
    },
    about: {
      file: 'about-sonakshi.html',
      path: '/about-sonakshi.html',
      canonical: BASE_URL + '/about-sonakshi.html',
      title: 'About Sonakshi – Hindi Poet & Author | लेखिका का परिचय',
      desc: 'सोनाक्षी (Sonakshi) एक हिंदी कवयित्री और लेखिका हैं जिनकी लेखन यात्रा कक्षा 10 से शुरू हुई। जानिए उनकी साहित्यिक यात्रा, कविता और लेखन शैली के बारे में।'
    },
    books: {
      file: 'books.html',
      path: '/books.html',
      canonical: BASE_URL + '/books.html',
      title: 'Books by Sonakshi | मेरी खामोशी मेरे अल्फ़ाज़ (Words of My Silence)',
      desc: 'Explore published books by Hindi poet and author Sonakshi, featuring "मेरी खामोशी मेरे अल्फ़ाज़ (Words of My Silence)" available in Print and eBook on Pothi.com.'
    },
    poetry: {
      file: 'hindi-poetry.html',
      path: '/hindi-poetry.html',
      canonical: BASE_URL + '/hindi-poetry.html',
      title: 'Hindi Poetry by Sonakshi | सोनाक्षी की मौलिक हिंदी कविताएँ',
      desc: 'Read original Hindi poetry by Sonakshi (सोनाक्षी की हिंदी कविताएँ) across love (प्रेम), pain (दर्द और एहसास), friendship (दोस्ती), life (ज़िंदगी), and silence (खामोशी).'
    },
    novels: {
      file: 'novels.html',
      path: '/novels.html',
      canonical: BASE_URL + '/novels.html',
      title: 'Novels by Sonakshi | Mystery, Suspense & Emotional Fiction',
      desc: 'Discover ongoing mystery and suspense novels and emotional fiction writing projects by Hindi author and writer Sonakshi.'
    },
    writings: {
      file: 'writings.html',
      path: '/writings.html',
      canonical: BASE_URL + '/writings.html',
      title: 'Shayari, Articles & Creative Writing by Sonakshi | अन्य रचनाएँ',
      desc: 'पढ़िए लेखिका और कवयित्री सोनाक्षी (Sonakshi) की मौलिक हिंदी शायरी (Shayari), साहित्यिक लेख (Articles) और रचनात्मक लेखन।'
    },
    contact: {
      file: 'contact.html',
      path: '/contact.html',
      canonical: BASE_URL + '/contact.html',
      title: 'Contact Sonakshi – Hindi Poet & Author | संपर्क करें',
      desc: 'Connect with Hindi poet and author Sonakshi for reader feedback, book reviews, publishing enquiries, and literary collaborations.'
    }
  };

  var POETRY_CATEGORIES = [
    {
      id: 'prem',
      titleHi: '1. प्रेम कविताएँ',
      titleEn: 'Romantic & Love Poetry',
      intro: 'प्रेम के कोमल एहसासों, समर्पण और अनकहे जज़्बातों को पिरोती मेरी मौलिक प्रेम कविताएँ।'
    },
    {
      id: 'dard',
      titleHi: '2. दर्द और एहसास',
      titleEn: 'Pain, Longing & Deep Emotions',
      intro: 'जब शब्द आँसुओं और तन्हाई की ज़ुबान बन जाते हैं—टूटे दिल और गहरे एहसासों की कविताएँ।'
    },
    {
      id: 'dosti',
      titleHi: '3. दोस्ती',
      titleEn: 'Poems on Friendship',
      intro: 'ज़िंदगी के सबसे खूबसूरत और निस्वार्थ रिश्ते—दोस्ती और यारों की यादों के नाम।'
    },
    {
      id: 'zindagi',
      titleHi: '4. ज़िंदगी',
      titleEn: 'Poems on Life & Resilience',
      intro: 'जीवन के संघर्ष, उम्मीद, बचपन की यादों और आगे बढ़ने के हौसले को दर्शाती कविताएँ।'
    },
    {
      id: 'khamoshi',
      titleHi: '5. खामोशी',
      titleEn: 'Poems on Silence & Solitude',
      intro: 'उन पलों के नाम जहाँ शब्द थम जाते हैं और खामोशी खुद अपनी कहानी कहती है।'
    },
    {
      id: 'anya',
      titleHi: '6. अन्य कविताएँ',
      titleEn: 'Other Original Poems',
      intro: 'विविध विषयों और अचानक उमड़े विचारों पर आधारित मेरी अन्य काव्य-रचनाएँ।'
    }
  ];

  function getDefaultState() {
    var initialPage = document.body.getAttribute('data-initial-page') || 'home';
    return {
      currentPage: initialPage,
      selectedPoetryCat: 'all',
      featuredPoemText: '[यहाँ सोनाक्षी की 4 पंक्तियों की मौलिक कविता का स्थान (Placeholder) रखा गया है। बिना आपकी अनुमति के कोई भी काल्पनिक कविता नहीं जोड़ी गई है।]',
      poems: [
        {
          id: 'p1',
          cat: 'prem',
          isPlaceholder: true,
          title: '[प्रेम कविता का शीर्षक प्लेसहोल्डर | Original Love Poem Placeholder]',
          body: '[यहाँ आपकी मौलिक प्रेम कविता जोड़ी जाएगी। बिना आपकी अनुमति के कोई भी कविता नहीं बनाई गई है।]'
        },
        {
          id: 'p2',
          cat: 'dard',
          isPlaceholder: true,
          title: '[दर्द और एहसास कविता का शीर्षक प्लेसहोल्डर | Pain & Emotion Poem Placeholder]',
          body: '[यहाँ दर्द और एहसास श्रेणी की आपकी मौलिक कविता जोड़ी जाएगी।]'
        },
        {
          id: 'p3',
          cat: 'dosti',
          isPlaceholder: true,
          title: '[दोस्ती पर कविता का शीर्षक प्लेसहोल्डर | Friendship Poem Placeholder]',
          body: '[यहाँ दोस्ती श्रेणी की आपकी मौलिक कविता जोड़ी जाएगी।]'
        },
        {
          id: 'p4',
          cat: 'zindagi',
          isPlaceholder: true,
          title: '[ज़िंदगी पर कविता का शीर्षक प्लेसहोल्डर | Life Poem Placeholder]',
          body: '[यहाँ ज़िंदगी और संघर्ष पर आपकी मौलिक कविता जोड़ी जाएगी।]'
        },
        {
          id: 'p5',
          cat: 'khamoshi',
          isPlaceholder: true,
          title: '[खामोशी पर कविता का शीर्षक प्लेसहोल्डर | Silence Poem Placeholder]',
          body: '[यहाँ खामोशी श्रेणी की आपकी मौलिक कविता जोड़ी जाएगी।]'
        },
        {
          id: 'p6',
          cat: 'anya',
          isPlaceholder: true,
          title: '[अन्य मौलिक कविता का शीर्षक प्लेसहोल्डर | Other Original Poem Placeholder]',
          body: '[यहाँ आपकी अन्य मौलिक कविता जोड़ी जाएगी।]'
        }
      ],
      writings: [
        {
          id: 'w1',
          type: 'shayari',
          isPlaceholder: true,
          title: '[मौलिक शायरी प्लेसहोल्डर #1 | Original Shayari Placeholder #1]',
          body: '[यहाँ सोनाक्षी की मौलिक शायरी जोड़ी जाएगी। बिना आपकी अनुमति के कोई भी शेर या शायरी नहीं लिखी गई है।]'
        },
        {
          id: 'w2',
          type: 'shayari',
          isPlaceholder: true,
          title: '[मौलिक शायरी प्लेसहोल्डर #2 | Original Shayari Placeholder #2]',
          body: '[यहाँ आपकी दूसरी मौलिक शायरी जोड़ी जाएगी।]'
        },
        {
          id: 'w3',
          type: 'article',
          isPlaceholder: true,
          title: '[साहित्यिक लेख प्लेसहोल्डर | Original Article Placeholder]',
          body: '[यहाँ आपके द्वारा लिखे गए साहित्यिक या समसामयिक लेख (Article) का पूर्ण पाठ जोड़ा जाएगा।]'
        },
        {
          id: 'w4',
          type: 'short',
          isPlaceholder: true,
          title: '[लघु साहित्यिक रचना प्लेसहोल्डर | Short Literary Piece Placeholder]',
          body: '[यहाँ आपकी डायरी के पन्नों से निकली लघु रचना या गद्य-गीत (Prose Poetry) जोड़ा जाएगा।]'
        }
      ],
      futureBooks: [],
      enquiries: [],
      profile: {
        email: '[अपना वास्तविक ईमेल यहाँ जोड़ें | e.g., yourname@gmail.com]',
        ig: '',
        fb: '',
        pin: '',
        yt: ''
      }
    };
  }

  var STORAGE_KEY = 'sonakshi_portfolio_local_draft_v2';
  var state = getDefaultState();

  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      var parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.poems)) {
        var initialPage = state.currentPage;
        state = Object.assign(state, parsed);
        state.currentPage = initialPage;
      }
    }
  } catch (e) {}

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function showToast(msg) {
    var toast = document.getElementById('app-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(function () {
      toast.classList.add('hidden');
    }, 3400);
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function updateSeoHead(pageKey) {
    var seo = PAGE_SEO[pageKey] || PAGE_SEO.home;
    document.title = seo.title;

    var descMeta = document.getElementById('dynamic-seo-desc');
    if (descMeta) descMeta.setAttribute('content', seo.desc);

    var canonicalEl = document.getElementById('dynamic-canonical');
    if (canonicalEl) canonicalEl.setAttribute('href', seo.canonical);

    var ogTitle = document.getElementById('dynamic-og-title');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);

    var ogDesc = document.getElementById('dynamic-og-desc');
    if (ogDesc) ogDesc.setAttribute('content', seo.desc);

    var ogUrl = document.getElementById('dynamic-og-url');
    if (ogUrl) ogUrl.setAttribute('content', seo.canonical);

    var pathDisplay = document.getElementById('current-page-path');
    if (pathDisplay) pathDisplay.textContent = 'URL: ' + seo.path;
  }

  function navigateTo(pageKey, pushStateFlag) {
    if (!PAGE_SEO[pageKey]) pageKey = 'home';
    state.currentPage = pageKey;

    var pages = ['home', 'about', 'books', 'poetry', 'novels', 'writings', 'contact'];
    pages.forEach(function (k) {
      var el = document.getElementById('page-' + k);
      if (el) {
        if (k === pageKey) el.classList.remove('hidden');
        else el.classList.add('hidden');
      }
    });

    document.querySelectorAll('.nav-item').forEach(function (link) {
      var target = link.getAttribute('data-nav');
      if (target === pageKey) link.classList.add('nav-link-active');
      else link.classList.remove('nav-link-active');
    });

    document.querySelectorAll('.mobile-nav-item').forEach(function (link) {
      var target = link.getAttribute('data-nav');
      if (target === pageKey) {
        link.classList.add('text-gold-400', 'bg-navy-800/60');
        link.classList.remove('text-cream-100');
      } else {
        link.classList.remove('text-gold-400', 'bg-navy-800/60');
        link.classList.add('text-cream-100');
      }
    });

    updateSeoHead(pageKey);

    if (pushStateFlag && window.history && window.history.pushState) {
      try {
        var targetFile = PAGE_SEO[pageKey].file;
        if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
          window.history.pushState({ page: pageKey }, PAGE_SEO[pageKey].title, '#' + pageKey);
        }
      } catch (err) {}
    }

    var drawer = document.getElementById('mobile-menu-drawer');
    var mobileBtn = document.getElementById('btn-mobile-menu');
    if (drawer) drawer.classList.add('hidden');
    if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderPoetry() {
    var wrapper = document.getElementById('poetry-categories-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = '';

    var homeFeatured = document.getElementById('home-featured-poem-text');
    if (homeFeatured) homeFeatured.textContent = state.featuredPoemText;

    POETRY_CATEGORIES.forEach(function (cat) {
      if (state.selectedPoetryCat !== 'all' && state.selectedPoetryCat !== cat.id) return;

      var catPoems = state.poems.filter(function (p) { return p.cat === cat.id; });

      var section = document.createElement('div');
      section.className = 'gold-border-glow rounded-2xl bg-navy-950/85 p-6 sm:p-8';

      var cardsHtml = catPoems.map(function (poem) {
        var badgeHtml = poem.isPlaceholder
          ? '<span class="verification-badge mb-3">Placeholder Slot (अप्रकाशित स्थान)</span>'
          : '<span class="verification-badge mb-3">Local Browser Draft (केवल इस ब्राउज़र में सेव)</span>';
        return (
          '<div class="p-6 rounded-xl bg-navy-900 border border-gold-400/25 flex flex-col justify-between">' +
            '<div>' +
              badgeHtml +
              '<h3 class="font-hindi text-xl font-bold text-gold-300 mb-3">' + escapeHtml(poem.title) + '</h3>' +
              '<p class="font-hindi text-base sm:text-lg leading-relaxed text-cream-100 whitespace-pre-line">' + escapeHtml(poem.body) + '</p>' +
            '</div>' +
            '<div class="mt-5 pt-3 border-t border-gold-400/15 flex items-center justify-between text-xs">' +
              '<span class="font-hindi text-gold-400 font-semibold">— सोनाक्षी (Sonakshi)</span>' +
              '<button type="button" data-feature-poem="' + poem.id + '" class="text-cream-300 hover:text-gold-400 font-sans underline">Preview on Homepage (Local)</button>' +
            '</div>' +
          '</div>'
        );
      }).join('');

      section.innerHTML =
        '<div class="border-b border-gold-400/20 pb-4 mb-6 flex flex-wrap items-center justify-between gap-2">' +
          '<div>' +
            '<h2 class="font-hindi text-2xl sm:text-3xl font-bold text-gold-400">' + cat.titleHi + ' <span class="text-base sm:text-lg font-serifHeading text-cream-200">(' + cat.titleEn + ')</span></h2>' +
            '<p class="text-sm text-cream-200 mt-1">' + cat.intro + '</p>' +
          '</div>' +
          '<button type="button" data-QuickAddCat="' + cat.id + '" class="px-3.5 py-1.5 rounded-full bg-gold-400/15 border border-gold-400/40 text-gold-300 hover:bg-gold-400 hover:text-navy-950 font-sans text-xs font-semibold transition">+ Draft Poem in This Category (Local)</button>' +
        '</div>' +
        '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">' + cardsHtml + '</div>';

      wrapper.appendChild(section);
    });
  }

  function renderWritings() {
    var shayariGrid = document.getElementById('shayari-grid');
    var articlesList = document.getElementById('articles-list');
    var shortList = document.getElementById('short-pieces-list');
    if (!shayariGrid || !articlesList || !shortList) return;

    var shayaris = state.writings.filter(function (w) { return w.type === 'shayari'; });
    var articles = state.writings.filter(function (w) { return w.type === 'article'; });
    var shorts = state.writings.filter(function (w) { return w.type === 'short'; });

    shayariGrid.innerHTML = shayaris.map(function (s) {
      var badge = s.isPlaceholder ? 'Placeholder Slot' : 'Local Browser Draft';
      return (
        '<blockquote class="gold-border-glow rounded-xl bg-navy-950/90 p-6">' +
          '<span class="verification-badge mb-2">' + badge + '</span>' +
          '<h3 class="font-hindi text-lg font-bold text-gold-300 mb-2">' + escapeHtml(s.title) + '</h3>' +
          '<p class="font-hindi text-lg text-cream-100 leading-relaxed whitespace-pre-line italic">' + escapeHtml(s.body) + '</p>' +
          '<footer class="mt-4 text-xs font-hindi text-gold-400 font-semibold">— सोनाक्षी (Sonakshi)</footer>' +
        '</blockquote>'
      );
    }).join('');

    articlesList.innerHTML = articles.map(function (a) {
      var badge = a.isPlaceholder ? 'Article Placeholder' : 'Local Browser Draft';
      return (
        '<div class="gold-border-glow rounded-xl bg-navy-950/90 p-6">' +
          '<span class="verification-badge mb-2">' + badge + '</span>' +
          '<h3 class="font-hindi text-xl font-bold text-cream-100">' + escapeHtml(a.title) + '</h3>' +
          '<p class="mt-3 text-cream-200 leading-relaxed whitespace-pre-line">' + escapeHtml(a.body) + '</p>' +
          '<div class="mt-3 text-xs font-hindi text-gold-400">— सोनाक्षी (Sonakshi)</div>' +
        '</div>'
      );
    }).join('');

    shortList.innerHTML = shorts.map(function (sh) {
      var badge = sh.isPlaceholder ? 'Short Piece Placeholder' : 'Local Browser Draft';
      return (
        '<div class="gold-border-glow rounded-xl bg-navy-950/90 p-6">' +
          '<span class="verification-badge mb-2">' + badge + '</span>' +
          '<h3 class="font-hindi text-xl font-bold text-gold-300 mb-2">' + escapeHtml(sh.title) + '</h3>' +
          '<p class="text-cream-200 leading-relaxed whitespace-pre-line">' + escapeHtml(sh.body) + '</p>' +
          '<div class="mt-4 text-xs font-hindi text-gold-400">— सोनाक्षी (Sonakshi)</div>' +
        '</div>'
      );
    }).join('');
  }

  function renderProfile() {
    var emailEl = document.getElementById('display-author-email');
    if (emailEl) {
      emailEl.textContent = state.profile.email || '[अपना वास्तविक ईमेल यहाँ जोड़ें | e.g., yourname@gmail.com]';
    }

    var map = [
      { key: 'ig', linkId: 'social-link-instagram', badgeId: 'badge-instagram', fallback: '[Placeholder — Add URL]' },
      { key: 'fb', linkId: 'social-link-facebook', badgeId: 'badge-facebook', fallback: '[Placeholder — Add URL]' },
      { key: 'pin', linkId: 'social-link-pinterest', badgeId: 'badge-pinterest', fallback: '[Placeholder — Add URL]' },
      { key: 'yt', linkId: 'social-link-youtube', badgeId: 'badge-youtube', fallback: '[Future Use Placeholder]' }
    ];
    map.forEach(function (item) {
      var link = document.getElementById(item.linkId);
      var badge = document.getElementById(item.badgeId);
      var val = state.profile[item.key];
      if (link && badge) {
        if (val && val.trim().indexOf('http') === 0) {
          link.setAttribute('href', val.trim());
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
          badge.textContent = '↗ Open Profile (Local Draft)';
        } else {
          link.setAttribute('href', '#page-contact');
          link.removeAttribute('target');
          badge.textContent = item.fallback;
        }
      }
    });
  }

  function renderFutureBooks() {
    var container = document.getElementById('additional-books-container');
    if (!container) return;
    container.innerHTML = state.futureBooks.map(function (b) {
      return (
        '<div class="gold-border-glow rounded-2xl bg-navy-900/90 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">' +
          '<div>' +
            '<span class="verification-badge mb-2">Local Browser Draft Slot</span>' +
            '<h3 class="font-hindi text-2xl font-bold text-cream-100 mt-1">' + escapeHtml(b.title) + '</h3>' +
            '<p class="text-sm text-cream-200 mt-2">' + escapeHtml(b.desc) + '</p>' +
          '</div>' +
          '<span class="px-4 py-2 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-300 font-sans text-xs font-semibold shrink-0">By Sonakshi</span>' +
        '</div>'
      );
    }).join('');
  }

  function renderEnquiries() {
    var box = document.getElementById('contact-submissions-box');
    var list = document.getElementById('contact-submissions-list');
    if (!box || !list) return;
    if (!state.enquiries.length) {
      box.classList.add('hidden');
      return;
    }
    box.classList.remove('hidden');
    list.innerHTML = state.enquiries.map(function (item) {
      return (
        '<div class="p-3.5 rounded-xl bg-navy-900 border border-gold-400/25">' +
          '<div class="flex justify-between text-gold-400 font-semibold">' +
            '<span>' + escapeHtml(item.name) + ' (' + escapeHtml(item.email) + ')</span>' +
            '<span>' + escapeHtml(item.type) + '</span>' +
          '</div>' +
          '<p class="text-cream-200 mt-1">' + escapeHtml(item.msg) + '</p>' +
        '</div>'
      );
    }).join('');
  }

  function openStudio(tabName) {
    var modal = document.getElementById('modal-author-studio');
    if (modal) modal.classList.remove('hidden');
    if (tabName) switchStudioTab(tabName);
  }

  function switchStudioTab(tabName) {
    var fPoem = document.getElementById('form-add-poem');
    var fWriting = document.getElementById('form-add-writing');
    var fProfile = document.getElementById('form-update-profile');
    if (fPoem) fPoem.classList.toggle('hidden', tabName !== 'poem');
    if (fWriting) fWriting.classList.toggle('hidden', tabName !== 'writing');
    if (fProfile) fProfile.classList.toggle('hidden', tabName !== 'profile');

    document.querySelectorAll('.studio-tab-btn').forEach(function (btn) {
      if (btn.getAttribute('data-studio-tab') === tabName) {
        btn.className = 'studio-tab-btn px-3.5 py-2 rounded-lg bg-gold-400 text-navy-950 font-bold';
      } else {
        btn.className = 'studio-tab-btn px-3.5 py-2 rounded-lg bg-navy-950 text-cream-200';
      }
    });
  }

  document.addEventListener('click', function (e) {
    var navEl = e.target.closest('[data-nav]');
    if (navEl) {
      // Allow Ctrl/Cmd+Click to open standalone HTML file in new tab
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      navigateTo(navEl.getAttribute('data-nav'), true);
      return;
    }

    var catBtn = e.target.closest('[data-poem-cat]');
    if (catBtn) {
      state.selectedPoetryCat = catBtn.getAttribute('data-poem-cat');
      document.querySelectorAll('.poem-cat-btn').forEach(function (b) {
        if (b.getAttribute('data-poem-cat') === state.selectedPoetryCat) {
          b.className = 'poem-cat-btn px-4 py-2 rounded-full bg-gold-400 text-navy-950 font-sans text-xs sm:text-sm font-semibold transition';
        } else {
          b.className = 'poem-cat-btn px-4 py-2 rounded-full bg-navy-800 text-cream-100 border border-gold-400/30 hover:border-gold-400 font-hindi text-xs sm:text-sm transition';
        }
      });
      renderPoetry();
      return;
    }

    var featureBtn = e.target.closest('[data-feature-poem]');
    if (featureBtn) {
      var pid = featureBtn.getAttribute('data-feature-poem');
      var found = state.poems.find(function (p) { return p.id === pid; });
      if (found) {
        state.featuredPoemText = found.body;
        saveState();
        renderPoetry();
        showToast('Homepage Poetry Spotlight updated in local browser preview!');
      }
      return;
    }

    var quickAddCat = e.target.closest('[data-QuickAddCat]');
    if (quickAddCat) {
      openStudio('poem');
      var sel = document.getElementById('input-poem-category');
      if (sel) sel.value = quickAddCat.getAttribute('data-QuickAddCat');
      return;
    }

    var studioTabBtn = e.target.closest('[data-studio-tab]');
    if (studioTabBtn) {
      switchStudioTab(studioTabBtn.getAttribute('data-studio-tab'));
      return;
    }

    var socialLink = e.target.closest('.social-profile-link');
    if (socialLink && socialLink.getAttribute('href') === '#page-contact') {
      e.preventDefault();
      openStudio('profile');
      return;
    }
  });

  // Mobile Menu Button
  var btnMobile = document.getElementById('btn-mobile-menu');
  if (btnMobile) {
    btnMobile.addEventListener('click', function () {
      var drawer = document.getElementById('mobile-menu-drawer');
      if (drawer) {
        var isHidden = drawer.classList.toggle('hidden');
        btnMobile.setAttribute('aria-expanded', isHidden ? 'false' : 'true');
      }
    });
  }

  // Modal Triggers
  var btnOpenStudio = document.getElementById('btn-open-author-studio');
  if (btnOpenStudio) btnOpenStudio.addEventListener('click', function () { openStudio('poem'); });

  var btnHomeCustomizePoem = document.getElementById('btn-home-customize-poem');
  if (btnHomeCustomizePoem) btnHomeCustomizePoem.addEventListener('click', function () { openStudio('poem'); });

  var btnPoetryAddNew = document.getElementById('btn-poetry-add-new');
  if (btnPoetryAddNew) btnPoetryAddNew.addEventListener('click', function () { openStudio('poem'); });

  var btnWritingsAdd = document.getElementById('btn-writings-add-shayari');
  if (btnWritingsAdd) btnWritingsAdd.addEventListener('click', function () { openStudio('writing'); });

  var btnEditSocials = document.getElementById('btn-edit-socials');
  if (btnEditSocials) btnEditSocials.addEventListener('click', function () { openStudio('profile'); });

  var btnCloseStudio = document.getElementById('btn-close-studio');
  if (btnCloseStudio) {
    btnCloseStudio.addEventListener('click', function () {
      document.getElementById('modal-author-studio').classList.add('hidden');
    });
  }

  // Reset LocalStorage Drafts Button
  var btnResetLocal = document.getElementById('btn-reset-local-storage');
  if (btnResetLocal) {
    btnResetLocal.addEventListener('click', function () {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      var active = state.currentPage;
      state = getDefaultState();
      state.currentPage = active;
      renderPoetry();
      renderWritings();
      renderProfile();
      renderFutureBooks();
      renderEnquiries();
      showToast('Local browser drafts reset to default placeholders.');
    });
  }

  // Form: Add Poem (Local Draft)
  var formAddPoem = document.getElementById('form-add-poem');
  if (formAddPoem) {
    formAddPoem.addEventListener('submit', function (e) {
      e.preventDefault();
      var cat = document.getElementById('input-poem-category').value;
      var title = document.getElementById('input-poem-title').value.trim();
      var body = document.getElementById('input-poem-body').value.trim();
      var featured = document.getElementById('input-poem-featured').checked;
      if (!title || !body) return;

      state.poems.unshift({
        id: 'p_' + Date.now(),
        cat: cat,
        isPlaceholder: false,
        title: title,
        body: body
      });
      if (featured) state.featuredPoemText = body;
      saveState();
      renderPoetry();
      formAddPoem.reset();
      document.getElementById('modal-author-studio').classList.add('hidden');
      showToast('कविता आपके लोकल ब्राउज़र ड्राफ्ट में सेव हो गई! (Saved to Local Browser Draft)');
    });
  }

  // Form: Add Writing (Local Draft)
  var formAddWriting = document.getElementById('form-add-writing');
  if (formAddWriting) {
    formAddWriting.addEventListener('submit', function (e) {
      e.preventDefault();
      var type = document.getElementById('input-writing-type').value;
      var title = document.getElementById('input-writing-title').value.trim();
      var body = document.getElementById('input-writing-body').value.trim();
      if (!title || !body) return;

      state.writings.unshift({
        id: 'w_' + Date.now(),
        type: type,
        isPlaceholder: false,
        title: title,
        body: body
      });
      saveState();
      renderWritings();
      formAddWriting.reset();
      document.getElementById('modal-author-studio').classList.add('hidden');
      navigateTo('writings', true);
      showToast('रचना आपके लोकल ब्राउज़र ड्राफ्ट में सेव हो गई!');
    });
  }

  // Form: Update Profile Email & Socials (Local Draft)
  var formUpdateProfile = document.getElementById('form-update-profile');
  if (formUpdateProfile) {
    formUpdateProfile.addEventListener('submit', function (e) {
      e.preventDefault();
      var em = document.getElementById('input-profile-email').value.trim();
      if (em) state.profile.email = em;
      state.profile.ig = document.getElementById('input-social-ig').value.trim();
      state.profile.fb = document.getElementById('input-social-fb').value.trim();
      state.profile.pin = document.getElementById('input-social-pin').value.trim();
      state.profile.yt = document.getElementById('input-social-yt').value.trim();
      saveState();
      renderProfile();
      document.getElementById('modal-author-studio').classList.add('hidden');
      showToast('Email & Social links saved in local browser draft!');
    });
  }

  // Add Future Book Card (Local Draft)
  var btnAddFutureBook = document.getElementById('btn-books-add-future');
  if (btnAddFutureBook) {
    btnAddFutureBook.addEventListener('click', function () {
      state.futureBooks.push({
        title: '[आगामी पुस्तक प्लेसहोल्डर #' + (state.futureBooks.length + 2) + ' | Upcoming Book Placeholder]',
        desc: '[यहाँ आपकी आगामी पुस्तक का विवरण और प्रकाशन लिंक जोड़ा जाएगा (Local Browser Draft)]'
      });
      saveState();
      renderFutureBooks();
      showToast('Future book placeholder slot added in local browser draft!');
    });
  }

  // Novel Read More Toggle
  var btnToggleNovel = document.getElementById('btn-toggle-novel-more');
  if (btnToggleNovel) {
    btnToggleNovel.addEventListener('click', function () {
      var box = document.getElementById('novel-more-details');
      if (box) {
        box.classList.toggle('hidden');
        btnToggleNovel.textContent = box.classList.contains('hidden')
          ? 'अधिक जानें | Read More Details'
          : 'कम दिखाएँ | Hide Details';
      }
    });
  }

  // Copy Email Button
  var btnCopyEmail = document.getElementById('btn-copy-email');
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', function () {
      var emailText = state.profile.email || '[अपना वास्तविक ईमेल यहाँ जोड़ें]';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailText).then(function () {
          showToast('Copied to clipboard: ' + emailText);
        }).catch(function () {
          fallbackCopy(emailText);
        });
      } else {
        fallbackCopy(emailText);
      }
    });
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    showToast('Copied to clipboard: ' + text);
  }

  // Contact Enquiry Form (Local Browser Preview Only)
  var contactForm = document.getElementById('contact-enquiry-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('sender-name').value.trim();
      var email = document.getElementById('sender-email').value.trim();
      var type = document.getElementById('enquiry-type').value;
      var msg = document.getElementById('sender-message').value.trim();
      if (!name || !email || !msg) return;

      state.enquiries.unshift({
        name: name,
        email: email,
        type: type,
        msg: msg
      });
      saveState();
      renderEnquiries();
      contactForm.reset();
      showToast('संदेश केवल इस ब्राउज़र के लोकल प्रीव्यू में सेव हुआ है (Saved to Local Browser Preview Only).');
    });
  }

  var btnClearEnquiries = document.getElementById('btn-clear-enquiries');
  if (btnClearEnquiries) {
    btnClearEnquiries.addEventListener('click', function () {
      state.enquiries = [];
      saveState();
      renderEnquiries();
      showToast('Local preview inbox cleared.');
    });
  }

  // SEO Inspector Modal
  var btnOpenSeo = document.getElementById('btn-open-seo-inspector');
  var btnCloseSeo = document.getElementById('btn-close-seo');
  if (btnOpenSeo) {
    btnOpenSeo.addEventListener('click', function () {
      var seo = PAGE_SEO[state.currentPage] || PAGE_SEO.home;
      document.getElementById('seo-inspector-current-title').textContent = seo.title;
      document.getElementById('seo-inspector-current-desc').textContent = seo.desc;
      document.getElementById('seo-inspector-current-canonical').textContent = seo.canonical;
      document.getElementById('modal-seo-inspector').classList.remove('hidden');
    });
  }
  if (btnCloseSeo) {
    btnCloseSeo.addEventListener('click', function () {
      document.getElementById('modal-seo-inspector').classList.add('hidden');
    });
  }

  // Verification Checklist Modal
  var btnOpenVerify = document.getElementById('btn-open-verification-panel');
  var btnCloseVerify = document.getElementById('btn-close-verification');
  if (btnOpenVerify) {
    btnOpenVerify.addEventListener('click', function () {
      document.getElementById('modal-verification-info').classList.remove('hidden');
    });
  }
  if (btnCloseVerify) {
    btnCloseVerify.addEventListener('click', function () {
      document.getElementById('modal-verification-info').classList.add('hidden');
    });
  }

  // Handle Escape key to close any open modal
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      ['modal-author-studio', 'modal-seo-inspector', 'modal-verification-info'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.classList.add('hidden');
      });
    }
  });

  // Initial Render
  renderPoetry();
  renderWritings();
  renderProfile();
  renderFutureBooks();
  renderEnquiries();

  var startPage = document.body.getAttribute('data-initial-page') || 'home';
  if (window.location.hash) {
    var h = window.location.hash.replace('#', '').replace('page-', '');
    if (PAGE_SEO[h]) startPage = h;
  }
  navigateTo(startPage, false);
})();
