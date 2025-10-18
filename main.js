/* main.js — comportamiento del sitio */
(function(){
  'use strict';

  // Header scroll class
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if(window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.querySelector('.nav-list');
  if(navToggle){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      if(navList) navList.style.display = expanded ? 'none' : 'flex';
    });
  }

  // Intersection Observer for fade-in
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

  // Accessible accordion (services)
  document.querySelectorAll('.service-accordion-header').forEach(headerEl => {
    headerEl.addEventListener('click', toggleAccordion);
    headerEl.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleAccordion.call(headerEl); }
    });
  });

  function toggleAccordion(){
    const item = this.parentElement;
    const content = item.querySelector('.service-accordion-content');
    const wasActive = item.classList.contains('active');

    // close all
    document.querySelectorAll('.service-accordion-item').forEach(i => {
      i.classList.remove('active');
      const c = i.querySelector('.service-accordion-content');
      const h = i.querySelector('.service-accordion-header');
      if(c) c.hidden = true;
      if(h) h.setAttribute('aria-expanded','false');
    });

    // open if previously closed
    if(!wasActive){
      item.classList.add('active');
      if(content) content.hidden = false;
      this.setAttribute('aria-expanded','true');
      this.focus();
    }
  }

  // Load particles.js conditionally (not on small devices)
  function loadParticlesIfNeeded(){
    const isSmall = window.matchMedia('(max-width:800px)').matches;
    if(isSmall) return; // skip to save CPU/bandwidth

    // dynamic import via CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.async = true;
    script.onload = () => {
      if(typeof particlesJS !== 'undefined'){
        particlesJS('particles-js', {
          particles: {
            number: { value: 36, density: { enable: true, value_area: 700 } },
            color: { value: "#c8a25f" },
            shape: { type: "circle" },
            opacity: { value: 0.28, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 140, color: "#c8a25f", opacity: 0.14, width: 1 },
            move: { enable: true, speed: 1.6, random: true, straight: false, out_mode: "out", bounce: false }
          },
          interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true }
          }
        });
      }
    };
    document.body.appendChild(script);
  }

  // Start
  document.addEventListener('DOMContentLoaded', loadParticlesIfNeeded);
})();

