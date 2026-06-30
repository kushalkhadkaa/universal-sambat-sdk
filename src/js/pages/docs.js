// Copy Code Text Helper
    function copyCodeText(btn) {
      const codeBlock = btn.closest('.code-block-container').querySelector('code');
      const text = codeBlock.innerText;
      navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        btn.style.borderColor = 'var(--success)';
        btn.style.color = 'var(--success)';
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          btn.style.color = 'var(--text-secondary)';
        }, 2000);
      });
    }

    // Scroll spy logic for active section styling in sidebar
    window.addEventListener('DOMContentLoaded', () => {
      // Theme switcher click listener
      const themeSwitcher = document.getElementById('theme-switcher-btn');
      if (themeSwitcher) {
        themeSwitcher.addEventListener('click', function() {
          document.documentElement.classList.toggle('light-theme');
          const currentTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
          localStorage.setItem('ndp-theme', currentTheme);
        });
      }

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          const sidebarLink = document.querySelector(`.sidebar-link[href="#${id}"]`);
          if (!sidebarLink) return;
          
          if (entry.intersectionRatio > 0) {
            document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
            sidebarLink.classList.add('active');
          }
        });
      }, {
        rootMargin: '-20% 0px -60% 0px'
      });

      // Track all sections that have an `id`
      document.querySelectorAll('.docs-section').forEach(section => {
        observer.observe(section);
      });
    });