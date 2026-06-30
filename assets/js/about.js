document.addEventListener('DOMContentLoaded', function() {
      // Theme switcher click listener
      const themeSwitcher = document.getElementById('theme-switcher-btn');
      if (themeSwitcher) {
        themeSwitcher.addEventListener('click', function() {
          document.documentElement.classList.toggle('light-theme');
          const currentTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
          localStorage.setItem('ndp-theme', currentTheme);
        });
      }
    });