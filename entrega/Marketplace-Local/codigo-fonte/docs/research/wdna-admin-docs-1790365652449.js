(function () {
  var root = document.querySelector('.admin-docs');
  var langGroups = document.querySelectorAll('[data-admin-docs-lang]');

  if (!root) {
    langGroups.forEach(function (group) {
      group.hidden = true;
      group.classList.add('is-hidden');
    });
    return;
  }

  langGroups.forEach(function (group) {
    group.hidden = false;
    group.classList.remove('is-hidden');
  });

  var docsBase = root.getAttribute('data-docs-base') || '/pagina/documentacao-da-admin';
  var contentEl = root.querySelector('[data-docs-content]') || root.querySelector('#docs-content');
  var toc = root.querySelector('.toc');
  var stickyOffset = 100;
  var currentModule = 'hub';
  var hubHtmlCache = contentEl ? contentEl.innerHTML : '';

  var lupaSvg =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<circle cx="10.5" cy="10.5" r="6.25" stroke="currentColor" stroke-width="1.8"/>' +
    '<path d="M15.5 15.5 20 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
    '</svg>';
  var closeSvg =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    '</svg>';

  function getModules() {
    return window.ADMIN_DOCS_MODULES || null;
  }

  function whenModulesReady(cb) {
    if (getModules()) {
      cb();
      return;
    }
    var n = 0;
    var t = setInterval(function () {
      n += 1;
      if (getModules() || n > 80) {
        clearInterval(t);
        cb();
      }
    }, 50);
  }

  var genDateLocales = { en: 'en-US', pt: 'pt-BR', es: 'es-ES' };
  var buttons = document.querySelectorAll('[data-admin-docs-lang] [data-doc-lang]');

  function updateGenDate(lang) {
    var el = document.getElementById('gen-date');
    if (!el) return;
    el.textContent = new Date().toLocaleDateString(genDateLocales[lang] || 'pt-BR', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  }

  function setLang(lang) {
    if (!lang || (lang !== 'pt' && lang !== 'en' && lang !== 'es')) lang = 'pt';
    root.setAttribute('data-lang', lang);
    buttons.forEach(function (btn) {
      var on = btn.getAttribute('data-doc-lang') === lang;
      btn.classList.toggle('is-on', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    updateGenDate(lang);
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.getAttribute('data-doc-lang'));
    });
  });

  setLang('pt');

  function navHeight() {
    var nav = document.querySelector('.nav');
    return nav ? Math.ceil(nav.getBoundingClientRect().height) : 80;
  }

  function scrollToId(id, updateHash) {
    var el = document.getElementById(id);
    if (!el) return false;
    var offset = Math.max(stickyOffset, navHeight() + 16);
    function snap() {
      var top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo(0, Math.max(0, top));
    }
    snap();
    [50, 150, 350, 700, 1200].forEach(function (ms) {
      setTimeout(snap, ms);
    });
    if (updateHash !== false) {
      var url = new URL(location.href);
      url.hash = id;
      if (history.replaceState) history.replaceState(null, '', url.pathname + url.search + url.hash);
      else location.hash = id;
    }
    return true;
  }

  function highlightToc(module, hash) {
    if (!toc) return;
    module = module || 'hub';
    hash = hash || '';
    toc.setAttribute('data-docs-current', module);
    toc.querySelectorAll('a.is-current').forEach(function (a) {
      a.classList.remove('is-current');
    });

    var links = Array.prototype.slice.call(toc.querySelectorAll('a[href]'));
    var best = null;
    var bestScore = -1;

    links.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var u;
      try {
        u = new URL(href, location.origin);
      } catch (err) {
        return;
      }
      var mod = u.searchParams.get('modulo') || 'hub';
      if (mod !== module) return;

      var linkHash = u.hash ? u.hash.replace(/^#/, '') : '';
      var score = 1;
      if (hash && linkHash === hash) score = 10;
      else if (!hash && (!linkHash || linkHash === module || linkHash === 'visao-geral')) score = 5;
      else if (!hash) score = 2;
      else score = 1;

      if (!a.closest('ul.sub')) score += 0.5;

      if (score > bestScore) {
        bestScore = score;
        best = a;
      }
    });

    if (best) best.classList.add('is-current');
  }

  function enhanceShots(scope) {
    (scope || root).querySelectorAll('.shot').forEach(function (shot) {
      if (shot.querySelector('.shot-media')) return;
      var imgs = Array.prototype.slice.call(shot.querySelectorAll('img.shot-img'));
      if (!imgs.length) return;
      var media = document.createElement('div');
      media.className = 'shot-media';
      imgs[0].parentNode.insertBefore(media, imgs[0]);
      imgs.forEach(function (img) { media.appendChild(img); });
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'shot-zoom';
      btn.setAttribute('aria-label', 'Ampliar imagem');
      btn.innerHTML = '<span class="shot-zoom__icon">' + lupaSvg + '</span>';
      media.appendChild(btn);
    });
  }

  function moduleUrl(module, hash) {
    var u = new URL(docsBase, location.origin);
    if (module && module !== 'hub') u.searchParams.set('modulo', module);
    else u.searchParams.delete('modulo');
    if (hash) u.hash = hash.replace(/^#/, '');
    return u.pathname + u.search + u.hash;
  }

  function loadModule(module, hash, push) {
    module = module || 'hub';
    var modules = getModules();

    if (module !== 'hub' && (!modules || !modules[module])) {
      // Sem mapa de módulos: deixa a navegação nativa / evita “clique morto”
      if (push !== false) {
        location.href = moduleUrl(module, hash || '');
      }
      return;
    }

    currentModule = module;
    highlightToc(module, hash);

    function afterPaint() {
      if (contentEl) contentEl.classList.remove('is-loading');
      enhanceShots(contentEl);
      updateGenDate(root.getAttribute('data-lang') || 'pt');
      if (hash) {
        setTimeout(function () { scrollToId(hash, false); }, 40);
      } else {
        window.scrollTo(0, 0);
      }
    }

    function applyHtml(html) {
      if (!contentEl) return;
      contentEl.innerHTML = html;
      afterPaint();
    }

    function go() {
      if (push !== false) {
        var next = moduleUrl(module, hash || '');
        if (history.pushState) history.pushState({ modulo: module, hash: hash || '' }, '', next);
      }
    }

    if (contentEl) contentEl.classList.add('is-loading');

    if (module === 'hub') {
      applyHtml(modules && modules.hub ? modules.hub : hubHtmlCache);
      go();
      return;
    }

    applyHtml(modules[module]);
    go();
  }

  function onDocsLinkClick(e) {
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var a = e.target.closest('a[href]');
    if (!a || !root.contains(a)) return;

    var href = a.getAttribute('href') || '';
    if (!href) return;

    // hash puro na página atual
    if (href.charAt(0) === '#' && href.indexOf('modulo=') === -1) {
      e.preventDefault();
      scrollToId(href.slice(1), true);
      return;
    }

    var u;
    try {
      u = new URL(href, location.origin);
    } catch (err) {
      return;
    }

    var isDocs = u.pathname.indexOf('/pagina/documentacao-da-admin') !== -1
      || u.pathname.indexOf('/pagina/documentacao-admin') !== -1;
    if (!isDocs) return;

    var mod = u.searchParams.get('modulo') || 'hub';
    var legacy = u.pathname.match(/documentacao-admin-([a-z0-9-]+)/);
    if (legacy && legacy[1] && legacy[1] !== 'da') mod = legacy[1];
    var hash = u.hash ? u.hash.slice(1) : '';

    var modules = getModules();
    if (mod !== 'hub' && (!modules || !modules[mod])) {
      // deixa o browser navegar; boot tenta de novo ao carregar
      return;
    }

    e.preventDefault();
    if (mod === currentModule && hash) {
      scrollToId(hash, true);
      return;
    }
    loadModule(mod, hash, true);
  }

  root.addEventListener('click', onDocsLinkClick);

  window.addEventListener('popstate', function () {
    var u = new URL(location.href);
    var mod = u.searchParams.get('modulo') || 'hub';
    var hash = u.hash ? u.hash.slice(1) : '';
    loadModule(mod, hash, false);
  });

  whenModulesReady(function () {
    var u = new URL(location.href);
    var mod = u.searchParams.get('modulo') || 'hub';
    var hash = u.hash ? u.hash.slice(1) : '';
    var legacy = u.pathname.match(/documentacao-admin-([a-z0-9-]+)/);
    if (legacy && legacy[1] && u.pathname.indexOf('documentacao-da-admin') === -1) {
      mod = legacy[1];
    }
    if (mod === 'hub' && !hash) {
      currentModule = 'hub';
      highlightToc('hub');
      enhanceShots(contentEl);
      return;
    }
    loadModule(mod, hash, false);
  });

  /* —— Zoom / lightbox nas screenshots —— */
  enhanceShots(root);

  var lightbox = document.createElement('div');
  lightbox.className = 'admin-docs-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Imagem ampliada');
  lightbox.innerHTML =
    '<button type="button" class="admin-docs-lightbox__close" aria-label="Fechar">' + closeSvg + '</button>' +
    '<img class="admin-docs-lightbox__img" alt="">';
  document.body.appendChild(lightbox);

  var lightboxImg = lightbox.querySelector('.admin-docs-lightbox__img');
  var closeBtn = lightbox.querySelector('.admin-docs-lightbox__close');

  function visibleShotImg(shot) {
    var imgs = shot.querySelectorAll('img.shot-img');
    for (var i = 0; i < imgs.length; i++) {
      if (getComputedStyle(imgs[i]).display === 'none') continue;
      return imgs[i];
    }
    var lang = root.getAttribute('data-lang') || 'pt';
    return shot.querySelector('img.shot-' + lang) || shot.querySelector('img.shot-img');
  }

  function openLightbox(src, alt) {
    if (!src) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('is-open');
    document.body.classList.add('admin-docs-lightbox-open');
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('admin-docs-lightbox-open');
    lightboxImg.removeAttribute('src');
  }

  root.addEventListener('click', function (e) {
    var zoom = e.target.closest('.shot-zoom');
    if (!zoom || !root.contains(zoom)) return;
    var shot = zoom.closest('.shot');
    if (!shot) return;
    var img = visibleShotImg(shot);
    if (!img) return;
    openLightbox(img.currentSrc || img.src, img.alt);
  });

  closeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    closeLightbox();
  });
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
})();

