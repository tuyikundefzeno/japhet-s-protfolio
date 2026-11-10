// Portfolio Interactivity Script

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'border-blue-500');
        b.classList.add('bg-slate-900/60', 'text-slate-300', 'border-slate-800');
      });

      btn.classList.add('bg-blue-600', 'text-white', 'border-blue-500');
      btn.classList.remove('bg-slate-900/60', 'text-slate-300', 'border-slate-800');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px) scale(0.98)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 200);
        }
      });
    });
  });

  // Copy to clipboard helper
  window.copyText = function(text, label) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied ${label} to clipboard!`);
      }).catch(() => {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  };

  function fallbackCopy(text, label) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied ${label} to clipboard!`);
  }

  // Toast system
  window.showToast = function(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 300);
    }, 3200);
  };

  // Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value || '';
      const email = document.getElementById('form-email')?.value || '';
      const subject = document.getElementById('form-subject')?.value || 'Inquiry from Portfolio';
      const message = document.getElementById('form-message')?.value || '';

      const mailtoUrl = `mailto:iraduhetse2003@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
      
      showToast('Opening your email client to send message to Japhete...');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);
    });
  }

  // Dynamic counter animation
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const speed = Math.max(1, Math.floor(target / 40));
          const update = () => {
            count += speed;
            if (count < target) {
              counter.innerText = count;
              requestAnimationFrame(update);
            } else {
              counter.innerText = target + (counter.getAttribute('data-suffix') || '');
            }
          };
          update();
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    countObserver.observe(statsSection);
  }
});
