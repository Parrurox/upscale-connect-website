document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer for scroll animations
  const fadeElements = document.querySelectorAll(".fade-in-section");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.05, // Trigger when 15% of element is visible
      rootMargin: "0px 0px -50px 0px", // Start animation slightly before element enters viewport
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
});
