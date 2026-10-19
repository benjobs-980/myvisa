// MyVisa JavaScript
function openCountry(countryCode, visaType = 'study') {
  window.location.href = `country-details.html?country=${countryCode}&type=${visaType}`;
}

function setActiveNavLink() {
  const navItems = document.querySelectorAll('.nav-links a');
  if (!navItems.length) return;

  const currentPage = window.location.pathname.split('/').pop().toLowerCase();

  navItems.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) {
      link.classList.remove('active');
      return;
    }

    const targetPage = href.split('?')[0].split('/').pop().toLowerCase();
    const isActive = targetPage === currentPage;
    link.classList.toggle('active', isActive);
  });
}

setActiveNavLink();

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// FAQ accordion: keep only one answer open at a time
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  if (!button || !answer) return;

  const syncFAQState = () => {
    const isOpen = item.classList.contains('active');
    button.setAttribute('aria-expanded', String(isOpen));
    answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : '0px';
  };

  button.addEventListener('click', () => {
    const shouldOpen = !item.classList.contains('active');

    faqItems.forEach((faqItem) => {
      faqItem.classList.remove('active');
      const faqButton = faqItem.querySelector('.faq-question');
      const faqAnswer = faqItem.querySelector('.faq-answer');

      if (faqButton) {
        faqButton.setAttribute('aria-expanded', 'false');
      }

      if (faqAnswer) {
        faqAnswer.style.maxHeight = '0px';
      }
    });

    if (shouldOpen) {
      item.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });

  syncFAQState();
});

