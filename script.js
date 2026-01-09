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

  // Events Slider
  const eventsContainer = document.getElementById("events-container");
  const prevEventButton = document.getElementById("prev-event");
  const nextEventButton = document.getElementById("next-event");

  if (eventsContainer && prevEventButton && nextEventButton) {
    const eventCard = eventsContainer.querySelector(".flex-shrink-0");
    // w-96 is 24rem (384px), gap-8 is 2rem (32px)
    const eventScrollAmount = eventCard.offsetWidth + 32;

    nextEventButton.addEventListener("click", () => {
      eventsContainer.scrollBy({
        left: eventScrollAmount,
        behavior: "smooth",
      });
    });

    prevEventButton.addEventListener("click", () => {
      eventsContainer.scrollBy({
        left: -eventScrollAmount,
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
});
