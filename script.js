(function () {
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const yearEl = document.getElementById('year');
  const form = document.querySelector('.contact-form');
  const formStatus = document.getElementById('formStatus');

  // 年份
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 主题初始化
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    html.setAttribute('data-theme', saved === 'light' ? 'light' : '');
    updateThemeIcon(saved);
  } else {
    // 跟随系统，仅在浅色时显式设置
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (prefersLight) html.setAttribute('data-theme', 'light');
    updateThemeIcon(prefersLight ? 'light' : 'dark');
  }

  // 主题切换
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = html.getAttribute('data-theme') === 'light';
      if (isLight) {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
      } else {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
      }
    });
  }

  function updateThemeIcon(mode) {
    if (!themeToggle) return;
    themeToggle.textContent = mode === 'light' ? '☀️' : '🌙';
  }

  // 滚动进入视口动效
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // 表单提交（演示用，本地提示成功）
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('name');
      // 这里可接入实际后端或第三方服务
      formStatus.textContent = '已收到，感谢你的来信，' + (name || '朋友') + '！';
      form.reset();
    });
  }
})();


