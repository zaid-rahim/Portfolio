/* =====================================================================
   main.js — rendering + animation system
   Renders data-driven collections from PORTFOLIO (data.js) and wires the
   entrance, scroll-reveal, hover, and ambient animation system.
   All motion respects prefers-reduced-motion.
   ===================================================================== */
(function () {
  "use strict";

  const P = window.PORTFOLIO;
  const staticMode = document.documentElement.classList.contains("static-mode");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches || staticMode;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------------- Icon set (inline SVG, stroke = currentColor) ------- */
  const I = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z"/></svg>',
    hf: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a9 9 0 0 0-9 9c0 1.5.4 2.9 1 4.2-.3.4-.5 1-.5 1.5a2.3 2.3 0 0 0 3.4 2 9 9 0 0 0 10.2 0 2.3 2.3 0 0 0 3.4-2c0-.5-.2-1.1-.5-1.5.6-1.3 1-2.7 1-4.2a9 9 0 0 0-9-9Zm-3.4 8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Zm6.8 0a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM8 15.3c.9.9 2.4 1.5 4 1.5s3.1-.6 4-1.5c.3-.3-.1-.7-.5-.5-1 .5-2.2.8-3.5.8s-2.5-.3-3.5-.8c-.4-.2-.8.2-.5.5Z"/></svg>',
    arrowUR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    arrowDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
    repo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 2 10 5-10 5L2 7l10-5Z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></svg>',
    model: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="M12 7.5v4M10.5 13 6.5 16M13.5 13l4 3"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  };

  /* ---------------- Focus visualizations (lightweight SVG) ------------- */
  const VIZ = {
    // Attention: token row with attention arcs
    attention: `<svg viewBox="0 0 220 90" fill="none" aria-hidden="true">
      <g stroke="currentColor" stroke-width="1" opacity="0.35">
        <path class="vz-arc" d="M30 62 Q60 20 90 62"/>
        <path class="vz-arc" d="M30 62 Q75 12 120 62"/>
        <path class="vz-arc" d="M90 62 Q120 22 150 62"/>
        <path class="vz-arc" d="M60 62 Q120 8 180 62"/>
        <path class="vz-arc" d="M120 62 Q150 24 180 62"/>
      </g>
      <g>
        ${[30, 60, 90, 120, 150, 180].map((x, i) => `<rect x="${x - 9}" y="62" width="18" height="14" rx="3" fill="currentColor" opacity="${i === 3 ? "0.9" : "0.25"}" class="${i === 3 ? "vz-pulse" : ""}"/>`).join("")}
      </g>
    </svg>`,

    // RAG: query -> vector store -> LLM with a traveling token
    rag: `<svg viewBox="0 0 220 90" fill="none" stroke="currentColor" aria-hidden="true">
      <rect x="6" y="34" width="34" height="22" rx="4" stroke-width="1.3" opacity="0.7"/>
      <text x="23" y="49" font-size="8" fill="currentColor" stroke="none" text-anchor="middle" opacity="0.8">query</text>
      <path d="M40 45 H70" stroke-width="1.2" opacity="0.4" stroke-dasharray="3 3"/>
      <g opacity="0.75" stroke-width="1.3">
        <ellipse cx="92" cy="34" rx="22" ry="6"/>
        <path d="M70 34 v22 a22 6 0 0 0 44 0 v-22"/>
        <path d="M70 45 a22 6 0 0 0 44 0"/>
      </g>
      <path d="M114 45 H146" stroke-width="1.2" opacity="0.4" stroke-dasharray="3 3"/>
      <rect x="146" y="30" width="30" height="30" rx="6" stroke-width="1.3" opacity="0.7"/>
      <text x="161" y="49" font-size="8" fill="currentColor" stroke="none" text-anchor="middle" opacity="0.8">LLM</text>
      <path d="M176 45 H208" stroke-width="1.2" opacity="0.4"/>
      <circle class="vz-travel" cx="0" cy="45" r="3" fill="currentColor" stroke="none"/>
    </svg>`,

    // Fine-tuning: frozen base + low-rank adapters (A x B)
    finetune: `<svg viewBox="0 0 220 90" fill="none" aria-hidden="true">
      <g opacity="0.3" fill="currentColor">
        ${Array.from({ length: 4 }).map((_, r) => Array.from({ length: 4 }).map((_, c) => `<rect x="${20 + c * 16}" y="${18 + r * 16}" width="12" height="12" rx="2"/>`).join("")).join("")}
      </g>
      <text x="42" y="88" font-size="7.5" fill="currentColor" text-anchor="middle" opacity="0.5">frozen · 4-bit</text>
      <g stroke="currentColor" stroke-width="1.2" opacity="0.85">
        <path d="M96 45 H120" stroke-dasharray="2 2"/>
        <rect x="122" y="30" width="14" height="30" rx="2" fill="currentColor" opacity="0.55" class="vz-pulse"/>
        <rect x="142" y="38" width="30" height="14" rx="2" fill="currentColor" opacity="0.55" class="vz-pulse"/>
        <path d="M178 45 h16" />
        <circle cx="200" cy="45" r="5"/>
        <path d="M197 45 h6 M200 42 v6"/>
      </g>
      <text x="150" y="80" font-size="7.5" fill="currentColor" text-anchor="middle" opacity="0.7" stroke="none">LoRA A·B</text>
    </svg>`,

    // Embedding space: scattered points, a cluster highlighted
    embed: `<svg viewBox="0 0 220 90" fill="none" aria-hidden="true">
      <path d="M20 8 V78 H210" stroke="currentColor" stroke-width="1" opacity="0.25"/>
      <g fill="currentColor">
        ${[[60, 24], [70, 34], [55, 40], [66, 46], [150, 60], [162, 66], [156, 52], [172, 58], [110, 20], [40, 66], [190, 30]].map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="${i < 4 ? 3.4 : 2.6}" opacity="${i < 4 ? 0.9 : 0.35}" class="${i === 1 ? "vz-pulse" : ""}"/>`).join("")}
      </g>
      <circle cx="63" cy="36" r="18" stroke="currentColor" stroke-width="1" opacity="0.3" fill="none" class="vz-ring"/>
    </svg>`,

    // Neural net: 3 layers of nodes with edges
    neural: `<svg viewBox="0 0 220 90" fill="none" aria-hidden="true">
      <g stroke="currentColor" stroke-width="0.8" opacity="0.25">
        ${[22, 45, 68].map((y1) => [30, 52, 74].map((y2) => `<path d="M40 ${y1} H110" />`).join("")).join("")}
        ${[22, 33, 45, 57, 68].map((y1) => `<path d="M40 45 L110 ${y1}"/>`).join("")}
        ${[22, 33, 45, 57, 68].map((y1) => `<path d="M110 ${y1} L180 33"/><path d="M110 ${y1} L180 57"/>`).join("")}
      </g>
      <g fill="currentColor">
        ${[22, 45, 68].map((y) => `<circle cx="40" cy="${y}" r="4" opacity="0.8"/>`).join("")}
        ${[22, 33, 45, 57, 68].map((y, i) => `<circle cx="110" cy="${y}" r="4" opacity="0.5" class="${i === 2 ? "vz-pulse" : ""}"/>`).join("")}
        ${[33, 57].map((y) => `<circle cx="180" cy="${y}" r="4" opacity="0.8"/>`).join("")}
      </g>
    </svg>`,

    // Pipeline: stages with flowing dot
    pipeline: `<svg viewBox="0 0 220 90" fill="none" aria-hidden="true">
      <g stroke="currentColor">
        <path d="M10 45 H210" stroke-width="1.2" opacity="0.25"/>
        ${[30, 80, 130, 180].map((x, i) => `<rect x="${x - 16}" y="34" width="32" height="22" rx="4" stroke-width="1.3" opacity="0.7"/>`).join("")}
      </g>
      <g fill="currentColor" stroke="none" opacity="0.6" font-size="7" text-anchor="middle">
        <text x="30" y="49">data</text><text x="80" y="49">API</text><text x="130" y="49">model</text><text x="180" y="49">serve</text>
      </g>
      <circle class="vz-travel-p" cx="0" cy="45" r="3.2" fill="currentColor"/>
    </svg>`,
  };

  /* ---------------- Renderers ---------------------------------------- */
  function renderHeroStats() {
    const m = $("#hero-stats");
    if (!m) return;
    m.innerHTML = P.hero.stats.map((s) => `
      <div class="stat"><div class="v">${esc(s.value)}</div><div class="l">${esc(s.label)}</div></div>
    `).join("");
  }

  function renderFocus() {
    const m = $("#focus-mount");
    if (!m) return;
    m.innerHTML = P.focus.map((f) => `
      <article class="focus-card reveal">
        <div class="focus-head"><span class="no">${esc(f.no)}</span></div>
        <div class="focus-viz">${VIZ[f.viz] || ""}</div>
        <h3>${esc(f.title)}</h3>
        <p>${esc(f.body)}</p>
        <div class="focus-tags">${f.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
      </article>
    `).join("");
  }

  function renderProjects() {
    const m = $("#projects-mount");
    if (!m) return;
    m.innerHTML = P.projects.map((p, idx) => {
      const links = [];
      if (p.links.code) links.push(`<a class="link-arrow" href="${p.links.code}" target="_blank" rel="noopener noreferrer">Code ${I.arrowUR}</a>`);
      if (p.links.model) links.push(`<a class="link-arrow" href="${p.links.model}" target="_blank" rel="noopener noreferrer">Model ${I.arrowUR}</a>`);
      if (p.links.demo) links.push(`<a class="link-arrow" href="${p.links.demo}" target="_blank" rel="noopener noreferrer">Demo ${I.arrowUR}</a>`);
      return `
      <article class="project reveal" data-idx="${idx}">
        <div class="project-top">
          <div class="project-meta">
            <span class="project-no">${esc(p.no)}</span>
            <span class="project-year">${esc(p.year)}</span>
            <span class="project-cat">${esc(p.category)}</span>
          </div>
        </div>
        <h3 class="project-title">${esc(p.name)}</h3>
        <p class="project-summary">${esc(p.summary)}</p>
        <div class="project-foot">
          <div class="project-stack">${p.stack.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
          <div class="project-actions">
            ${links.join("")}
            <button class="project-toggle" aria-expanded="false" aria-controls="detail-${idx}"><span class="txt">Case study</span> <span class="plus" aria-hidden="true"></span></button>
          </div>
        </div>
        <div class="project-detail" id="detail-${idx}">
          <div class="project-detail-inner">
            <div class="detail-grid">
              <div class="detail-block">
                <div class="detail-label">The problem</div>
                <p>${esc(p.problem)}</p>
              </div>
              <div class="detail-block">
                <div class="detail-label">What I built</div>
                <ul class="detail-list">${p.built.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
              </div>
            </div>
          </div>
        </div>
      </article>`;
    }).join("");

    // Expand / collapse
    $$(".project-toggle", m).forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".project");
        const open = card.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(open));
        btn.querySelector(".txt").textContent = open ? "Close" : "Case study";
      });
    });
  }

  function renderGithub() {
    const dist = $("#gh-dist");
    if (dist) {
      const max = Math.max(...P.github.domains.map((d) => d.count));
      dist.innerHTML = P.github.domains.map((d) => `
        <div class="dist-row">
          <div class="dist-top"><span class="dist-label">${esc(d.label)}</span><span class="dist-count">${d.count} repos</span></div>
          <div class="dist-bar"><span class="dist-fill" data-w="${Math.round((d.count / max) * 100)}"></span></div>
        </div>`).join("");
    }
    const repos = $("#gh-repos");
    if (repos) {
      repos.innerHTML = P.github.more.map((r) => `
        <a class="repo" href="${r.url}" target="_blank" rel="noopener noreferrer">
          <div class="repo-main">
            <div class="repo-name">${I.repo}<span>${esc(r.name)}</span></div>
            <div class="repo-desc">${esc(r.desc)}</div>
          </div>
          <span class="repo-lang">${esc(r.lang)}</span>
          <span class="arr">${I.arrowUR}</span>
        </a>`).join("");
    }
  }

  function renderExperience() {
    const tl = $("#xp-timeline");
    if (tl) {
      tl.innerHTML = P.experience.map((x) => `
        <div class="tl-item">
          <div class="tl-period">${esc(x.period)}</div>
          <div class="tl-role">${esc(x.role)}</div>
          <div class="tl-org">${esc(x.org)} · <span class="place">${esc(x.place)}</span></div>
          <ul class="tl-points">${x.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>
        </div>`).join("");
    }
    const side = $("#xp-side");
    if (side) {
      const edu = P.education.map((e) => `
        <div class="edu-item">
          <div class="edu-degree">${esc(e.degree)}</div>
          <div class="edu-org">${esc(e.org)}, ${esc(e.place)}</div>
          <div class="edu-period">${esc(e.period)}</div>
        </div>`).join("");
      const certs = P.credentials.certifications.map((c) => `<li>${I.check}<span>${esc(c)}</span></li>`).join("");
      side.innerHTML = `
        <div class="side-card reveal">
          <div class="sc-label">Education</div>
          ${edu}
        </div>
        <div class="side-card reveal">
          <div class="sc-label">Certifications</div>
          <ul class="cert-list">${certs}</ul>
        </div>
        <div class="side-card reveal">
          <div class="sc-label">Leadership</div>
          <p class="lead-note">${esc(P.credentials.leadership)}</p>
        </div>`;
    }
  }

  function renderSkills() {
    const m = $("#skills-mount");
    if (!m) return;
    m.innerHTML = P.skills.map((g, i) => `
      <div class="skill-group reveal">
        <div class="sg-head"><span class="sg-no">${String(i + 1).padStart(2, "0")}</span><h3>${esc(g.group)}</h3></div>
        <div class="skill-tags">${g.items.map((it) => `<span class="chip">${esc(it)}</span>`).join("")}</div>
      </div>`).join("");
  }

  function renderMobileMenu() {
    const m = $("#mobile-menu-mount");
    if (!m) return;
    const links = [
      ["#focus", "Focus"], ["#work", "Work"], ["#github", "GitHub"],
      ["#experience", "Experience"], ["#about", "About"], ["#contact", "Contact"],
    ];
    m.innerHTML = links.map((l, i) => `<a href="${l[0]}"><span class="idx">0${i + 1}</span>${l[1]}</a>`).join("") +
      `<div class="mm-foot">
        <a href="${P.identity.links.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="${P.identity.links.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:${P.identity.email}">Email</a>
      </div>`;
  }

  /* ---------------- Animations & interactions ------------------------ */
  function revealAllNow() {
    $$(".reveal").forEach((e) => e.classList.add("visible"));
    $$(".section").forEach((e) => {
      e.classList.add("in");
      $$(".dist-fill", e).forEach((f) => { f.style.width = f.dataset.w + "%"; });
    });
    $$(".tl-item").forEach((e) => e.classList.add("visible"));
  }

  function setupReveal() {
    // Fail-safe: static mode or no IntersectionObserver → show everything now.
    if (document.documentElement.classList.contains("force-reveal") || !("IntersectionObserver" in window)) {
      revealAllNow();
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          if (e.target.classList.contains("dist-bar-wrap") || e.target.id === "github") {}
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    $$(".reveal").forEach((el, i) => {
      // subtle stagger for siblings in a grid
      const sib = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
      el.style.transitionDelay = (Math.min(sib, 6) * 70) + "ms";
      io.observe(el);
    });

    // timeline dots
    const tlio = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); tlio.unobserve(e.target); } });
    }, { threshold: 0.4 });
    $$(".tl-item").forEach((el) => tlio.observe(el));

    // section eyebrow rule + fill bars
    const secio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          $$(".dist-fill", e.target).forEach((f) => { f.style.width = f.dataset.w + "%"; });
          secio.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    $$(".section").forEach((el) => secio.observe(el));
  }

  function setupNav() {
    const nav = $("#nav");
    const sections = $$("section[id]");
    const links = $$(".nav-links a");
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle("scrolled", y > 30);
      // hide on scroll down, show on scroll up (past hero)
      if (y > 400 && y > lastY) nav.classList.add("hidden");
      else nav.classList.remove("hidden");
      lastY = y;
      // progress
      const h = document.documentElement.scrollHeight - window.innerHeight;
      $("#progress").style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      $("#back-top").classList.toggle("show", y > 600);
      // active link
      let current = "";
      sections.forEach((s) => { if (y >= s.offsetTop - 120) current = s.id; });
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Mobile menu
    const ham = $("#hamburger");
    const menu = $("#mobile-menu");
    const toggle = (open) => {
      ham.classList.toggle("open", open);
      menu.classList.toggle("open", open);
      ham.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("no-scroll", open);
    };
    ham.addEventListener("click", () => toggle(!menu.classList.contains("open")));
    $$("#mobile-menu a").forEach((a) => a.addEventListener("click", () => toggle(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggle(false); });

    // smooth anchor scroll
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const t = $(id);
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }); }
      });
    });
  }

  function setupCursorGlow() {
    if (reduceMotion || window.matchMedia("(hover: none)").matches) return;
    const g = $("#cursor-glow");
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    const loop = () => {
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
      g.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(loop) : null;
    };
    window.addEventListener("mousemove", (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
  }

  function setupParticles() {
    const canvas = $("#particles");
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext("2d");
    let w, h, dpr, particles = [], raf = null, running = true;
    const COUNT = () => Math.min(64, Math.round(window.innerWidth / 22));

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    }
    function init() {
      particles = Array.from({ length: COUNT() }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12 * dpr, vy: (Math.random() - 0.5) * 0.12 * dpr,
        r: (Math.random() * 1.3 + 0.4) * dpr, a: Math.random() * 0.4 + 0.15,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(227,160,102,${p.a})`;
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(draw);
    }
    resize(); init(); draw();
    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { resize(); init(); }, 200); });
    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running && !raf) { raf = requestAnimationFrame(draw); }
      else if (!running && raf) { cancelAnimationFrame(raf); raf = null; }
    });
  }

  function setupContactForm() {
    const form = $("#contact-form");
    if (!form) return;
    const cfg = P.contact.emailjs;
    let emailReady = false;
    if (window.emailjs && cfg.publicKey) {
      try { window.emailjs.init(cfg.publicKey); emailReady = true; } catch (e) { emailReady = false; }
    }
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = $("#form-submit", form);
      const status = $("#form-status");
      status.className = "form-status";
      if (!emailReady || !window.emailjs) {
        status.className = "form-status err";
        status.textContent = "Form unavailable right now — please email " + P.identity.email + " directly.";
        return;
      }
      const original = btn.innerHTML;
      btn.disabled = true; btn.innerHTML = "Sending…";
      try {
        await window.emailjs.send(cfg.serviceId, cfg.templateId, {
          from_name: $("#f-name").value,
          from_email: $("#f-email").value,
          subject: $("#f-subject").value || "Portfolio contact",
          message: $("#f-message").value,
          to_name: P.identity.name,
        });
        status.className = "form-status ok";
        status.textContent = "Thanks — your message is on its way. I'll get back to you soon.";
        form.reset();
        btn.innerHTML = "Sent ✓";
        setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 3500);
      } catch (err) {
        status.className = "form-status err";
        status.textContent = "Something went wrong — please email " + P.identity.email + " directly.";
        btn.innerHTML = original; btn.disabled = false;
      }
    });
  }

  function injectIcons() {
    $$("[data-icon]").forEach((el) => { const k = el.getAttribute("data-icon"); if (I[k]) el.innerHTML = I[k]; });
  }

  function setHeroStagger() {
    // Set entrance stagger delays; the inline bootstrap adds .ready to play them.
    const lines = $$(".hero-title .line > span");
    lines.forEach((l, i) => { l.style.transitionDelay = (0.15 + i * 0.11) + "s"; });
    const ups = $$(".hero .anim-up");
    ups.forEach((u, i) => { u.style.transitionDelay = (0.2 + lines.length * 0.11 + i * 0.09) + "s"; });
  }

  /* ---------------- Boot -------------------------------------------- */
  function boot() {
    renderHeroStats();
    renderFocus();
    renderProjects();
    renderGithub();
    renderExperience();
    renderSkills();
    renderMobileMenu();
    injectIcons();
    setupReveal();
    setupNav();
    setupCursorGlow();
    setupParticles();
    setupContactForm();
    setHeroStagger();
    // QA/static preview only (?static): collapse the 100svh hero so full-page
    // captures aren't dominated by viewport-height spacing. No effect in prod.
    if (staticMode) { const hs = $("#hero"); if (hs) hs.style.minHeight = "auto"; }
    // main.js is alive → cancel the inline crash-guard reveal net.
    if (window.__revealNet) { clearTimeout(window.__revealNet); window.__revealNet = null; }
    const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
