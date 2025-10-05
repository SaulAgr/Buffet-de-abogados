/* ============================================
   LEXIS ADVOCATUS - PREMIUM INTERACTIONS
   Optimized & Enhanced JavaScript
   ============================================ */

   'use strict';

   // ============================================
   // UTILITY FUNCTIONS
   // ============================================
   
   const debounce = (func, wait) => {
       let timeout;
       return function executedFunction(...args) {
           const later = () => {
               clearTimeout(timeout);
               func(...args);
           };
           clearTimeout(timeout);
           timeout = setTimeout(later, wait);
       };
   };
   
   const throttle = (func, limit) => {
       let inThrottle;
       return function(...args) {
           if (!inThrottle) {
               func.apply(this, args);
               inThrottle = true;
               setTimeout(() => inThrottle = false, limit);
           }
       };
   };
   
   // ============================================
   // CURSOR PERSONALIZADO PREMIUM
   // ============================================
   
   class CustomCursor {
       constructor() {
           this.cursor = document.querySelector('.custom-cursor');
           this.cursorDot = document.querySelector('.custom-cursor-dot');
           this.mouseX = 0;
           this.mouseY = 0;
           this.cursorX = 0;
           this.cursorY = 0;
           this.dotX = 0;
           this.dotY = 0;
           
           if (window.innerWidth >= 1024 && this.cursor && this.cursorDot) {
               this.init();
           }
       }
       
       init() {
           document.addEventListener('mousemove', (e) => {
               this.mouseX = e.clientX;
               this.mouseY = e.clientY;
           });
           
           this.animate();
           this.addHoverEffects();
           this.addClickEffect();
       }
       
       animate() {
           const speed = 0.15;
           const dotSpeed = 0.25;
           
           this.cursorX += (this.mouseX - this.cursorX) * speed;
           this.cursorY += (this.mouseY - this.cursorY) * speed;
           this.dotX += (this.mouseX - this.dotX) * dotSpeed;
           this.dotY += (this.mouseY - this.dotY) * dotSpeed;
           
           this.cursor.style.left = this.cursorX + 'px';
           this.cursor.style.top = this.cursorY + 'px';
           this.cursorDot.style.left = this.dotX + 'px';
           this.cursorDot.style.top = this.dotY + 'px';
           
           requestAnimationFrame(() => this.animate());
       }
       
       addHoverEffects() {
           const hoverElements = document.querySelectorAll('a, button, .service-card, .team-member, .stat-item, input, textarea, select');
           
           hoverElements.forEach(el => {
               el.addEventListener('mouseenter', () => {
                   this.cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
                   this.cursor.style.borderColor = '#d4af37';
                   this.cursor.style.borderWidth = '3px';
               });
               
               el.addEventListener('mouseleave', () => {
                   this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                   this.cursor.style.borderWidth = '2px';
               });
           });
       }
       
       addClickEffect() {
           document.addEventListener('mousedown', () => {
               this.cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
               this.cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
           });
           
           document.addEventListener('mouseup', () => {
               this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
               this.cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
           });
       }
   }
   
   // ============================================
   // NAVEGACIÓN MEJORADA
   // ============================================
   
   class Navigation {
       constructor() {
           this.navbar = document.getElementById('navbar');
           this.hamburger = document.getElementById('hamburger');
           this.navMenu = document.getElementById('navMenu');
           this.navLinks = document.querySelectorAll('.nav-menu a');
           this.lastScroll = 0;
           
           if (this.navbar) this.init();
       }
       
       init() {
           this.setupScrollEffect();
           this.setupMobileMenu();
           this.setupSmoothScroll();
           this.setupActiveLink();
       }
       
       setupScrollEffect() {
           const handleScroll = throttle(() => {
               const currentScroll = window.pageYOffset;
               
               if (currentScroll > 100) {
                   this.navbar.classList.add('scrolled');
               } else {
                   this.navbar.classList.remove('scrolled');
               }
               
               this.lastScroll = currentScroll;
           }, 100);
           
           window.addEventListener('scroll', handleScroll);
       }
       
       setupMobileMenu() {
           if (!this.hamburger || !this.navMenu) return;
           
           this.hamburger.addEventListener('click', () => {
               this.navMenu.classList.toggle('active');
               this.hamburger.classList.toggle('active');
               document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
           });
           
           this.navLinks.forEach(link => {
               link.addEventListener('click', () => {
                   this.navMenu.classList.remove('active');
                   this.hamburger.classList.remove('active');
                   document.body.style.overflow = '';
               });
           });
       }
       
       setupSmoothScroll() {
           document.querySelectorAll('a[href^="#"]').forEach(anchor => {
               anchor.addEventListener('click', (e) => {
                   e.preventDefault();
                   const target = document.querySelector(anchor.getAttribute('href'));
                   
                   if (target) {
                       const offset = 80;
                       const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                       
                       window.scrollTo({
                           top: targetPosition,
                           behavior: 'smooth'
                       });
                   }
               });
           });
       }
       
       setupActiveLink() {
           const sections = document.querySelectorAll('section[id]');
           
           const highlightNav = throttle(() => {
               const scrollY = window.pageYOffset;
               
               sections.forEach(section => {
                   const sectionHeight = section.offsetHeight;
                   const sectionTop = section.offsetTop - 100;
                   const sectionId = section.getAttribute('id');
                   const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
                   
                   if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                       this.navLinks.forEach(link => link.classList.remove('active'));
                       navLink.classList.add('active');
                   }
               });
           }, 100);
           
           window.addEventListener('scroll', highlightNav);
       }
   }
   
   // ============================================
   // ANIMACIÓN DE CONTADORES
   // ============================================
   
   class CounterAnimation {
       constructor(element, target, duration = 2000) {
           this.element = element;
           this.target = target;
           this.duration = duration;
           this.current = 0;
           this.increment = target / (duration / 16);
           this.suffix = element.textContent.includes('%') ? '%' : '+';
       }
       
       animate() {
           const updateCounter = () => {
               this.current += this.increment;
               
               if (this.current >= this.target) {
                   this.element.textContent = this.target + this.suffix;
               } else {
                   this.element.textContent = Math.floor(this.current) + this.suffix;
                   requestAnimationFrame(updateCounter);
               }
           };
           
           updateCounter();
       }
   }
   
   // ============================================
   // INTERSECTION OBSERVER MEJORADO
   // ============================================
   
   class AnimationObserver {
       constructor() {
           this.options = {
               threshold: 0.15,
               rootMargin: '0px 0px -80px 0px'
           };
           
           this.observer = new IntersectionObserver((entries) => {
               entries.forEach((entry, index) => {
                   if (entry.isIntersecting) {
                       setTimeout(() => {
                           entry.target.classList.add('visible');
                           
                           // Animar contadores
                           if (entry.target.classList.contains('stat-item')) {
                               const number = entry.target.querySelector('.stat-number');
                               const target = parseInt(number.getAttribute('data-target'));
                               new CounterAnimation(number, target).animate();
                           }
                           
                           // Agregar animación escalonada
                           entry.target.style.transitionDelay = `${index * 0.1}s`;
                       }, index * 100);
                       
                       this.observer.unobserve(entry.target);
                   }
               });
           }, this.options);
           
           this.observe();
       }
       
       observe() {
           const elements = document.querySelectorAll(
               '.stat-item, .service-card, .team-member, .process-step, .info-item'
           );
           elements.forEach(el => this.observer.observe(el));
       }
   }
   
   // ============================================
   // SLIDER DE TESTIMONIOS PREMIUM
   // ============================================
   
   class TestimonialSlider {
       constructor() {
           this.currentIndex = 0;
           this.testimonials = document.querySelectorAll('.testimonial');
           this.dots = document.querySelectorAll('.dot');
           this.prevBtn = document.querySelector('.nav-btn.prev');
           this.nextBtn = document.querySelector('.nav-btn.next');
           this.slider = document.querySelector('.testimonials-slider');
           this.autoPlayInterval = null;
           this.autoPlayDelay = 6000;
           
           if (this.testimonials.length > 0) this.init();
       }
       
       init() {
           this.setupNavigation();
           this.setupAutoPlay();
           this.setupKeyboardNav();
           this.setupTouchSwipe();
       }
       
       show(index) {
           this.testimonials.forEach((testimonial, i) => {
               testimonial.classList.remove('active');
               this.dots[i]?.classList.remove('active');
               
               if (i === index) {
                   testimonial.style.transform = 'translateX(0) scale(1)';
                   testimonial.style.opacity = '1';
               } else if (i < index) {
                   testimonial.style.transform = 'translateX(-100px) scale(0.95)';
                   testimonial.style.opacity = '0';
               } else {
                   testimonial.style.transform = 'translateX(100px) scale(0.95)';
                   testimonial.style.opacity = '0';
               }
           });
           
           this.testimonials[index].classList.add('active');
           this.dots[index]?.classList.add('active');
           this.currentIndex = index;
       }
       
       next() {
           this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
           this.show(this.currentIndex);
       }
       
       prev() {
           this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
           this.show(this.currentIndex);
       }
       
       setupNavigation() {
           this.nextBtn?.addEventListener('click', () => {
               this.next();
               this.resetAutoPlay();
           });
           
           this.prevBtn?.addEventListener('click', () => {
               this.prev();
               this.resetAutoPlay();
           });
           
           this.dots.forEach((dot, index) => {
               dot.addEventListener('click', () => {
                   this.show(index);
                   this.resetAutoPlay();
               });
           });
       }
       
       setupAutoPlay() {
           this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
           
           if (this.slider) {
               this.slider.addEventListener('mouseenter', () => {
                   clearInterval(this.autoPlayInterval);
               });
               
               this.slider.addEventListener('mouseleave', () => {
                   this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
               });
           }
       }
       
       resetAutoPlay() {
           clearInterval(this.autoPlayInterval);
           this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
       }
       
       setupKeyboardNav() {
           document.addEventListener('keydown', (e) => {
               if (e.key === 'ArrowLeft') this.prev();
               if (e.key === 'ArrowRight') this.next();
           });
       }
       
       setupTouchSwipe() {
           if (!this.slider) return;
           
           let touchStartX = 0;
           let touchEndX = 0;
           
           this.slider.addEventListener('touchstart', (e) => {
               touchStartX = e.changedTouches[0].screenX;
           });
           
           this.slider.addEventListener('touchend', (e) => {
               touchEndX = e.changedTouches[0].screenX;
               this.handleSwipe();
           });
           
           const handleSwipe = () => {
               if (touchEndX < touchStartX - 50) this.next();
               if (touchEndX > touchStartX + 50) this.prev();
           };
           
           this.handleSwipe = handleSwipe;
       }
   }
   
   // ============================================
   // FORMULARIO DE CONTACTO MEJORADO
   // ============================================
   
   class ContactForm {
       constructor() {
           this.form = document.getElementById('contactForm');
           if (this.form) this.init();
       }
       
       init() {
           this.setupValidation();
           this.setupSubmit();
           this.setupInputEffects();
       }
       
       setupValidation() {
           const inputs = this.form.querySelectorAll('input, textarea, select');
           
           inputs.forEach(input => {
               input.addEventListener('blur', () => this.validateField(input));
               input.addEventListener('input', () => {
                   if (input.classList.contains('error')) {
                       this.validateField(input);
                   }
               });
           });
       }
       
       validateField(field) {
           const value = field.value.trim();
           let isValid = true;
           let errorMessage = '';
           
           if (field.required && !value) {
               isValid = false;
               errorMessage = 'Este campo es requerido';
           } else if (field.type === 'email' && value) {
               const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
               if (!emailRegex.test(value)) {
                   isValid = false;
                   errorMessage = 'Email inválido';
               }
           } else if (field.type === 'tel' && value) {
               const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
               if (!phoneRegex.test(value)) {
                   isValid = false;
                   errorMessage = 'Teléfono inválido';
               }
           }
           
           if (isValid) {
               field.classList.remove('error');
               this.removeErrorMessage(field);
           } else {
               field.classList.add('error');
               this.showErrorMessage(field, errorMessage);
           }
           
           return isValid;
       }
       
       showErrorMessage(field, message) {
           this.removeErrorMessage(field);
           
           const errorDiv = document.createElement('div');
           errorDiv.className = 'error-message';
           errorDiv.textContent = message;
           errorDiv.style.cssText = `
               color: #ef4444;
               font-size: 0.85rem;
               margin-top: 0.5rem;
               animation: fadeInUp 0.3s ease;
           `;
           
           field.parentElement.appendChild(errorDiv);
       }
       
       removeErrorMessage(field) {
           const existingError = field.parentElement.querySelector('.error-message');
           if (existingError) {
               existingError.remove();
           }
       }
       
       setupSubmit() {
           this.form.addEventListener('submit', async (e) => {
               e.preventDefault();
               
               // Validar todos los campos
               const inputs = this.form.querySelectorAll('input, textarea, select');
               let isValid = true;
               
               inputs.forEach(input => {
                   if (!this.validateField(input)) {
                       isValid = false;
                   }
               });
               
               if (!isValid) {
                   showNotification('Por favor, corrija los errores en el formulario', 'error');
                   return;
               }
               
               const submitBtn = this.form.querySelector('button[type="submit"]');
               const originalHTML = submitBtn.innerHTML;
               
               // Animación de envío
               submitBtn.innerHTML = '<span>Enviando...</span>';
               submitBtn.disabled = true;
               submitBtn.style.opacity = '0.7';
               
               // Simular envío (aquí conectarías con tu backend)
               await new Promise(resolve => setTimeout(resolve, 2000));
               
               submitBtn.innerHTML = '<span>✓ Enviado</span>';
               submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
               
               showNotification('¡Gracias por contactarnos! Responderemos en menos de 2 horas.', 'success');
               
               // Reset formulario
               setTimeout(() => {
                   this.form.reset();
                   submitBtn.innerHTML = originalHTML;
                   submitBtn.disabled = false;
                   submitBtn.style.opacity = '1';
                   submitBtn.style.background = '';
               }, 3000);
           });
       }
       
       setupInputEffects() {
           const formGroups = this.form.querySelectorAll('.form-group');
           
           formGroups.forEach(group => {
               const input = group.querySelector('input, textarea, select');
               
               if (input) {
                   input.addEventListener('focus', () => {
                       group.style.transform = 'scale(1.02)';
                       group.style.transition = 'transform 0.3s ease';
                   });
                   
                   input.addEventListener('blur', () => {
                       group.style.transform = 'scale(1)';
                   });
               }
           });
       }
   }
   
   // ============================================
   // SISTEMA DE NOTIFICACIONES PREMIUM
   // ============================================
   
   function showNotification(message, type = 'success') {
       const notification = document.createElement('div');
       notification.className = `notification ${type}`;
       
       const icon = type === 'success' ? '✓' : '✕';
       const bgColor = type === 'success' ? '#10b981' : '#ef4444';
       
       notification.innerHTML = `
           <div style="display: flex; align-items: center; gap: 1.2rem;">
               <div style="width: 45px; height: 45px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; flex-shrink: 0;">
                   ${icon}
               </div>
               <div style="flex: 1;">
                   <div style="font-weight: 700; margin-bottom: 0.3rem; font-size: 1.05rem;">${type === 'success' ? 'Éxito' : 'Error'}</div>
                   <div style="font-size: 0.95rem; opacity: 0.95; line-height: 1.4;">${message}</div>
               </div>
           </div>
       `;
       
       notification.style.cssText = `
           position: fixed;
           top: 100px;
           right: 30px;
           background: ${bgColor};
           color: white;
           padding: 1.5rem 2rem;
           border-radius: 16px;
           box-shadow: 0 15px 50px rgba(0,0,0,0.3);
           z-index: 10000;
           animation: slideInRight 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
           max-width: 450px;
           backdrop-filter: blur(10px);
       `;
       
       document.body.appendChild(notification);
       
       setTimeout(() => {
           notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.4, 0, 1, 1)';
           setTimeout(() => notification.remove(), 400);
       }, 4500);
   }
   
   // ============================================
   // EFECTOS DE PARALLAX MEJORADOS
   // ============================================
   
   class ParallaxEffect {
       constructor() {
           this.elements = {
               heroContent: document.querySelector('.hero-content'),
               floatingElements: document.querySelectorAll('.float-element')
           };
           this.ticking = false;
           this.scrollPos = 0;
           
           this.init();
       }
       
       init() {
           const handleScroll = () => {
               this.scrollPos = window.pageYOffset;
               
               if (!this.ticking) {
                   requestAnimationFrame(() => {
                       this.update();
                       this.ticking = false;
                   });
                   this.ticking = true;
               }
           };
           
           window.addEventListener('scroll', handleScroll, { passive: true });
       }
       
       update() {
           if (this.elements.heroContent && this.scrollPos < window.innerHeight) {
               const translateY = this.scrollPos * 0.3;
               const opacity = Math.max(0, 1 - (this.scrollPos / 800));
               
               this.elements.heroContent.style.transform = `translateY(${translateY}px)`;
               this.elements.heroContent.style.opacity = opacity;
           }
           
           this.elements.floatingElements.forEach((el, index) => {
               const speed = 0.1 + (index * 0.05);
               const translateX = this.scrollPos * speed;
               const translateY = this.scrollPos * speed * 0.8;
               
               el.style.transform = `translate(${translateX}px, ${translateY}px)`;
           });
       }
   }
   
   // ============================================
   // SCROLL TO TOP MEJORADO
   // ============================================
   
   class ScrollToTop {
       constructor() {
           this.button = document.getElementById('scrollTop');
           if (this.button) this.init();
       }
       
       init() {
           const handleScroll = throttle(() => {
               if (window.pageYOffset > 500) {
                   this.button.classList.add('visible');
               } else {
                   this.button.classList.remove('visible');
               }
           }, 100);
           
           window.addEventListener('scroll', handleScroll);
           
           this.button.addEventListener('click', () => {
               window.scrollTo({
                   top: 0,
                   behavior: 'smooth'
               });
           });
       }
   }
   
   // ============================================
   // EFECTOS ADICIONALES
   // ============================================
   
   class AdditionalEffects {
       constructor() {
           this.init();
       }
       
       init() {
           this.setupRippleEffect();
           this.setupImageReveal();
           this.setupCardHoverEffects();
           this.setupNewsletterForm();
       }
       
       setupRippleEffect() {
           const buttons = document.querySelectorAll('.btn, .nav-btn, .dot');
           
           buttons.forEach(button => {
               button.addEventListener('click', function(e) {
                   const ripple = document.createElement('span');
                   const rect = this.getBoundingClientRect();
                   const size = Math.max(rect.width, rect.height);
                   const x = e.clientX - rect.left - size / 2;
                   const y = e.clientY - rect.top - size / 2;
                   
                   ripple.style.cssText = `
                       position: absolute;
                       width: ${size}px;
                       height: ${size}px;
                       border-radius: 50%;
                       background: rgba(255, 255, 255, 0.6);
                       left: ${x}px;
                       top: ${y}px;
                       transform: scale(0);
                       animation: rippleEffect 0.6s ease-out;
                       pointer-events: none;
                       z-index: 10;
                   `;
                   
                   this.style.position = 'relative';
                   this.style.overflow = 'hidden';
                   this.appendChild(ripple);
                   
                   setTimeout(() => ripple.remove(), 600);
               });
           });
       }
       
       setupImageReveal() {
           const images = document.querySelectorAll('.service-image img, .step-icon img, .member-photo img');
           
           const imageObserver = new IntersectionObserver((entries) => {
               entries.forEach(entry => {
                   if (entry.isIntersecting) {
                       entry.target.style.opacity = '0';
                       entry.target.style.transform = 'scale(0.9)';
                       
                       setTimeout(() => {
                           entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                           entry.target.style.opacity = '1';
                           entry.target.style.transform = 'scale(1)';
                       }, 100);
                       
                       imageObserver.unobserve(entry.target);
                   }
               });
           }, { threshold: 0.3 });
           
           images.forEach(img => imageObserver.observe(img));
       }
       
       setupCardHoverEffects() {
           const serviceCards = document.querySelectorAll('.service-card');
           
           serviceCards.forEach(card => {
               card.addEventListener('mouseenter', function() {
                   if (window.innerWidth >= 768) {
                       serviceCards.forEach(otherCard => {
                           if (otherCard !== this) {
                               otherCard.style.opacity = '0.6';
                               otherCard.style.transform = 'scale(0.98)';
                           }
                       });
                   }
               });
               
               card.addEventListener('mouseleave', function() {
                   serviceCards.forEach(otherCard => {
                       otherCard.style.opacity = '1';
                       otherCard.style.transform = 'scale(1)';
                   });
               });
           });
       }
       
       setupNewsletterForm() {
           const newsletterForm = document.querySelector('.newsletter-form');
           
           if (newsletterForm) {
               newsletterForm.addEventListener('submit', (e) => {
                   e.preventDefault();
                   const input = newsletterForm.querySelector('input');
                   const email = input.value.trim();
                   
                   if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                       showNotification('¡Gracias por suscribirte! Recibirás actualizaciones legales exclusivas.', 'success');
                       input.value = '';
                   } else {
                       showNotification('Por favor, ingrese un email válido', 'error');
                   }
               });
           }
       }
   }
   
   // ============================================
   // MANEJO DE ERRORES DE IMÁGENES
   // ============================================
   
   class ImageErrorHandler {
       constructor() {
           this.init();
       }
       
       init() {
           document.addEventListener('DOMContentLoaded', () => {
               const allImages = document.querySelectorAll('img');
               
               allImages.forEach(img => {
                   img.addEventListener('error', this.handleError.bind(this));
                   img.addEventListener('load', this.handleLoad.bind(this));
                   
                   if (img.complete && img.naturalHeight === 0) {
                       img.dispatchEvent(new Event('error'));
                   }
               });
           });
       }
       
       handleError(e) {
           const img = e.target;
           img.style.display = 'none';
           
           const container = img.parentElement;
           if (container) {
               container.classList.add('image-fallback');
               
               const fallbackIcon = this.getFallbackIcon(container);
               this.createFallback(container, fallbackIcon);
           }
       }
       
       handleLoad(e) {
           const img = e.target;
           img.style.opacity = '0';
           
           setTimeout(() => {
               img.style.transition = 'opacity 0.6s ease';
               img.style.opacity = '1';
           }, 50);
       }
       
       getFallbackIcon(container) {
           const className = container.className;
           
           if (className.includes('member-photo')) return '👤';
           if (className.includes('step-icon')) return '📋';
           if (className.includes('client-info')) return '👤';
           if (className.includes('stat-icon')) return '📊';
           
           return '⚖️';
       }
       
       createFallback(container, icon) {
           if (container.querySelector('.fallback-icon')) return;
           
           const fallbackIcon = document.createElement('div');
           fallbackIcon.className = 'fallback-icon';
           fallbackIcon.textContent = icon;
           fallbackIcon.style.cssText = `
               position: absolute;
               top: 50%;
               left: 50%;
               transform: translate(-50%, -50%);
               font-size: 4rem;
               opacity: 0.5;
               color: #d4af37;
               z-index: 1;
               pointer-events: none;
               animation: pulse 2s ease-in-out infinite;
           `;
           
           container.appendChild(fallbackIcon);
       }
   }
   
   // ============================================
   // EASTER EGG
   // ============================================
   
   class EasterEgg {
       constructor() {
           this.clicks = 0;
           this.logo = document.querySelector('.logo');
           if (this.logo) this.init();
       }
       
       init() {
           this.logo.addEventListener('click', () => {
               this.clicks++;
               
               if (this.clicks === 5) {
                   showNotification('🎉 ¡Felicidades! Has desbloqueado un 20% de descuento en tu primera consulta. Código: LEXIS20', 'success');
                   this.clicks = 0;
                   
                   // Efecto especial
                   this.logo.style.animation = 'spin 1s ease-in-out';
                   setTimeout(() => {
                       this.logo.style.animation = '';
                   }, 1000);
               }
           });
       }
   }
   
   // ============================================
   // PERFORMANCE MONITORING
   // ============================================
   
   // ============================================
   // PERFORMANCE MONITORING
   // ============================================
   
   class PerformanceMonitor {
       constructor() {
           this.metrics = {
               images: 0,
               scripts: 0,
               styles: 0
           };
           
           if ('performance' in window) {
               this.init();
           }
       }
       
       init() {
           window.addEventListener('load', () => {
               const perfData = performance.getEntriesByType('resource');
               
               perfData.forEach(entry => {
                   if (entry.name.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
                       this.metrics.images++;
                   } else if (entry.name.match(/\.(js)$/i)) {
                       this.metrics.scripts++;
                   } else if (entry.name.match(/\.(css)$/i)) {
                       this.metrics.styles++;
                   }
               });
               
               this.logPerformance();
           });
       }
       
       logPerformance() {
           console.log('%c⚡ Performance Metrics', 'color: #d4af37; font-size: 16px; font-weight: bold;');
           console.log(`📸 Images loaded: ${this.metrics.images}`);
           console.log(`📜 Scripts loaded: ${this.metrics.scripts}`);
           console.log(`🎨 Stylesheets loaded: ${this.metrics.styles}`);
           
           if (performance.timing) {
               const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
               console.log(`⏱️ Page load time: ${(loadTime / 1000).toFixed(2)}s`);
           }
       }
   }
   
   // ============================================
   // AGREGAR ANIMACIONES CSS DINÁMICAS
   // ============================================
   
   const addDynamicStyles = () => {
       const style = document.createElement('style');
       style.textContent = `
           @keyframes slideInRight {
               from {
                   transform: translateX(500px);
                   opacity: 0;
               }
               to {
                   transform: translateX(0);
                   opacity: 1;
               }
           }
           
           @keyframes slideOutRight {
               from {
                   transform: translateX(0);
                   opacity: 1;
               }
               to {
                   transform: translateX(500px);
                   opacity: 0;
               }
           }
           
           @keyframes rippleEffect {
               to {
                   transform: scale(4);
                   opacity: 0;
               }
           }
           
           @keyframes pulse {
               0%, 100% { 
                   opacity: 0.4; 
                   transform: translate(-50%, -50%) scale(1); 
               }
               50% { 
                   opacity: 0.8; 
                   transform: translate(-50%, -50%) scale(1.1); 
               }
           }
           
           @keyframes spin {
               from { transform: rotate(0deg); }
               to { transform: rotate(360deg); }
           }
           
           .image-fallback {
               display: flex !important;
               align-items: center;
               justify-content: center;
               background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(10, 14, 39, 0.1)) !important;
               position: relative;
               min-height: 100px;
           }
           
           input.error,
           textarea.error,
           select.error {
               border-color: #ef4444 !important;
               animation: shake 0.3s ease;
           }
           
           @keyframes shake {
               0%, 100% { transform: translateX(0); }
               25% { transform: translateX(-10px); }
               75% { transform: translateX(10px); }
           }
           
           .nav-menu a.active {
               color: #d4af37;
           }
           
           .nav-menu a.active::before {
               width: 100%;
           }
       `;
       document.head.appendChild(style);
   };
   
   // ============================================
   // INICIALIZACIÓN PRINCIPAL
   // ============================================
   
   class App {
       constructor() {
           this.components = {};
           this.init();
       }
       
       init() {
           // Esperar a que el DOM esté listo
           if (document.readyState === 'loading') {
               document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
           } else {
               this.initializeComponents();
           }
       }
       
       initializeComponents() {
           // Agregar estilos dinámicos
           addDynamicStyles();
           
           // Inicializar componentes
           this.components.cursor = new CustomCursor();
           this.components.navigation = new Navigation();
           this.components.animationObserver = new AnimationObserver();
           this.components.testimonialSlider = new TestimonialSlider();
           this.components.contactForm = new ContactForm();
           this.components.parallax = new ParallaxEffect();
           this.components.scrollToTop = new ScrollToTop();
           this.components.additionalEffects = new AdditionalEffects();
           this.components.imageErrorHandler = new ImageErrorHandler();
           this.components.easterEgg = new EasterEgg();
           this.components.performanceMonitor = new PerformanceMonitor();
           
           // Log de bienvenida
           this.logWelcome();
           
           // Verificar funcionalidades
           this.checkFunctionality();
       }
       
       logWelcome() {
           console.log('%c✨ Lexis Advocatus', 'color: #d4af37; font-size: 32px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
           console.log('%c🏛️ Excelencia Legal Premium', 'color: #0a0e27; font-size: 16px; font-weight: 600;');
           console.log('%c💼 Desarrollado con las últimas tecnologías', 'color: #64748b; font-size: 12px;');
           console.log('%c📧 contacto@lexisadvocatus.com', 'color: #d4af37; font-size: 12px; font-style: italic;');
       }
       
       checkFunctionality() {
           const checks = {
               navbar: !!document.getElementById('navbar'),
               hamburger: !!document.getElementById('hamburger'),
               navMenu: !!document.getElementById('navMenu'),
               contactForm: !!document.getElementById('contactForm'),
               scrollTop: !!document.getElementById('scrollTop'),
               testimonials: document.querySelectorAll('.testimonial').length > 0,
               images: document.querySelectorAll('img').length > 0,
               animations: document.querySelectorAll('.stat-item, .service-card, .team-member, .process-step').length > 0,
               cursor: window.innerWidth >= 1024
           };
           
           const allWorking = Object.values(checks).every(check => check === true);
           
           if (allWorking) {
               console.log('%c✅ Todos los sistemas operativos', 'color: #10b981; font-size: 14px; font-weight: bold;');
           } else {
               console.log('%c⚠️ Algunos componentes pueden no estar disponibles', 'color: #f59e0b; font-size: 14px; font-weight: bold;');
               console.table(checks);
           }
           
           // Verificar soporte de navegador
           this.checkBrowserSupport();
       }
       
       checkBrowserSupport() {
           const features = {
               IntersectionObserver: 'IntersectionObserver' in window,
               requestAnimationFrame: 'requestAnimationFrame' in window,
               cssGrid: CSS.supports('display', 'grid'),
               cssBackdropFilter: CSS.supports('backdrop-filter', 'blur(10px)'),
               flexbox: CSS.supports('display', 'flex'),
               customProperties: CSS.supports('--test', '0')
           };
           
           const unsupported = Object.keys(features).filter(key => !features[key]);
           
           if (unsupported.length > 0) {
               console.warn('⚠️ Características no soportadas:', unsupported.join(', '));
           } else {
               console.log('✅ Navegador totalmente compatible');
           }
       }
   }
   
   // ============================================
   // INICIAR APLICACIÓN
   // ============================================
   
   const app = new App();
   
   // ============================================
   // EXPORTS PARA USO EXTERNO
   // ============================================
   
   window.LexisAdvocatus = {
       showNotification,
       app,
       version: '2.0.0',
       build: 'premium-optimized'
   };
   
   // ============================================
   // MANEJO DE ERRORES GLOBAL
   // ============================================
   
   window.addEventListener('error', (e) => {
       console.error('Error detectado:', e.message);
   });
   
   window.addEventListener('unhandledrejection', (e) => {
       console.error('Promise rechazada:', e.reason);
   });
   
   // ============================================
   // DETECTAR REDUCCIÓN DE MOVIMIENTO
   // ============================================
   
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
   
   if (prefersReducedMotion.matches) {
       document.documentElement.style.setProperty('--transition-fast', 'none');
       document.documentElement.style.setProperty('--transition-base', 'none');
       document.documentElement.style.setProperty('--transition-slow', 'none');
       
       const style = document.createElement('style');
       style.textContent = `
           * {
               animation-duration: 0.01ms !important;
               animation-iteration-count: 1 !important;
               transition-duration: 0.01ms !important;
           }
       `;
       document.head.appendChild(style);
       
       console.log('♿ Modo reducción de movimiento activado');
   }