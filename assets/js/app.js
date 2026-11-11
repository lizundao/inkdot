/**
 * 墨点 inkdot · 通用交互
 * - 主题切换（跟随系统 + 记忆）
 * - 数据驱动渲染：承诺 / 精选 / 工具网格 / 页脚
 * - FAQ 折叠、返回顶部、当前导航高亮
 */
(function () {
  "use strict";

  var D = window.INKDOT || {};
  var apps = D.apps || [];
  var site = D.site || {};

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var ICON = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M4 21h16"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>'
  };

  /* ---------- 主题 ---------- */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
  }
  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem("inkdot-theme"); } catch (e) {}
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(stored || (prefersDark ? "dark" : "light"));
    var btn = $("#theme-toggle");
    if (btn) {
      btn.setAttribute("aria-label", "切换主题");
      btn.addEventListener("click", function () {
        var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        try { localStorage.setItem("inkdot-theme", next); } catch (e) {}
      });
    }
  }

  /* ---------- 渲染：五条承诺 ---------- */
  function renderPromises() {
    var box = $("#promise-list");
    if (!box || !(D.promises || []).length) return;
    box.innerHTML = D.promises.map(function (p) {
      return '<li><span class="promise-tag">' + esc(p.tag) + '</span>' +
             '<span class="promise-text">' + esc(p.text) + '</span></li>';
    }).join("");
  }

  /* ---------- 渲染：精选工具 ---------- */
  function renderFeatured() {
    var box = $("#featured-slot");
    if (!box) return;
    var app = apps.filter(function (a) { return a.featured && a.status === "live"; })[0]
            || apps.filter(function (a) { return a.status === "live"; })[0];
    if (!app) { box.innerHTML = ""; return; }
    box.innerHTML =
      '<a class="featured" href="' + esc(app.url) + '">' +
        '<div class="featured-media">' +
          '<span class="featured-badge">✦ 精选推荐</span>' +
          '<img src="' + esc(app.cover) + '" alt="' + esc(app.name) + ' 界面预览" loading="lazy">' +
        '</div>' +
        '<div class="featured-body">' +
          '<div class="featured-head">' +
            '<div class="featured-icon"><img src="' + esc(app.icon) + '" alt="" loading="lazy"></div>' +
            '<div><h3 class="featured-name">' + esc(app.name) + '</h3>' +
            '<p class="featured-tagline">' + esc(app.tagline) + '</p></div>' +
          '</div>' +
          '<p class="featured-desc">' + esc(app.description) + '</p>' +
          '<div class="tag-row">' + (app.tags || []).map(function (t) {
            return '<span class="tag">' + esc(t) + '</span>';
          }).join("") + '</div>' +
          '<div class="featured-foot">' +
            '<span class="version">版本 v' + esc(app.version) + ' · 更新于 ' + esc(app.updated) + '</span>' +
            '<span class="app-card-link">查看工具 ' + ICON.arrow + '</span>' +
          '</div>' +
        '</div>' +
      '</a>';
  }

  /* ---------- 渲染：工具网格 ---------- */
  function appCard(a) {
    return '<a class="app-card" href="' + esc(a.url) + '">' +
        '<div class="app-card-top">' +
          '<div class="app-card-icon"><img src="' + esc(a.icon) + '" alt="" loading="lazy"></div>' +
          '<div><h3 class="app-card-name">' + esc(a.name) + '</h3>' +
          '<div class="app-card-ver">v' + esc(a.version) + '</div></div>' +
        '</div>' +
        '<p class="app-card-sum">' + esc(a.summary) + '</p>' +
        '<div class="app-card-tags">' + (a.tags || []).slice(0, 4).map(function (t) {
          return '<span class="tag">' + esc(t) + '</span>';
        }).join("") + '</div>' +
        '<div class="app-card-foot">' +
          '<span class="app-card-link">查看详情 ' + ICON.arrow + '</span>' +
          '<span class="version">' + esc((a.platforms || []).join(" · ")) + '</span>' +
        '</div>' +
      '</a>';
  }
  function soonCard(title) {
    return '<div class="app-card soon">' +
        '<div class="app-card-top">' +
          '<div class="app-card-icon"><span class="soon-glyph">墨</span></div>' +
          '<div><h3 class="app-card-name">' + esc(title) + '</h3>' +
          '<div class="app-card-ver">即将上线</div></div>' +
        '</div>' +
        '<p class="app-card-sum">正在打磨中，完善后会尽快上架。欢迎通过页脚反馈你想要的工具。</p>' +
        '<div class="app-card-foot"><span class="soon-pill">COMING SOON</span></div>' +
      '</div>';
  }
  function renderGrid() {
    var box = $("#app-grid");
    if (!box) return;
    var live = apps.filter(function (a) { return a.status === "live"; });
    var html = live.map(appCard).join("");
    // 补足到至少 3 张卡，保持版面平衡；占位卡不列具体工具名，避免数量口径矛盾
    var total = Math.max(3, live.length);
    var placeholders = ["更多工具，正在路上", "下一个，会是什么？"];
    for (var i = live.length; i < total; i++) {
      html += soonCard(placeholders[(i - live.length) % placeholders.length]);
    }
    box.innerHTML = html;
    var count = $("#app-count");
    if (count) count.textContent = "共 " + live.length + " 款已上架，持续更新中";
  }

  /* ---------- 渲染：页脚 ---------- */
  function renderFooter() {
    var main = $("#footer-brand");
    if (main && site.name) {
      main.innerHTML =
        '<img src="assets/img/inkdot.png" alt="' + esc(site.name) + '">' +
        '<div><div class="footer-brand-name">' + esc(site.name) + '</div>' +
        '<div class="footer-brand-slogan">' + esc(site.slogan) + '</div></div>';
    }
    var bottom = $("#footer-bottom-inner");
    if (bottom && site.name) {
      bottom.innerHTML =
        '<span>© ' + esc(site.year) + ' ' + esc(site.name) + '</span>' +
        '<span>' + (site.icp ? '<a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">' + esc(site.icp) + '</a>' : '') + '</span>';
    }
    $all("[data-email-link]").forEach(function (el) { el.href = "mailto:" + site.email; });
    $all("[data-author-link]").forEach(function (el) { el.href = site.authorUrl; });
  }

  /* ---------- 详情页：下载区（数据驱动） ---------- */
  function currentApp() {
    var body = document.body;
    var id = body.getAttribute("data-app-id");
    return id ? apps.filter(function (a) { return a.id === id; })[0] : null;
  }
  function osGlyph(os) {
    return /mac/i.test(os) ? "MAC" : /win/i.test(os) ? "WIN" : "DL";
  }
  function renderDownloads() {
    var box = $("#download-grid");
    var app = currentApp();
    if (!box || !app || !(app.downloads || []).length) return; // 保留静态兜底
    box.innerHTML = app.downloads.map(function (d) {
      return '<a class="download-card" href="' + esc(d.url) + '" target="_blank" rel="noopener noreferrer">' +
          '<span class="dl-icon">' + esc(osGlyph(d.os)) + '</span>' +
          '<span class="dl-body"><div class="dl-label">' + esc(d.label) + '</div>' +
          '<div class="dl-note">' + esc(d.note) + '</div></span>' +
          '<span class="dl-arrow">' + ICON.download + '</span>' +
        '</a>';
    }).join("");
  }

  /* ---------- FAQ 折叠 + 数据驱动 ---------- */
  function renderFaq() {
    var box = $("#faq-list");
    var app = currentApp();
    if (!box || !app || !(app.faq || []).length) return; // 保留静态兜底
    box.innerHTML = app.faq.map(function (item) {
      return '<div class="faq-item">' +
          '<button class="faq-q" aria-expanded="false"><span class="q-mark">Q</span>' + esc(item.q) + '<span class="plus">+</span></button>' +
          '<div class="faq-a"><div class="faq-a-inner">' + esc(item.a) + '</div></div>' +
        '</div>';
    }).join("");
  }
  function initFaq() {
    $all(".faq-q").forEach(function (q) {
      q.addEventListener("click", function () {
        var item = q.closest(".faq-item");
        var open = item.classList.toggle("open");
        q.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  /* ---------- 当前导航高亮 ---------- */
  function initNavActive() {
    var path = location.pathname;
    $all(".nav-link").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href && href !== "/" && path.indexOf(href.replace(/^\//, "")) >= 0) a.classList.add("active");
      if (href === "/" && (path === "/" || /index\.html$/.test(path)) && !$(".nav-link.active")) a.classList.add("active");
    });
  }

  function init() {
    initTheme();
    renderPromises();
    renderFeatured();
    renderGrid();
    renderDownloads();
    renderFaq();
    renderFooter();
    initFaq();
    initNavActive();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
