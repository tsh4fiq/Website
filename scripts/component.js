/* Root component logic for the portfolio page.
 *
 * The DC runtime evaluates the <script type="text/x-dc"> block in index.html
 * with DCLogic and React in scope and expects a `Component` class back, so it
 * cannot load logic from a src attribute. This file exports a factory instead;
 * the inline block passes those two bindings straight through to it.
 */
window.TSPortfolio = function (DCLogic, React) {
  return class extends DCLogic {

    state = {
      theme: (() => { try { const t = localStorage.getItem('ts-ed-theme'); return (t === 'sky' || t === 'ember') ? t : 'sky'; } catch (e) { return 'sky'; } })(),
      termLines: [{ col: 'var(--acSoft)', text: 'ts-shell v2.0 — type "help" and press Enter' }],
      cwd: '~',
      pipe: { phase: 'idle', step: -1 },
      typeVal: '', typeStart: 0, typeEnd: 0,
      navOpen: false,
      dark: (() => { try { return localStorage.getItem('ts-ed-dark') === '1'; } catch (e) { return false; } })(),
    };

    themes() {
      if (this._themes) return this._themes;
      this._themes = {
        ember: {
          fd: "'Bricolage Grotesque',sans-serif", fb: "'Newsreader',serif", fl: "'Space Grotesk',sans-serif", fc: "'Space Mono',monospace",
          vars: { '--ac': '#c8501e', '--acD': '#c8501e', '--acFill': '#c8501e', '--onAc': '#f4efe7', '--onAc2': '#1c1a17', '--acPale': '#f7ddd0', '--acSoft': '#f4b78e', '--acBg': 'rgba(200,80,30,0.18)', '--pulseC': 'rgba(200,80,30,0.55)', '--paper': '#f4efe7', '--navBg': 'rgba(244,239,231,0.9)', '--ink': '#1c1a17', '--mut': '#6b6459', '--mutD': '#a89f92', '--bodyD': '#d8d2c8', '--card2': '#f4efe7', '--cool': '#f4efe7', '--surf': '#1c1a17', '--onSurf': '#f4efe7' },
        },
        sky: {
          fd: "'Sora',sans-serif", fb: "'Karla',sans-serif", fl: "'Karla',sans-serif", fc: "'IBM Plex Mono',monospace",
          vars: { '--ac': '#2b7fb8', '--acD': '#7ec3ec', '--acFill': '#8fd0f5', '--onAc': '#10222e', '--onAc2': '#0d3a55', '--acPale': '#1e4a66', '--acSoft': '#9fd6f4', '--acBg': 'rgba(126,195,236,0.16)', '--pulseC': 'rgba(80,165,220,0.55)', '--paper': '#eff4f8', '--navBg': 'rgba(239,244,248,0.9)', '--ink': '#10222e', '--mut': '#5c6d79', '--mutD': '#94a7b4', '--bodyD': '#d0dde6', '--card2': '#f8fbfd', '--cool': '#e8eef3', '--surf': '#10222e', '--onSurf': '#eff4f8' },
        },
      };
      return this._themes;
    }

    darkThemes() {
      if (this._darkT) return this._darkT;
      this._darkT = {
        ember: { '--ac': '#e0692f', '--acD': '#e0692f', '--acFill': '#c8501e', '--onAc': '#f4efe7', '--onAc2': '#1c1a17', '--acPale': '#f7ddd0', '--acSoft': '#f4b78e', '--acBg': 'rgba(224,105,47,0.2)', '--pulseC': 'rgba(224,105,47,0.55)', '--paper': '#1a1815', '--navBg': 'rgba(26,24,21,0.9)', '--ink': '#f0ebe2', '--mut': '#9a9184', '--mutD': '#b8afa2', '--bodyD': '#e6e1d8', '--card2': '#1a1815', '--cool': '#1a1815', '--surf': '#26221b', '--onSurf': '#f4efe7' },
        sky: { '--ac': '#7ec3ec', '--acD': '#8fd0f5', '--acFill': '#8fd0f5', '--onAc': '#0d1b26', '--onAc2': '#0d3a55', '--acPale': '#1e4a66', '--acSoft': '#9fd6f4', '--acBg': 'rgba(126,195,236,0.18)', '--pulseC': 'rgba(126,195,236,0.55)', '--paper': '#0d1b26', '--navBg': 'rgba(13,27,38,0.9)', '--ink': '#e7f0f6', '--mut': '#8fa0ac', '--mutD': '#a9b8c2', '--bodyD': '#d8e4ec', '--card2': '#0d1b26', '--cool': '#0d1b26', '--surf': '#132530', '--onSurf': '#eff4f8' },
      };
      return this._darkT;
    }

    fontPacks() {
      if (this._fontPacksC) return this._fontPacksC;
      this._fontPacksC = {
        'Soft Geometric': { fd: "'Outfit',sans-serif", fb: "'Karla',sans-serif", fl: "'Outfit',sans-serif", fc: "'Space Mono',monospace", lsD: '-0.03em' },
        'Rounded Sans': { fd: "'Quicksand',sans-serif", fb: "'Nunito Sans',sans-serif", fl: "'Quicksand',sans-serif", fc: "'Space Mono',monospace", lsD: '-0.02em' },
        'Poppins Modern': { fd: "'Poppins',sans-serif", fb: "'DM Sans',sans-serif", fl: "'Poppins',sans-serif", fc: "'IBM Plex Mono',monospace", lsD: '-0.035em' },
        'Manrope Clean': { fd: "'Manrope',sans-serif", fb: "'Manrope',sans-serif", fl: "'Manrope',sans-serif", fc: "'JetBrains Mono',monospace", lsD: '-0.035em' },
        'Friendly Lexend': { fd: "'Lexend',sans-serif", fb: "'Karla',sans-serif", fl: "'Lexend',sans-serif", fc: "'Space Mono',monospace", lsD: '-0.02em' },
      };
      return this._fontPacksC;
    }

    /* ---------- section-header underlines ---------- */
    squiggleEl(w, stroke) {
      const d = 'M0 5 Q4 0,8 5 T16 5 T24 5 T32 5 T40 5 T48 5 T56 5 T64 5 T72 5 T80 5 T88 5 T96 5 T104 5 T112 5 T120 5 T128 5 T136 5 T144 5 T152 5 T160 5 T168 5 T176 5';
      return React.createElement('svg', { width: w, height: 9, viewBox: '0 0 ' + w + ' 9', style: { display: 'block' } },
        React.createElement('path', { d: d, fill: 'none', stroke: stroke, strokeWidth: 2.5, strokeLinecap: 'round', style: { animation: 'ts-wave 1.9s linear infinite' } })
      );
    }
    ecgEl(w, stroke) {
      const P = 64, H = 26;
      const seg = [[0,17],[18,17],[24,13],[28,17],[31,17],[33,20],[36,4],[39,24],[42,17],[47,17],[53,14],[57,17],[64,17]];
      const periods = Math.ceil((w + P) / P) + 1;
      let d = '';
      for (let k = 0; k < periods; k++) {
        const x = k * P;
        seg.forEach((pt, i) => { d += (k === 0 && i === 0 ? 'M' : 'L') + (x + pt[0]) + ' ' + pt[1] + ' '; });
      }
      return React.createElement('svg', { width: w, height: H, viewBox: '0 0 ' + w + ' ' + H, style: { display: 'block', overflow: 'hidden' } },
        React.createElement('g', { style: { animation: 'ts-ecg 2.2s linear infinite' } },
          React.createElement('path', { d: d, fill: 'none', stroke: stroke, strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' })
        )
      );
    }
    straightEl(w, stroke) {
      return React.createElement('svg', { width: w, height: 8, viewBox: '0 0 ' + w + ' 8', style: { display: 'block' } },
        React.createElement('line', { x1: 0, y1: 4, x2: w, y2: 4, stroke: stroke, strokeWidth: 3, strokeLinecap: 'round' })
      );
    }
    arrowEl() {
      return React.createElement('svg', { width: 11, height: 11, viewBox: '0 0 12 12', style: { display: 'inline-block', verticalAlign: '-1px', marginLeft: '5px', overflow: 'visible' } },
        React.createElement('path', { d: 'M1 11 L11 1 M11 1 L4.5 1 M11 1 L11 7.5', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', pathLength: 1, style: { strokeDasharray: 1, strokeDashoffset: 1, animation: 'ts-arrowdraw .55s .15s ease forwards' } })
      );
    }
    headerWave(w, stroke) {
      return this.state.theme === 'sky' ? this.squiggleEl(w, stroke) : this.straightEl(w, stroke);
    }
    burgerEl() {
      // crispEdges snaps each bar to the device-pixel grid, so all three
      // render at exactly the same thickness regardless of display scaling
      const bar = (y) => React.createElement('rect', { key: y, x: 0, y: y, width: 18, height: 2 });
      return React.createElement('svg', { width: 18, height: 14, style: { display: 'block', fill: 'var(--ink)', shapeRendering: 'crispEdges' } },
        bar(0), bar(6), bar(12)
      );
    }

    /* ---------- comeau-style ambient sparkles ---------- */
    setupSparkles() {
      if (this._sparkI) { clearInterval(this._sparkI); this._sparkI = null; }
      if ((this.props.motion ?? true) === false) return;
      if (this.state.theme !== 'sky') return;
      const star = '<svg width="100%" height="100%" viewBox="0 0 16 16"><path d="M8 0 C8 5 11 8 16 8 C11 8 8 11 8 16 C8 11 5 8 0 8 C5 8 8 5 8 0" fill="currentColor"></path></svg>';
      const targets = [{ id: 'spark-name', col: 'var(--ac)' }, { id: 'spark-cta', col: 'var(--acD)' }];
      const spawn = () => {
        if (document.hidden) return;
        const t = targets[Math.floor(Math.random() * targets.length)];
        const el = document.getElementById(t.id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const s = document.createElement('span');
        const size = 12 + Math.random() * 14;
        s.innerHTML = star;
        s.style.cssText = 'position:fixed;z-index:60;pointer-events:none;width:' + size + 'px;height:' + size + 'px;color:' + t.col + ';left:' + (r.left + Math.random() * r.width) + 'px;top:' + (r.top - 12 + Math.random() * (r.height * 0.8)) + 'px;animation:ts-sparkle .9s ease-in-out forwards';
        s.addEventListener('animationend', () => s.remove());
        const root = document.getElementById('ed-root');
        if (root) root.appendChild(s);
      };
      this._sparkI = setInterval(spawn, 1800);
    }

    applyTheme() {
      const T = this.themes()[this.state.theme] || this.themes().ember;
      const r = document.getElementById('ed-root');
      if (!r) return;
      const vars = this.state.dark ? (this.darkThemes()[this.state.theme] || this.darkThemes().ember) : T.vars;
      Object.entries(vars).forEach(([k, v]) => r.style.setProperty(k, v));
      const pk = this.fontPacks()[this.props.fontPack];
      r.style.setProperty('--fd', pk ? pk.fd : T.fd);
      r.style.setProperty('--fb', pk ? pk.fb : T.fb);
      r.style.setProperty('--fl', pk ? pk.fl : T.fl);
      r.style.setProperty('--fc', pk ? pk.fc : T.fc);
      r.style.setProperty('--lsD', pk ? pk.lsD : '-0.04em');
      document.body.style.background = vars['--paper'];
    }

    setTheme(name) {
      if (name === this.state.theme) return;
      try { localStorage.setItem('ts-ed-theme', name); } catch (e) {}
      this.setState({ theme: name });
    }

    scrollTo(id) {
      const el = document.getElementById(id);
      if (!el) return;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
    }

    applyTimeline() {
      const style = this.props.timelineStyle ?? 'Zig-zag';
      const mobile = window.matchMedia && window.matchMedia('(max-width: 900px)').matches;
      const track = document.getElementById('tl-track');
      if (!track) return;
      track.querySelectorAll('[data-tl-conn]').forEach((e) => e.remove());
      const wraps = [...track.children].filter((c) => c.hasAttribute && c.hasAttribute('data-reveal'));
      wraps.forEach((wrap, i) => {
        const dot = this.findDot(wrap);
        const card = wrap.querySelector('[data-tl-card]');
        const isKey = wrap.hasAttribute('data-key');
        if (dot && dot.dataset.baseLeft === undefined) dot.dataset.baseLeft = dot.style.left || '0px';
        let off = 0;
        if (card) {
          if (mobile) off = 0;
          else if (style === 'Zig-zag') off = isKey ? 96 : 0;
          else if (style === 'Wave') off = Math.round((Math.sin(i * 0.7) + 1) / 2 * 90);
          card.style.marginLeft = off + 'px';
        }
        if (dot) dot.style.left = ((parseFloat(dot.dataset.baseLeft) || 0) + off) + 'px';
      });
      this.drawTimelineLine();
    }
    findDot(wrap) {
      for (const k of wrap.children) {
        const st = (k.getAttribute && k.getAttribute('style')) || '';
        if (st.includes('absolute') && !st.includes('-172px')) return k;
      }
      return null;
    }
    drawTimelineLine() {
      const track = document.getElementById('tl-track');
      if (!track) return;
      const wraps = [...track.children].filter((c) => c.hasAttribute && c.hasAttribute('data-reveal'));
      const pts = [];
      wraps.forEach((wrap) => {
        const dot = this.findDot(wrap);
        if (!dot) return;
        let x = 0, y = 0, n = dot;
        while (n && n !== track) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
        pts.push({ x: x + dot.offsetWidth / 2, y: y + dot.offsetHeight / 2, key: wrap.hasAttribute('data-key') });
      });
      if (pts.length < 2) return;
      const W = track.offsetWidth, H = track.offsetHeight;
      const existingSvgs = track.querySelectorAll('#tl-line');
      for (let s = 1; s < existingSvgs.length; s++) existingSvgs[s].remove();
      let svg = existingSvgs[0];
      if (!svg) {
        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('id', 'tl-line');
        svg.style.position = 'absolute';
        svg.style.left = '0';
        svg.style.top = '0';
        svg.style.pointerEvents = 'none';
        svg.style.zIndex = '0';
        svg.style.overflow = 'visible';
        track.insertBefore(svg, track.firstChild);
      }
      svg.setAttribute('width', W);
      svg.setAttribute('height', H);
      let path = svg.querySelector('path');
      if (!path) {
        path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('fill', 'none');
        path.style.stroke = 'var(--ink)';
        path.setAttribute('stroke-width', '3');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('stroke-linecap', 'round');
        svg.appendChild(path);
      }
      let d = 'M ' + pts[0].x + ' 0 L ' + pts[0].x + ' ' + pts[0].y;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        if (Math.abs(a.x - b.x) < 0.5) { d += ' L ' + b.x + ' ' + b.y; continue; }
        const run = Math.abs(b.x - a.x);
        if (b.key) d += ' L ' + a.x + ' ' + (b.y - run) + ' L ' + b.x + ' ' + b.y;
        else d += ' L ' + b.x + ' ' + (a.y + run) + ' L ' + b.x + ' ' + b.y;
      }
      d += ' L ' + pts[pts.length - 1].x + ' ' + H;
      path.setAttribute('d', d);
      const len = path.getTotalLength();
      path.style.strokeDasharray = len;
      path.style.transition = 'none';
      path.style.strokeDashoffset = (this._drawMode && !this._lineDrawn) ? len : 0;
    }
    animateLineDraw() {
      const track = document.getElementById('tl-track');
      const path = track && track.querySelector('#tl-line path');
      if (!path) return;
      const len = path.getTotalLength();
      path.style.transition = 'none';
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;
      path.getBoundingClientRect();
      path.style.transition = 'stroke-dashoffset 1.9s ease-in-out';
      path.style.strokeDashoffset = 0;
      this._lineDrawn = true;
    }
    setupUnderlines() {
      if (this._uio) { this._uio.disconnect(); this._uio = null; }
      const fill = (el) => { const px = el.getAttribute('data-uline') || el.getAttribute('data-uline-card') || '2'; el.style.backgroundSize = '100% ' + px + 'px'; };
      const motion = (this.props.motion ?? true) !== false;
      const heads = [...document.querySelectorAll('[data-uline]')];
      if (!motion) { heads.forEach(fill); }
      else {
        const io = new IntersectionObserver((ents) => {
          ents.forEach((e) => { if (e.isIntersecting) { fill(e.target); io.unobserve(e.target); } });
        }, { threshold: 0.6 });
        heads.forEach((el) => io.observe(el));
        this._uio = io;
      }
      if (this._cuio) { this._cuio.disconnect(); this._cuio = null; }
      const noHover = window.matchMedia && window.matchMedia('(hover: none)').matches;
      const cards = [...document.querySelectorAll('[data-tl-card]')];
      if (noHover && motion) {
        // touch devices never fire mouseenter: play the underline fill
        // once when the card scrolls into view instead
        const cio = new IntersectionObserver((ents) => {
          ents.forEach((en) => {
            if (!en.isIntersecting) return;
            [...en.target.querySelectorAll('[data-uline-card]')].forEach((t, i) => setTimeout(() => fill(t), i * 90));
            cio.unobserve(en.target);
          });
        }, { threshold: 0.5 });
        cards.forEach((card) => { if (card.querySelector('[data-uline-card]')) cio.observe(card); });
        this._cuio = cio;
        return;
      }
      cards.forEach((card) => {
        const targets = [...card.querySelectorAll('[data-uline-card]')];
        if (!targets.length) return;
        if (!motion) { targets.forEach(fill); return; }
        if (card._ulBound) return;
        card._ulBound = true;
        const show = () => targets.forEach((t, i) => setTimeout(() => fill(t), i * 90));
        const hide = () => targets.forEach((t) => { const px = t.getAttribute('data-uline-card') || '2'; t.style.backgroundSize = '0% ' + px + 'px'; });
        card.addEventListener('mouseenter', show);
        card.addEventListener('mouseleave', hide);
      });
    }
    setupReveal() {
      if (this._io) { this._io.disconnect(); this._io = null; }
      if (this._jio) { this._jio.disconnect(); this._jio = null; }
      if (this._t1) { clearTimeout(this._t1); this._t1 = null; }
      const els = [...document.querySelectorAll('[data-reveal]')];
      const journeyEls = [...document.querySelectorAll('#journey [data-reveal]')];
      const isJourney = (el) => journeyEls.indexOf(el) >= 0;
      const reveal = (el) => { el.style.opacity = '1'; el.style.transform = 'none'; };
      if ((this.props.motion ?? true) === false) { els.forEach(reveal); this._drawMode = false; this._lineDrawn = true; this.drawTimelineLine(); return; }
      const drawMode = (this.props.journeyReveal ?? 'Fade on scroll') === 'Draw line in';
      this._drawMode = drawMode;
      this._lineDrawn = !drawMode;
      const inView = (el) => { const r = el.getBoundingClientRect(); return r.top < (window.innerHeight || 800) * 0.95 && r.bottom > 0; };
      // no horizontal slide on narrow screens: cards already span the full
      // width there, so a sideways offset pushes them past the viewport edge
      const narrow = window.matchMedia && window.matchMedia('(max-width: 900px)').matches;
      els.forEach((el) => {
        const ji = journeyEls.indexOf(el);
        const stag = el.hasAttribute('data-stagger');
        const dx = narrow ? 0 : (stag ? -28 : (ji >= 0 ? (ji % 2 === 1 ? -40 : 40) : 0));
        el.style.transition = 'opacity .75s cubic-bezier(.2,.6,.2,1), transform .75s cubic-bezier(.2,.6,.2,1)';
        if (stag) el.style.transitionDelay = ((parseFloat(el.getAttribute('data-stagger')) || 0)) + 'ms';
        el.style.opacity = '0';
        el.style.transform = 'translate(' + dx + 'px, 26px)';
      });
      this.drawTimelineLine();
      let lastJT = 0;
      const revealSeq = (el) => {
        const now = performance.now();
        const at = Math.max(now, lastJT + 260);
        lastJT = at;
        setTimeout(() => reveal(el), at - now);
      };
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { (isJourney(e.target) ? revealSeq : reveal)(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.12 });
      els.forEach((el) => { if (!(drawMode && isJourney(el))) io.observe(el); });
      this._io = io;
      requestAnimationFrame(() => els.forEach((el) => { if (!(drawMode && isJourney(el)) && inView(el)) (isJourney(el) ? revealSeq : reveal)(el); }));
      this._t1 = setTimeout(() => els.forEach((el) => { if (!isJourney(el) && getComputedStyle(el).opacity === '0') reveal(el); }), 1600);
      if (drawMode && journeyEls.length) {
        const trigger = () => {
          if (this._lineDrawn) return;
          this.animateLineDraw();
          journeyEls.forEach((el, idx) => setTimeout(() => reveal(el), Math.min(1700, idx * 150)));
        };
        const jio = new IntersectionObserver((ents) => {
          ents.forEach((en) => { if (en.isIntersecting) { trigger(); jio.disconnect(); } });
        }, { threshold: 0.12 });
        jio.observe(journeyEls[0]);
        this._jio = jio;
        requestAnimationFrame(() => { if (this._jio && inView(journeyEls[0])) { trigger(); this._jio.disconnect(); } });
      }
    }
    ensureIcons(tries) {
      tries = tries || 0;
      if (window.lucide && window.lucide.createIcons) { try { window.lucide.createIcons(); } catch (e) {} }
      else if (tries < 40) { this._iconTimer = setTimeout(() => this.ensureIcons(tries + 1), 100); }
    }
    setupCountUps() {
      const els = [...document.querySelectorAll('[data-countup]')];
      if (!els.length) return;
      if ((this.props.motion ?? true) === false) { els.forEach((el) => { el.textContent = el.getAttribute('data-countup'); }); return; }
      const run = (el) => {
        const target = parseFloat(el.getAttribute('data-countup')) || 0;
        const dur = 1250, t0 = performance.now();
        const step = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * e);
          if (p < 1) requestAnimationFrame(step); else el.textContent = target;
        };
        requestAnimationFrame(step);
      };
      const io = new IntersectionObserver((ents) => {
        ents.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
      }, { threshold: 0.6 });
      els.forEach((el) => { el.textContent = '0'; io.observe(el); });
      this._ioCount = io;
    }
    setupRotator() {
      const el = document.getElementById('role-rotator');
      if (!el || (this.props.motion ?? true) === false) return;
      const AR = 'مسلم، الحمد لله';
      const roles = ['Software Engineer', 'Backend Developer', 'Full-Stack Dev', 'AI Enthusiast', 'ML Researcher', 'Aspiring Founder', AR];
      const typeSpeed = 62, backSpeed = 34, hold = 1500;
      let i = 0;
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.textContent = roles[0];
      const schedule = (fn, ms) => { this._rotT = setTimeout(fn, ms); };
      // The Arabic entry types right to left. A hidden copy of the phrase
      // holds the width open, so the caret first sweeps left to right over
      // empty space, then the letters fill in from the right edge inwards.
      const arShell = (wide, shown) =>
        '<span style="position:relative;display:inline-block;direction:rtl;unicode-bidi:isolate;'
        + 'font-family:\'Scheherazade New\',serif;font-size:1.45em;line-height:1;">'
        + '<span style="visibility:hidden;white-space:pre">' + AR.slice(0, wide) + '</span>'
        + '<span style="position:absolute;top:0;right:0;white-space:pre">' + AR.slice(0, shown) + '</span>'
        + '</span>';
      const typeIn = (word, done) => {
        if (word !== AR) {
          let m = 0;
          const step = () => {
            el.textContent = word.slice(0, m);
            if (m < word.length) { m++; schedule(step, typeSpeed); } else done();
          };
          step();
          return;
        }
        let w = 0;
        const widen = () => {
          el.innerHTML = arShell(w, 0);
          if (w < AR.length) { w++; schedule(widen, typeSpeed); }
          else {
            let n = 0;
            const fill = () => {
              el.innerHTML = arShell(AR.length, n);
              if (n < AR.length) { n++; schedule(fill, typeSpeed); } else done();
            };
            fill();
          }
        };
        widen();
      };
      const typeOut = (word, done) => {
        if (word !== AR) {
          let n = word.length;
          const step = () => {
            el.textContent = word.slice(0, n);
            if (n > 0) { n--; schedule(step, backSpeed); } else done();
          };
          step();
          return;
        }
        let n = AR.length;
        const empty = () => {
          el.innerHTML = arShell(AR.length, n);
          if (n > 0) { n--; schedule(empty, backSpeed); }
          else {
            let w = AR.length;
            const shrink = () => {
              el.innerHTML = arShell(w, 0);
              if (w > 0) { w--; schedule(shrink, backSpeed); }
              else { el.textContent = ''; done(); }
            };
            shrink();
          }
        };
        empty();
      };
      const cycle = () => {
        const cur = roles[i];
        const next = (i + 1) % roles.length;
        typeOut(cur, () => typeIn(roles[next], () => { i = next; schedule(cycle, hold); }));
      };
      schedule(cycle, hold);
    }

    /* ---------- terminal (ember playground) ---------- */
    runTerm(cmd) {
      const L = [...this.state.termLines];
      let cwd = this.state.cwd || '~';
      L.push({ col: 'var(--mutD)', text: 'guest@tajwaar:' + cwd + '$ ' + cmd });
      const say = (t, c) => L.push({ col: c || 'var(--bodyD)', text: t });
      const c = cmd.toLowerCase().trim();
      const parts = c.split(/\s+/);
      const cmd0 = parts[0];
      const arg = parts.slice(1).join(' ').replace(/\/$/, '');
      const files = ['gaming.txt', 'anime.txt', 'easter_eggs.txt'];
      if (c === '') {}
      else if (c === 'help') {
        say('available commands:', 'var(--acSoft)');
        say('  whoami        about me');
        say('  stack         languages & tools');
        say('  projects      selected work');
        say('  contact       ways to reach me');
        say('  clear         wipe the screen');
      } else if (c === 'whoami') {
        say('Tajwaar Shafiq — CS @ U of T (2026). Backend-leaning full-stack.');
        say('12-month SWE internship at Veeva Systems. Hackathon winner. Mentor.');
      } else if (c === 'stack') {
        say('Java · Python · TypeScript · C/C++ · SQL · Haskell');
        say('React · Redux · Django · Node.js · AWS · GCP · Git');
      } else if (c === 'projects') {
        say('Gen-AI Predictor   NLP, 98% train accuracy, team lead');
        say('CarGo              NewHacks V winner, P2P vehicle rental');
        say('Park Mindfulness   Ontario Parks, Django + AWS CI/CD');
        say('scroll up to The Journey for the full list', 'var(--mutD)');
      } else if (c === 'contact') {
        say('email     tajwaar.shafiq@mail.utoronto.ca');
        say('github    github.com/tsh4fiq');
        say('linkedin  linkedin.com/in/tajwaarshafiq');
      } else if (cmd0 === 'ls') {
        if (cwd === '~/interests') files.forEach((f) => say(f, 'var(--bodyD)'));
        else say('interests/', 'var(--acSoft)');
      } else if (cmd0 === 'cd') {
        if (arg === '' || arg === '~' || arg === '..') cwd = '~';
        else if (cwd === '~' && arg === 'interests') cwd = '~/interests';
        else if (cwd === '~/interests' && arg === 'interests') {}
        else say('cd: no such directory: ' + arg, 'var(--acSoft)');
      } else if (cmd0 === 'cat' || cmd0 === 'vim') {
        if (cwd === '~/interests' && files.indexOf(arg) >= 0) say('Under construction...', 'var(--acSoft)');
        else if (arg === '') say(cmd0 + ': missing file operand', 'var(--acSoft)');
        else say(cmd0 + ': ' + arg + ': No such file or directory', 'var(--acSoft)');
      } else if (c === 'clear') {
        this.setState({ termLines: [], cwd: cwd });
        return;
      } else {
        say('command not found: ' + cmd + ' — try "help"', 'var(--acSoft)');
      }
      this.setState({ termLines: L.slice(-80), cwd: cwd });
      setTimeout(() => { const o = document.getElementById('term-out'); if (o) o.scrollTop = o.scrollHeight; }, 40);
    }

    /* ---------- paper plane minigame (sky playground) ---------- */
    initPlaneGame(tries) {
      const cv = document.getElementById('sky-canvas');
      if (!cv) { if ((tries || 0) < 20) this._pgT = setTimeout(() => this.initPlaneGame((tries || 0) + 1), 120); return; }
      const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      const ctx = cv.getContext('2d');
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const S = { phase: 'idle', py: 0, vy: 0, gates: [], score: 0, t: 0, w: 0, h: 0 };
      S.best = parseInt((() => { try { return localStorage.getItem('ts-plane-best') || '0'; } catch (e) { return '0'; } })(), 10) || 0;
      const bestEl = document.getElementById('plane-best');
      if (bestEl) bestEl.textContent = S.best;
      const resize = () => { S.w = cv.clientWidth; S.h = cv.clientHeight; cv.width = S.w * dpr; cv.height = S.h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
      resize();
      S.py = S.h * 0.45;
      const clouds = [];
      for (let i = 0; i < 7; i++) clouds.push({ x: Math.random() * S.w, y: (0.08 + Math.random() * 0.8), s: 0.6 + Math.random(), v: 0.15 + Math.random() * 0.25 });
      const start = () => { S.phase = 'play'; S.score = 0; S.gates = []; S.py = S.h * 0.45; S.vy = -3.4; S.t = 0; S.spawnAcc = 100; };
      const flap = () => { if (S.phase === 'play') S.vy = -5.4; else start(); };
      const over = () => {
        S.phase = 'over';
        if (S.score > S.best) { S.best = S.score; try { localStorage.setItem('ts-plane-best', String(S.best)); } catch (e) {} if (bestEl) bestEl.textContent = S.best; }
      };
      const puff = (cx, cy, r) => { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill(); };
      const drawCol = (x, y0, y1) => {
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = 'rgba(16,34,46,0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const w = 62;
        ctx.rect(x, y0, w, y1 - y0);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#ffffff';
        for (let yy = y0 + 14; yy < y1 - 6; yy += 30) { puff(x, yy, 12); puff(x + 62, yy + 14, 12); }
      };
      // wrap help copy onto centred lines when it would spill past the canvas edges
      const helpLines = (text, maxW) => {
        const words = text.split(' ');
        const lines = [];
        let cur = '';
        words.forEach((word) => {
          const test = cur ? cur + ' ' + word : word;
          if (cur && ctx.measureText(test).width > maxW) { lines.push(cur); cur = word; }
          else cur = test;
        });
        if (cur) lines.push(cur);
        return lines;
      };
      const drawHelp = (text, cx, y, maxW, lh) => {
        helpLines(text, maxW).forEach((ln, i) => ctx.fillText(ln, cx, y + i * lh));
      };
      const loop = (ts) => {
        const w = S.w, h = S.h;
        // frame-rate-independent step: 1 == a 60fps frame, so 90/120Hz mobile
        // integrates the same physics per real second as a 60Hz desktop
        const now = ts || performance.now();
        let dt = S.last ? (now - S.last) / (1000 / 60) : 1;
        S.last = now;
        if (dt > 3) dt = 3; else if (dt <= 0) dt = 1;
        S.t += dt;
        const g = ctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, '#c9e6f7'); g.addColorStop(1, '#eff6fb');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        clouds.forEach((cl) => {
          cl.x -= cl.v * dt;
          if (cl.x < -90) cl.x = w + 60;
          const cy = cl.y * h;
          puff(cl.x, cy, 16 * cl.s); puff(cl.x + 20 * cl.s, cy - 8 * cl.s, 13 * cl.s); puff(cl.x + 40 * cl.s, cy, 15 * cl.s);
        });
        const px = w * 0.24;
        if (S.phase === 'play') {
          S.vy += 0.12096 * dt; S.py += S.vy * dt;
          const speed = Math.min(4.4, 2.7 + S.score * 0.05);
          S.spawnAcc += dt;
          if (S.spawnAcc >= 100) { S.spawnAcc -= 100; S.gates.push({ x: w + 30, gy: 90 + Math.random() * (h - 220), passed: false }); }
          S.gates.forEach((gt) => { gt.x -= speed * dt; });
          S.gates = S.gates.filter((gt) => gt.x > -120);
          const gapH = 152;
          S.gates.forEach((gt) => {
            drawCol(gt.x, -6, gt.gy - gapH / 2);
            drawCol(gt.x, gt.gy + gapH / 2, h + 6);
            if (!gt.passed && gt.x + 62 < px - 14) { gt.passed = true; S.score++; }
            if (gt.x < px + 15 && gt.x + 62 > px - 15 && (S.py - 10 < gt.gy - gapH / 2 || S.py + 10 > gt.gy + gapH / 2)) over();
          });
          if (S.py > h - 8 || S.py < 6) over();
        } else {
          S.py = h * 0.45 + Math.sin(S.t * 0.045) * 10;
          S.gates.forEach((gt) => { const gapH = 152; drawCol(gt.x, -6, gt.gy - gapH / 2); drawCol(gt.x, gt.gy + gapH / 2, h + 6); });
        }
        ctx.save();
        ctx.translate(px, S.py);
        ctx.rotate(Math.max(-0.45, Math.min(0.6, S.vy * 0.07)));
        ctx.fillStyle = '#10222e';
        ctx.beginPath(); ctx.moveTo(19, 0); ctx.lineTo(-15, -9); ctx.lineTo(-7, 0); ctx.lineTo(-15, 9); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#2b7fb8';
        ctx.beginPath(); ctx.moveTo(19, 0); ctx.lineTo(-7, 0); ctx.lineTo(-15, 9); ctx.closePath(); ctx.fill();
        ctx.restore();
        ctx.fillStyle = '#10222e';
        ctx.textAlign = 'center';
        if (S.phase === 'play') {
          ctx.font = '700 34px "IBM Plex Mono",monospace';
          ctx.fillText(S.score, w / 2, 52);
        } else if (S.phase === 'idle') {
          ctx.font = '700 22px "IBM Plex Mono",monospace';
          ctx.fillText(coarse ? 'TAP TO LAUNCH' : 'CLICK TO LAUNCH', w / 2, h / 2 - 46);
          ctx.font = '400 13px "IBM Plex Mono",monospace';
          ctx.fillStyle = 'rgba(16,34,46,0.6)';
          drawHelp('glide through the cloud gates — one ' + (coarse ? 'tap' : 'click') + ' = one lift', w / 2, h / 2 - 22, w - 40, 17);
        } else {
          ctx.font = '700 24px "IBM Plex Mono",monospace';
          ctx.fillText('CRASHED AT ' + S.score, w / 2, h / 2 - 46);
          ctx.font = '400 13px "IBM Plex Mono",monospace';
          ctx.fillStyle = 'rgba(16,34,46,0.6)';
          drawHelp(S.score >= S.best && S.score > 0 ? 'new personal best — ' + (coarse ? 'tap' : 'click') + ' to go again' : (coarse ? 'tap to retry' : 'click or press space to retry'), w / 2, h / 2 - 22, w - 40, 17);
        }
        this._pgRaf = requestAnimationFrame(loop);
      };
      const pd = (e) => { e.preventDefault(); flap(); };
      const kd = (e) => { if (e.code !== 'Space') return; if (S.phase === 'play' || S.phase === 'over') { e.preventDefault(); flap(); } };
      const wr = () => resize();
      cv.addEventListener('pointerdown', pd);
      window.addEventListener('keydown', kd);
      window.addEventListener('resize', wr);
      this._pgRaf = requestAnimationFrame(loop);
      this._pgStop = () => {
        cancelAnimationFrame(this._pgRaf);
        cv.removeEventListener('pointerdown', pd);
        window.removeEventListener('keydown', kd);
        window.removeEventListener('resize', wr);
      };
    }

    /* ---------- pipeline (ember playground) ---------- */
    pipeRun() {
      if (this._pipeOn) return;
      this._pipeOn = true;
      const step = (i) => {
        this.setState({ pipe: { phase: 'run', step: i } });
        this._pipeT = setTimeout(() => {
          if (i >= 3) { this.setState({ pipe: { phase: 'done', step: 4 } }); this._pipeOn = false; }
          else step(i + 1);
        }, 850);
      };
      step(0);
    }

    /* ---------- commit wall (ember playground) ---------- */
    initPixel(tries) {
      const cv = document.getElementById('pixel-canvas');
      if (!cv) { if ((tries || 0) < 20) this._pxT = setTimeout(() => this.initPixel((tries || 0) + 1), 120); return; }
      const ctx = cv.getContext('2d');
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const shades = ['#ece5d7', '#f3cdb4', '#e89b6b', '#c8501e', '#8f3812'];
      let w = 0, h = 0, cols = 0, cell = 0, ox = 0, oy = 0, grid = [];
      const rows = 7, gap = 3;
      const draw = () => {
        ctx.clearRect(0, 0, w, h);
        for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
          ctx.fillStyle = shades[grid[c * rows + r] || 0];
          ctx.fillRect(ox + c * (cell + gap), oy + r * (cell + gap), cell, cell);
        }
      };
      const resize = () => {
        w = cv.clientWidth; h = cv.clientHeight;
        cv.width = w * dpr; cv.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cell = Math.max(8, Math.floor((h - 28) / rows) - gap);
        cols = Math.max(1, Math.floor((w - 28) / (cell + gap)));
        ox = Math.round((w - (cols * (cell + gap) - gap)) / 2);
        oy = Math.round((h - (rows * (cell + gap) - gap)) / 2);
        if (grid.length !== cols * rows) grid = new Array(cols * rows).fill(0);
        draw();
      };
      const idx = (e) => {
        const rc = cv.getBoundingClientRect();
        const c = Math.floor((e.clientX - rc.left - ox) / (cell + gap));
        const r = Math.floor((e.clientY - rc.top - oy) / (cell + gap));
        if (c < 0 || c >= cols || r < 0 || r >= rows) return -1;
        return c * rows + r;
      };
      let down = false, brush = 3;
      const pd = (e) => { e.preventDefault(); if (cv.setPointerCapture) try { cv.setPointerCapture(e.pointerId); } catch (err) {} down = true; const i = idx(e); if (i < 0) return; brush = (grid[i] + 1) % 5; grid[i] = brush; draw(); };
      const pm = (e) => { if (!down) return; const i = idx(e); if (i < 0) return; if (grid[i] !== brush) { grid[i] = brush; draw(); } };
      const pu = () => { down = false; };
      const wr = () => resize();
      cv.addEventListener('pointerdown', pd);
      cv.addEventListener('pointermove', pm);
      window.addEventListener('pointerup', pu);
      window.addEventListener('resize', wr);
      resize();
      this._pxAPI = {
        random: () => { for (let i = 0; i < grid.length; i++) { const r = Math.random(); grid[i] = r < 0.24 ? 0 : r < 0.5 ? 1 : r < 0.74 ? 2 : r < 0.92 ? 3 : 4; } draw(); },
        clear: () => { grid.fill(0); draw(); },
      };
      this._pxStop = () => {
        cv.removeEventListener('pointerdown', pd);
        cv.removeEventListener('pointermove', pm);
        window.removeEventListener('pointerup', pu);
        window.removeEventListener('resize', wr);
        this._pxAPI = null;
      };
    }

    /* ---------- hero parallax ---------- */
    setupParallax() {
      if (this._paraMM) return;
      if ((this.props.motion ?? true) === false) return;
      this._paraMM = (e) => {
        const hero = document.getElementById('hero');
        if (!hero) return;
        const r = hero.getBoundingClientRect();
        if (r.bottom < 0) return;
        const nx = (e.clientX - r.left) / Math.max(1, r.width) - 0.5;
        const ny = (e.clientY - r.top) / Math.max(1, r.height) - 0.5;
        hero.querySelectorAll('[data-para]').forEach((el) => {
          const d = parseFloat(el.getAttribute('data-para')) || 20;
          el.style.transform = 'translate(' + (-nx * d).toFixed(1) + 'px,' + (-ny * d).toFixed(1) + 'px)';
        });
        this._tiltNX = nx; this._tiltNY = ny;
        this.renderTilt();
      };
      window.addEventListener('mousemove', this._paraMM);
      this.setupTilt();
    }

    /* cursor-tracked 3D tilt on the hero name, zooming while hovered */
    setupTilt() {
      if (this._tiltOn) return;
      const el = document.querySelector('[data-tilt3d]');
      if (!el) return;
      this._tiltOn = true;
      this._tiltNX = 0; this._tiltNY = 0; this._tiltHov = false;
      el.addEventListener('mouseenter', () => { this._tiltHov = true; this.renderTilt(); });
      el.addEventListener('mouseleave', () => { this._tiltHov = false; this.renderTilt(); });
    }

    renderTilt() {
      const el = document.querySelector('[data-tilt3d]');
      if (!el) return;
      if (window.matchMedia && window.matchMedia('(max-width: 900px)').matches) { el.style.transform = ''; return; }
      const nx = this._tiltNX || 0, ny = this._tiltNY || 0;
      const rx = (-ny * 11).toFixed(2), ry = (nx * 15).toFixed(2);
      const tx = (nx * 11).toFixed(1), ty = (ny * 7).toFixed(1);
      const tz = this._tiltHov ? 40 : 0;
      el.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,' + tz + 'px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
    }

    /* ---------- constellation (sky playground) ---------- */
    initSkyStars(tries) {
      const cv = document.getElementById('sky-stars');
      if (!cv) { if ((tries || 0) < 20) this._stT = setTimeout(() => this.initSkyStars((tries || 0) + 1), 120); return; }
      const ctx = cv.getContext('2d');
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      let w = 0, h = 0;
      const resize = () => { w = cv.clientWidth; h = cv.clientHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
      resize();
      const P = [];
      for (let i = 0; i < 90; i++) P.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: 0.8 + Math.random() * 1.4 });
      const skills = ['Java', 'Python', 'TypeScript', 'React', 'SQL', 'Django', 'AWS', 'Haskell'];
      const stars = skills.map((s, i) => ({
        label: s,
        x: (0.1 + 0.8 * ((i % 4) / 3)) * w + (Math.random() - 0.5) * 50,
        y: (i < 4 ? 0.28 : 0.68) * h + (Math.random() - 0.5) * 60,
        ph: Math.random() * 6.28,
      }));
      const mouse = { x: -9999, y: -9999 };
      let meteor = null, nextMeteor = performance.now() + 2500 + Math.random() * 4000;
      const mm = (e) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
      const ml = () => { mouse.x = -9999; mouse.y = -9999; };
      let t = 0;
      const loop = () => {
        t += 0.016;
        const g = ctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, '#0d1d29'); g.addColorStop(1, '#13293a');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
        P.forEach((p) => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        });
        for (let i = 0; i < P.length; i++) {
          for (let j = i + 1; j < P.length; j++) {
            const dx = P[i].x - P[j].x, dy = P[i].y - P[j].y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 110 * 110) {
              ctx.strokeStyle = 'rgba(143,208,245,' + ((1 - Math.sqrt(d2) / 110) * 0.28) + ')';
              ctx.lineWidth = 1;
              ctx.beginPath(); ctx.moveTo(P[i].x, P[i].y); ctx.lineTo(P[j].x, P[j].y); ctx.stroke();
            }
          }
          const dxm = P[i].x - mouse.x, dym = P[i].y - mouse.y;
          const dm2 = dxm * dxm + dym * dym;
          if (dm2 < 160 * 160) {
            ctx.strokeStyle = 'rgba(203,232,250,' + ((1 - Math.sqrt(dm2) / 160) * 0.5) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(P[i].x, P[i].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
          ctx.fillStyle = 'rgba(210,235,250,0.85)';
          ctx.beginPath(); ctx.arc(P[i].x, P[i].y, P[i].r, 0, 7); ctx.fill();
        }
        const nowM = performance.now();
        if (!meteor && nowM > nextMeteor) meteor = { x: w * 0.25 + Math.random() * w * 0.7, y: -12, vx: -(2 + Math.random() * 2), vy: 2.2 + Math.random() * 1.4 };
        if (meteor) {
          meteor.x += meteor.vx; meteor.y += meteor.vy;
          const mg = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x - meteor.vx * 13, meteor.y - meteor.vy * 13);
          mg.addColorStop(0, 'rgba(234,245,252,0.95)'); mg.addColorStop(1, 'rgba(234,245,252,0)');
          ctx.strokeStyle = mg; ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(meteor.x, meteor.y); ctx.lineTo(meteor.x - meteor.vx * 13, meteor.y - meteor.vy * 13); ctx.stroke();
          if (meteor.y > h + 24 || meteor.x < -24) { meteor = null; nextMeteor = nowM + 5000 + Math.random() * 7000; }
        }
        ctx.textAlign = 'left';
        stars.forEach((s) => {
          const tw = 2.6 + Math.sin(t * 2 + s.ph) * 1.1;
          ctx.strokeStyle = '#eaf5fc';
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(s.x - tw * 2.2, s.y); ctx.lineTo(s.x + tw * 2.2, s.y);
          ctx.moveTo(s.x, s.y - tw * 2.2); ctx.lineTo(s.x, s.y + tw * 2.2);
          ctx.stroke();
          ctx.fillStyle = '#eaf5fc';
          ctx.beginPath(); ctx.arc(s.x, s.y, tw, 0, 7); ctx.fill();
          ctx.font = '700 11px "IBM Plex Mono",monospace';
          ctx.fillStyle = '#9fd6f4';
          const lw = ctx.measureText(s.label).width;
          if (s.x + 12 + lw > w - 6) { ctx.textAlign = 'right'; ctx.fillText(s.label, s.x - 12, s.y + 4); ctx.textAlign = 'left'; }
          else ctx.fillText(s.label, s.x + 12, s.y + 4);
        });
        this._stRaf = requestAnimationFrame(loop);
      };
      const wr = () => resize();
      cv.addEventListener('mousemove', mm);
      cv.addEventListener('mouseleave', ml);
      window.addEventListener('resize', wr);
      this._stRaf = requestAnimationFrame(loop);
      this._stStop = () => {
        cancelAnimationFrame(this._stRaf);
        cv.removeEventListener('mousemove', mm);
        cv.removeEventListener('mouseleave', ml);
        window.removeEventListener('resize', wr);
      };
    }

    setupPlayground() {
      if (this._pgStop) { this._pgStop(); this._pgStop = null; }
      if (this._stStop) { this._stStop(); this._stStop = null; }
      if (this._pxStop) { this._pxStop(); this._pxStop = null; }
      if (this._pgT) { clearTimeout(this._pgT); this._pgT = null; }
      if (this._stT) { clearTimeout(this._stT); this._stT = null; }
      if (this._pxT) { clearTimeout(this._pxT); this._pxT = null; }
      if (this.state.theme === 'sky') { this.initPlaneGame(); }
    }

    /* ---------- easter eggs ---------- */
    toast(msg) {
      const root = document.getElementById('ed-root');
      if (!root) return;
      const d = document.createElement('div');
      d.textContent = msg;
      d.style.cssText = 'position:fixed;left:50%;bottom:30px;transform:translateX(-50%);z-index:9995;background:var(--ink);color:var(--paper);font:700 12px var(--fc);letter-spacing:0.05em;padding:13px 22px;border:2px solid var(--ink);box-shadow:5px 5px 0 var(--acFill);white-space:normal;max-width:min(560px, calc(100vw - 48px));box-sizing:border-box;text-align:center';
      root.appendChild(d);
      setTimeout(() => d.remove(), 3400);
    }
    confetti(colors) {
      const root = document.getElementById('ed-root');
      if (!root) return;
      const cv = document.createElement('canvas');
      cv.style.cssText = 'position:fixed;inset:0;z-index:9980;pointer-events:none';
      const w = window.innerWidth, h = window.innerHeight;
      cv.width = w; cv.height = h;
      root.appendChild(cv);
      const ctx = cv.getContext('2d');
      const parts = [];
      for (let i = 0; i < 150; i++) parts.push({ x: Math.random() * w, y: -20 - Math.random() * h * 0.4, vx: (Math.random() - 0.5) * 2.4, vy: 2 + Math.random() * 3.2, s: 5 + Math.random() * 6, r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.25, c: colors[i % colors.length] });
      let f = 0;
      const loop = () => {
        f++;
        ctx.clearRect(0, 0, w, h);
        parts.forEach((p) => {
          p.x += p.vx; p.y += p.vy; p.r += p.vr;
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
          ctx.fillStyle = p.c;
          ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
          ctx.restore();
        });
        if (f < 280) requestAnimationFrame(loop); else cv.remove();
      };
      requestAnimationFrame(loop);
    }
    disco() {
      if (this._disco) return;
      this._disco = true;
      const root = document.getElementById('ed-root');
      if (root) root.style.animation = 'ts-disco 2.4s linear 2';
      this.confetti(['#c8501e', '#f4b78e', '#e9a13b', '#1c1a17']);
      this.toast('DISCO MODE UNLOCKED — a true gamer walks among us');
      setTimeout(() => { if (root) root.style.animation = ''; this._disco = false; }, 5200);
    }
    flock() {
      const root = document.getElementById('ed-root');
      if (!root) return;
      for (let i = 0; i < 9; i++) {
        const s = document.createElement('span');
        s.textContent = '➤';
        s.style.cssText = 'position:fixed;left:-70px;top:' + (8 + Math.random() * 70) + 'vh;z-index:9990;pointer-events:none;color:' + (i % 3 === 0 ? 'var(--ink)' : 'var(--ac)') + ';font-size:' + Math.round(16 + Math.random() * 22) + 'px;animation:ts-flyby ' + (2.6 + Math.random() * 2.6).toFixed(2) + 's linear ' + (Math.random() * 0.9).toFixed(2) + 's forwards';
        s.addEventListener('animationend', () => s.remove());
        root.appendChild(s);
      }
      this.toast('YOU FOUND THE FLOCK — five clicks, nine planes');
    }
    wizard() {
      if (this._wiz) return;
      this._wiz = true;
      this.toast('WIZARD MODE — sparkles for 15 seconds');
      const root = document.getElementById('ed-root');
      let last = 0;
      const cols = ['var(--ac)', 'var(--acSoft)', 'var(--mutD)'];
      const mm = (e) => {
        const now = performance.now();
        if (now - last < 28) return;
        last = now;
        const s = document.createElement('span');
        s.textContent = '✦';
        s.style.cssText = 'position:fixed;z-index:9990;pointer-events:none;left:' + (e.clientX + (Math.random() * 16 - 8)) + 'px;top:' + (e.clientY + (Math.random() * 16 - 8)) + 'px;color:' + cols[Math.floor(Math.random() * cols.length)] + ';font-size:' + Math.round(9 + Math.random() * 12) + 'px;animation:ts-spark .9s ease-out forwards';
        s.addEventListener('animationend', () => s.remove());
        if (root) root.appendChild(s);
      };
      window.addEventListener('mousemove', mm);
      this._wizMM = mm;
      setTimeout(() => { window.removeEventListener('mousemove', mm); this._wiz = false; }, 15000);
    }
    setupEggs() {
      const KON = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'].join(',');
      this._keys = [];
      this._buf = '';
      this._eggKey = (e) => {
        const tag = (e.target && e.target.tagName) || '';
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        this._keys.push(k);
        if (this._keys.length > 10) this._keys.shift();
        if (this.state.theme === 'ember' && this._keys.join(',') === KON) { this._keys = []; this.disco(); }
      };
      window.addEventListener('keydown', this._eggKey);
      try {
        console.log('%cTS.%c you found the console — this site keeps one secret per colour. the footer whispers hints.', 'font:900 26px sans-serif;color:#c8501e;', 'font:13px monospace;color:#888;padding-left:8px;');
      } catch (e) {}
    }

    componentDidMount() {
      const veil = document.getElementById('boot-veil');
      if (veil) {
        // fade out from wherever the intro animation got to, so a boot
        // that finishes mid-fade never pops
        veil.style.opacity = getComputedStyle(veil).opacity;
        veil.style.animation = 'none';
        veil.style.transition = 'opacity 0.3s ease';
        veil.getBoundingClientRect();
        veil.style.opacity = '0';
        setTimeout(() => veil.remove(), 400);
      }
      document.documentElement.classList.remove('ts-preboot-dark');
      this.applyTheme();
      this.ensureIcons();
      this._redraw = () => { if (this._raf) cancelAnimationFrame(this._raf); this._raf = requestAnimationFrame(() => this.applyTimeline()); };
      window.addEventListener('resize', this._redraw);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => this.drawTimelineLine());
      window.addEventListener('load', this._redraw);
      this._t2 = setTimeout(() => this.drawTimelineLine(), 500);
      this.setupCountUps();
      this.setupRotator();
      const motion = (this.props.motion ?? true) !== false;
      this._drawMode = motion && (this.props.journeyReveal ?? 'Fade on scroll') === 'Draw line in';
      this._lineDrawn = !this._drawMode;
      this.applyTimeline();
      this._journeyMode = (this.props.journeyReveal ?? 'Fade on scroll');
      this._motionOn = motion;
      this._theme = this.state.theme;
      this.setupEggs();
      this.setupSparkles();
      this._navDoc = (e) => {
        if (!this.state.navOpen) return;
        const nav = document.querySelector('.ts-nav');
        if (nav && !nav.contains(e.target)) this.setState({ navOpen: false });
      };
      document.addEventListener('pointerdown', this._navDoc);
      this._fontPack = this.props.fontPack || 'Theme default';
      this._heroBlurb = this.props.heroBlurb || 'Hackathon winners';
      requestAnimationFrame(() => { this.setupReveal(); this.setupPlayground(); this.setupUnderlines(); this.setupHeroType(); this.setupParallax(); });
    }
    componentDidUpdate() {
      this.applyTheme();
      this.applyTimeline();
      this.ensureIcons();
      const jm = (this.props.journeyReveal ?? 'Fade on scroll');
      const mo = (this.props.motion ?? true) !== false;
      if (jm !== this._journeyMode || mo !== this._motionOn) { this._journeyMode = jm; this._motionOn = mo; this.setupReveal(); this.setupSparkles(); }
      const fp = this.props.fontPack || 'Theme default';
      if (fp !== this._fontPack) {
        this._fontPack = fp;
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => this.drawTimelineLine());
        setTimeout(() => this.applyTimeline(), 400);
      }
      const hb = this.props.heroBlurb || 'Hackathon winners';
      if (hb !== this._heroBlurb) { this._heroBlurb = hb; this.setupHeroType(); }
      if (this.state.theme !== this._theme) {
        this._theme = this.state.theme;
        this.setupPlayground();
        this.setupSparkles();
        this.setupHeroType();
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => this.drawTimelineLine());
        setTimeout(() => this.applyTimeline(), 450);
      }
    }
    componentWillUnmount() {
      if (this._io) this._io.disconnect();
      if (this._cuio) this._cuio.disconnect();
      if (this._t1) clearTimeout(this._t1);
      if (this._t2) clearTimeout(this._t2);
      if (this._iconTimer) clearTimeout(this._iconTimer);
      if (this._redraw) { window.removeEventListener('resize', this._redraw); window.removeEventListener('load', this._redraw); }
      if (this._ioCount) this._ioCount.disconnect();
      if (this._rotT) clearTimeout(this._rotT);
      if (this._jio) this._jio.disconnect();
      if (this._eggKey) window.removeEventListener('keydown', this._eggKey);
      if (this._navDoc) document.removeEventListener('pointerdown', this._navDoc);
      if (this._wizMM) window.removeEventListener('mousemove', this._wizMM);
      if (this._pgStop) this._pgStop();
      if (this._pgT) clearTimeout(this._pgT);
      if (this._stStop) this._stStop();
      if (this._stT) clearTimeout(this._stT);
      if (this._pxStop) this._pxStop();
      if (this._pxT) clearTimeout(this._pxT);
      if (this._pipeT) clearTimeout(this._pipeT);
      if (this._paraMM) window.removeEventListener('mousemove', this._paraMM);
      if (this._sparkI) clearInterval(this._sparkI);
      if (this._heroT) clearTimeout(this._heroT);
    }

    heroBlurbs() {
      if (this._blurbs) return this._blurbs;
      this._blurbs = {
        'Hackathon winners': { pre: 'I push ', uline: 'NLP research boundaries', mid: ' by day, and build hackathon-winning software by night. Computer Science at UofT, ', typed: 'last seen getting cooked in Valorant Plat lobbies.', postPre: '', uline2: 'class of 2026', postAfter: ' - ' },
        'Side projects': { pre: 'I ship production code by day and ', uline: 'side projects', mid: ' by night ', typed: '(allegedly)...' },
        'Coffee & commits': { pre: 'I turn coffee into ', uline: 'clean commits', mid: ' and green pipelines ', typed: '(usually)...' },
        'Distributed systems': { pre: 'I wrangle ', uline: 'distributed systems', mid: ' for a living and enjoy it ', typed: '(mostly)...' },
        '3am pager': { pre: 'I build backends that ', uline: 'stay quiet at 3am', mid: ' — knock on wood ', typed: '(so far)...' },
      };
      return this._blurbs;
    }
    curBlurb() { return this.heroBlurbs()[this.props.heroBlurb ?? 'Hackathon winners'] || this.heroBlurbs()['Hackathon winners']; }
    setupHeroType() {
      if (this._heroT) { clearTimeout(this._heroT); this._heroT = null; }
      const el = document.getElementById('hero-typed');
      if (!el) return;
      const word = this.curBlurb().typed;
      if ((this.props.motion ?? true) === false) { el.textContent = word; return; }
      el.textContent = '';
      let i = 0;
      const type = () => { el.textContent = word.slice(0, i); if (i < word.length) { i++; this._heroT = setTimeout(type, 58); } };
      this._heroT = setTimeout(type, 1950);
    }

    renderVals() {
      if (!this._marquee) {
        const skills = ['Java', 'Python', 'TypeScript', 'React', 'SQL', 'Django', 'AWS', 'GCP', 'C/C++', 'Node.js', 'sklearn', 'Git', 'ms-swift', 'Hugging Face'];
        const run = skills.flatMap((s, i) => [
          React.createElement('span', { key: 's' + i, style: { font: "700 14px var(--fc)", color: 'var(--ink)', letterSpacing: '0.04em', whiteSpace: 'nowrap' } }, s),
          React.createElement('span', { key: 'd' + i, style: { width: '8px', height: '8px', flex: 'none', borderRadius: '50%', background: 'var(--acFill)' } }),
        ]);
        this._marquee = React.createElement('div', { style: { display: 'flex', gap: '28px', alignItems: 'center', width: 'max-content', animation: 'ts-marquee 26s linear infinite' } },
          React.createElement('div', { style: { display: 'flex', gap: '28px', alignItems: 'center' } }, run),
          React.createElement('div', { style: { display: 'flex', gap: '28px', alignItems: 'center' } }, run.map((el) => React.cloneElement(el, { key: 'b' + el.key })))
        );
      }
      const th = this.state.theme;
      const ring = '0 0 0 2px var(--paper), 0 0 0 4px var(--ink)';
      const play = {
        ember: { title: 'The Terminal', sub: '' },
        sky: { title: 'Flight Log', sub: 'a paper plane, some cloud gates, one button' },
      }[th] || { title: 'The Terminal', sub: '' };
      const hints = {
        ember: '↑ ↑ ↓ ↓ ← → ← → B A',
        sky: 'PSST — THE LOGO COUNTS TO FIVE',
      };
      this._typeTarget = this._typeTarget || 'the quick brown dev ships to prod on a friday and nothing breaks';
      const tgt = this._typeTarget, tv = this.state.typeVal;
      let tOk = 0;
      while (tOk < tv.length && tOk < tgt.length && tv[tOk] === tgt[tOk]) tOk++;
      let typeStat = 'READY — TYPE THE LINE ABOVE';
      if (this.state.typeStart) {
        const tEnd = this.state.typeEnd || Date.now();
        const mins = Math.max((tEnd - this.state.typeStart) / 60000, 1 / 60);
        const wpm = Math.round((tOk / 5) / mins);
        const acc = tv.length ? Math.round((tOk / tv.length) * 100) : 100;
        typeStat = (this.state.typeEnd ? 'DONE ✓ — ' : '') + wpm + ' WPM · ' + acc + '% ACC';
      }
      const PP = this.state.pipe;
      const pipeDefs = [
        { name: 'LINT', msg: 'tabs vs spaces: resolved peacefully' },
        { name: 'TEST', msg: '412 passed, 0 flaky (today)' },
        { name: 'BUILD', msg: 'tree-shaken, minified, blessed' },
        { name: 'DEPLOY', msg: 'friday, 4:58pm. no fear.' },
      ];
      const pipeRows = pipeDefs.map((d, i) => {
        let icon = '○', col = 'var(--mutD)';
        if (PP.phase === 'done' || (PP.phase === 'run' && i < PP.step)) { icon = '✓'; col = 'var(--acD)'; }
        else if (PP.phase === 'run' && i === PP.step) { icon = '▸'; col = 'var(--acSoft)'; }
        return { name: d.name, msg: d.msg, icon: icon, col: col };
      });
      return {
        pipeRows: pipeRows,
        pipeNote: PP.phase === 'run' ? 'STATUS: SHIPPING…' : PP.phase === 'done' ? 'SHIPPED ✓ — ZERO ROLLBACKS' : 'STATUS: IDLE',
        pipeBtn: PP.phase === 'run' ? 'RUNNING…' : PP.phase === 'done' ? 'SHIP AGAIN' : 'RUN PIPELINE',
        pipeRun: () => this.pipeRun(),
        pixelRandom: () => { if (this._pxAPI) this._pxAPI.random(); },
        pixelClear: () => { if (this._pxAPI) this._pxAPI.clear(); },
        typeOk: tgt.slice(0, tOk),
        typeBad: tgt.slice(tOk, Math.min(tv.length, tgt.length)),
        typeRest: tgt.slice(Math.min(Math.max(tOk, tv.length), tgt.length)),
        typeStat: typeStat,
        typeFocus: () => { const i = document.getElementById('type-in'); if (i) i.focus(); },
        typeReset: (e) => { if (e) e.stopPropagation(); this.setState({ typeVal: '', typeStart: 0, typeEnd: 0 }); const i = document.getElementById('type-in'); if (i) { i.value = ''; i.focus(); } },
        typeInput: (e) => {
          if (this.state.typeEnd) { e.target.value = this.state.typeVal; return; }
          const v = e.target.value.slice(0, this._typeTarget.length + 12);
          this.setState({ typeVal: v, typeStart: this.state.typeStart || Date.now(), typeEnd: v === this._typeTarget ? Date.now() : 0 });
        },
        marquee: this._marquee,
        blurbPre: this.curBlurb().pre,
        blurbUline: this.curBlurb().uline,
        blurbMid: this.curBlurb().mid,
        blurbPostPre: this.curBlurb().postPre || '',
        blurbUline2: this.curBlurb().uline2 || '',
        blurbPostAfter: this.curBlurb().postAfter || '',
        waveWork: this.headerWave(150, 'var(--acD)'),
        waveJourney: this.headerWave(134, 'var(--ac)'),
        wavePlay: this.headerWave(118, 'var(--ac)'),
        arrowUR: this.arrowEl(),
        darkLabel: this.state.dark ? 'LIGHT' : 'DARK',
        toggleDark: () => { const d = !this.state.dark; try { localStorage.setItem('ts-ed-dark', d ? '1' : '0'); } catch (e) {} this.setState({ dark: d }); },
        showBadge: this.props.showBadge ?? true,
        isEmber: th === 'ember',
        isSky: th === 'sky',
        ringEmber: th === 'ember' ? ring : 'none',
        ringSky: th === 'sky' ? ring : 'none',
        setEmber: () => this.setTheme('ember'),
        setSky: () => this.setTheme('sky'),
        openCarGoGit: (e) => { e.preventDefault(); e.stopPropagation(); window.open('https://github.com/tsh4fiq/CarGo', '_blank'); },
        playTitle: play.title,
        playSub: play.sub,
        eggHint: hints[th] || '',
        termLines: this.state.termLines,
        termPrompt: 'guest@tajwaar:' + (this.state.cwd || '~') + '$',
        termKey: (e) => { if (e.key !== 'Enter') return; const v = e.target.value.trim(); e.target.value = ''; this.runTerm(v); },
        termFocus: () => { const i = document.getElementById('term-in'); if (i) i.focus(); },
        logoClick: () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (this.state.theme !== 'sky') return;
          const now = Date.now();
          if (!this._lcT || now - this._lcT > 2500) this._lc = 0;
          this._lcT = now;
          this._lc = (this._lc || 0) + 1;
          if (this._lc >= 5) { this._lc = 0; this.flock(); }
        },
        navOpenClass: this.state.navOpen ? 'is-open' : '',
        burgerBars: this.burgerEl(),
        toggleNav: () => this.setState({ navOpen: !this.state.navOpen }),
        goWork: () => { this.setState({ navOpen: false }); this.scrollTo('work'); },
        goJourney: () => { this.setState({ navOpen: false }); this.scrollTo('journey'); },
        goContact: () => { this.setState({ navOpen: false }); this.scrollTo('contact'); },
      };
    }
  };
};
