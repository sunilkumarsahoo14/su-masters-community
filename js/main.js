/**
 * SU Masters Collective
 * Client-side Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Total live visitor counter
  const countElement = document.getElementById('visitorCount');
  if (countElement) {
    countElement.textContent = '0';

    const namespace = 'sunil-kumar-sahoos-team-5569';
    const key = 'masters-community';
    const apiKey = 'ut_1oiOcViaXBgRJj39z1tlExjdIajH673xfhu0LEex';

    const renderCount = (value) => {
      const safeValue = Number(value ?? 0);
      countElement.textContent = Number.isFinite(safeValue) ? safeValue.toLocaleString() : 'Active';
    };

    if (!apiKey || apiKey === 'ut_1oiOcViaXBgRJj39z1tlExjdIajH673xfhu0LEex') {
      countElement.textContent = 'Active';
    } else {
      fetch(`https://api.counterapi.dev/v2/${namespace}/${key}/up`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + apiKey,
          Accept: 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Visitor counter request failed: ' + response.status);
          }
          return response.json();
        })
        .then((data) => {
          renderCount(data?.data?.up_count ?? data?.up_count ?? data?.count ?? 0);
        })
        .catch(() => {
          countElement.textContent = 'Active';
        });
    }
  }

  // 3. Mobile Hamburger Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking any nav item
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 4. Smooth In-Page Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    });
  });


  // 5. Scroll Reveal Intersection Observer
  const revealElements = document.querySelectorAll('.resource-card, .memory-card, .channel-callout-card, .contribute-box');
  
  revealElements.forEach((el) => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Animates once smoothly
      }
    });
  }, {
    threshold: 0.15,
  });

  revealElements.forEach((el) => revealObserver.observe(el));
});