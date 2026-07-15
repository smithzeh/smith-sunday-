document.addEventListener('DOMContentLoaded', function() {
  // Initialize scroll animations
  initScrollAnimations();
  
  // Mobile menu functionality
  initMobileMenu();
  
  // Smooth scroll for anchor links
  initSmoothScroll();
  
  // Form submission
  initContactForm();
});

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */

function initScrollAnimations() {
  // Fallback for browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[class*="animate-"]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.animation = getAnimationName(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[class*="animate-"]').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

function getAnimationName(element) {
  if (element.classList.contains('animate-on-scroll')) {
    return 'slideInUp 0.8s ease forwards';
  } else if (element.classList.contains('animate-left')) {
    return 'slideInLeft 0.8s ease forwards';
  } else if (element.classList.contains('animate-right')) {
    return 'slideInRight 0.8s ease forwards';
  } else if (element.classList.contains('animate-fade')) {
    return 'fadeIn 0.8s ease forwards';
  } else if (element.classList.contains('animate-scale')) {
    return 'scaleIn 0.8s ease forwards';
  }
  return 'fadeIn 0.8s ease forwards';
}

/* ========================================
   MOBILE MENU
   ======================================== */

function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });
  }
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ========================================
   CONTACT FORM
   ======================================== */

function initContactForm() {
  const form = document.querySelector('.contact-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const company = formData.get('company');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      const mailtoLink = `mailto:smithsunday10@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`)}`;
      
      window.location.href = mailtoLink;
      
      showFormSuccess(this);
    });
  }
}

function showFormSuccess(form) {
  const button = form.querySelector('button');
  const originalText = button.textContent;
  
  button.textContent = '✓ Message Sent!';
  button.style.backgroundColor = '#4CAF50';
  
  setTimeout(() => {
    button.textContent = originalText;
    button.style.backgroundColor = '';
    form.reset();
  }, 3000);
}
