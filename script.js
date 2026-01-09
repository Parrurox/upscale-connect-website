document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu
  const body = document.body;
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const closeIcon = document.getElementById('closeIcon');
  const menuOverlay = document.getElementById('menu-overlay');

  const toggleMenu = () => {
    const isOpen = body.classList.toggle('menu-open');

    menuToggleBtn.setAttribute('aria-expanded', isOpen);
    hamburgerIcon.classList.toggle('hidden', isOpen);
    closeIcon.classList.toggle('hidden', !isOpen);
  };

  menuToggleBtn.addEventListener('click', toggleMenu);
  menuOverlay.addEventListener('click', toggleMenu);

  // Intersection Observer for scroll animations
  const fadeElements = document.querySelectorAll(".fade-in");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '50px'
    }
  );

  fadeElements.forEach((element) => {
    fadeObserver.observe(element);
  });

  // Testimonial Slider
  const testimonialsContainer = document.getElementById(
    "testimonials-container"
  );
  const prevButton = document.getElementById("prev-testimonial");
  const nextButton = document.getElementById("next-testimonial");

  if (testimonialsContainer && prevButton && nextButton) {
    const testimonial = testimonialsContainer.querySelector(".flex-shrink-0");
    const testimonialWidth = testimonial.offsetWidth;
    // Tailwind's space-x-8 is 2rem (32px)
    const scrollAmount = testimonialWidth + 32;

    nextButton.addEventListener("click", () => {
      testimonialsContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    prevButton.addEventListener("click", () => {
      testimonialsContainer.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });
  }

  // Number Count-Up Animation
  const countUpObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.target);
          const decimalData = el.dataset.target.split('.')[1];
          const precision = decimalData ? decimalData.replace('%', '').length : 0;
          const duration = 2000; // 2 seconds
          let startTimestamp = null;

          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min(
              (timestamp - startTimestamp) / duration,
              1
            );
            const current = progress * target;
            el.innerText = current.toFixed(precision);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              // Ensure final number is exact and add plus if needed
              el.innerText =
                target.toFixed(precision) + (el.dataset.target.includes("%") ? "%" : "");
            }
          };

          window.requestAnimationFrame(step);
          observer.unobserve(el); // Animate only once
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".count-up").forEach((el) => {
    countUpObserver.observe(el);
  });

  // Setup Expert and Partner Modals
  function setupModal(modalId, openBtnId, closeBtnId, scrollId) {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = document.getElementById(closeBtnId);
    const scrollContainer = document.getElementById(scrollId);
    const body = document.body;

    if (!modal || !openBtn || !closeBtn) return;

    openBtn.addEventListener('click', () => {

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      body.classList.add('no-scroll');

      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
      }
    });

    const closeModal = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      body.classList.remove('no-scroll');
      modal.querySelector('form').reset();
    };

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  setupModal('expertModal', 'openExpertModalBtn', 'closeExpertModalBtn', 'expertScrollContainer');
  setupModal('partnerModal', 'openPartnerModalBtn', 'closePartnerModalBtn', 'partnerScrollContainer');

  // Experts Carousel
  const expertsCarousel = document.getElementById('expertsCarousel');
  const expertsCarouselPrevBtn = document.getElementById('expertsCarouselPrevBtn');
  const expertsCarouselNextBtn = document.getElementById('expertsCarouselNextBtn');

  let autoPlayInterval;

  const moveCarousel = (direction) => {
    const scrollAmount = expertsCarousel.clientWidth;
    const isAtEnd = expertsCarousel.scrollLeft + expertsCarousel.clientWidth >= expertsCarousel.scrollWidth - 50;

    if (direction === 1 && isAtEnd) {
      expertsCarousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      expertsCarousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  expertsCarouselPrevBtn.addEventListener('click', () => moveCarousel(-1));
  expertsCarouselNextBtn.addEventListener('click', () => moveCarousel(1));

  const startAutoPlay = () => {
    autoPlayInterval = setInterval(() => moveCarousel(1), 5000);
  };

  const stopAutoPlay = () => clearInterval(autoPlayInterval);

  startAutoPlay();
  expertsCarousel.addEventListener('mouseenter', stopAutoPlay);
  expertsCarousel.addEventListener('mouseleave', startAutoPlay);
});
