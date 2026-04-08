/*menu show Y Hidden */
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* MENU SHOW */
/* validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* MENU HIDDEN */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/* REMOVE MENU MOBILE */
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/* ACCORDION SKILLS OPEN/CLOSE */
const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function animateSkillsOnce(content) {
  if (content.dataset.animated === "true") {
    return;
  }

  content.dataset.animated = "true";

  requestAnimationFrame(() => {
    content.classList.add("skills__animated");
  });
}

function toggleSkills() {
  const content = this.parentNode;
  const wasClosed = content.classList.contains("skills__close");

  for (let i = 0; i < skillsContent.length; i += 1) {
    skillsContent[i].className = "skills__content skills__close";

    if (skillsContent[i].dataset.animated === "true") {
      skillsContent[i].classList.add("skills__animated");
    }
  }

  if (wasClosed) {
    content.className = "skills__content skills__open";

    if (content.dataset.animated === "true") {
      content.classList.add("skills__animated");
    }

    animateSkillsOnce(content);
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*activate services modal OPEN/CLOSE */

const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});
modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/* PORTFOLIO SWIPER JS */
const portfolioContainers = document.querySelectorAll(".portfolio__container");

portfolioContainers.forEach((container) => {
  new Swiper(container, {
    cssMode: true,
    loop: true,
    navigation: {
      nextEl: container.querySelector(".swiper-button-next"),
      prevEl: container.querySelector(".swiper-button-prev"),
    },
    pagination: {
      el: container.querySelector(".swiper-pagination"),
      clickable: true,
    },
    mousewheel: true,
    keyboard: true,
  });
});

/* PORTFOLIO TABS */
const portfolioTabs = document.querySelectorAll("[data-portfolio-target]");
const portfolioPanels = document.querySelectorAll("[data-portfolio-content]");

portfolioTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.portfolioTarget;

    portfolioTabs.forEach((item) => {
      item.classList.remove("portfolio__tab--active");
    });

    portfolioPanels.forEach((panel) => {
      const isActive = panel.dataset.portfolioContent === target;
      panel.classList.toggle("portfolio__panel--active", isActive);

      if (isActive) {
        const swiper = panel.querySelector(".portfolio__container")?.swiper;

        if (swiper) {
          setTimeout(() => swiper.update(), 0);
        }

        if (window.ScrollTrigger) {
          setTimeout(() => ScrollTrigger.refresh(), 50);
        }
      }
    });

    tab.classList.add("portfolio__tab--active");
  });
});

/*testimonial */
let swiperTestimonial = new Swiper(".testimonial__container", {
  loop: true,
  grabCursor: true,
  spaceBetween: 48,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
  mousewheel: true,
  keyboard: true,
});

/*SCROLL SECTION */
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/* CHANGE BACKGROUND HEADER  menito ka ke skrolnas 80px na dole da dobii boxshadow */
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL TOP  da se prikaze scroll to TOP====================*/
function scrollTop() {
  const scrollTop = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

/*DARK THEME */
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// Current theme
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";

const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// -------- DEFAULT DARK MODE --------
if (!selectedTheme) {
  document.body.classList.add(darkTheme);
  themeButton.classList.add(iconTheme);
  localStorage.setItem("selected-theme", "dark");
  localStorage.setItem("selected-icon", "uil-moon");
}

// -------- LOAD SAVED THEME --------
if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme);
}

// -------- BUTTON TOGGLE --------
themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});


function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  document.getElementById("body").style.overflowY = "hidden";
}

function closeModal() {
  console.log("modal closed");
  document.getElementById("body").style.overflow = "unset";
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initThreeHero() {
  if (
    prefersReducedMotion() ||
    typeof THREE === "undefined" ||
    !window.WebGLRenderingContext
  ) {
    return;
  }

  const canvas = document.getElementById("home-canvas");
  const section = document.getElementById("home");

  if (!canvas || !section) {
    return;
  }

  try {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const group = new THREE.Group();
    scene.add(group);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
    const pointLight = new THREE.PointLight(0x7c5cff, 2.2, 30);
    pointLight.position.set(3, 2, 6);
    const rimLight = new THREE.PointLight(0x00d9ff, 1.4, 30);
    rimLight.position.set(-4, -2, 4);
    scene.add(ambientLight, pointLight, rimLight);

    const orbGeometry = new THREE.IcosahedronGeometry(1.8, 12);
    const orbMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a6bff,
      emissive: 0x25124b,
      roughness: 0.28,
      metalness: 0.35,
      transparent: true,
      opacity: 0.8,
    });
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);

    const wireframe = new THREE.LineSegments(
      new THREE.EdgesGeometry(orbGeometry),
      new THREE.LineBasicMaterial({
        color: 0xbbaeff,
        transparent: true,
        opacity: 0.22,
      })
    );

    group.add(orb);
    group.add(wireframe);

    const particlesCount = 900;
    const positions = new Float32Array(particlesCount * 3);
    const scales = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i += 1) {
      const i3 = i * 3;
      const radius = 3.6 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      scales[i] = Math.random();
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "aScale",
      new THREE.BufferAttribute(scales, 1)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xa08cff,
      size: 0.028,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const pointer = { x: 0, y: 0 };
    const clock = new THREE.Clock();

    function setRendererSize() {
      const { width, height } = section.getBoundingClientRect();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function updatePointer(event) {
      const rect = section.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    }

    function animate() {
      const elapsed = clock.getElapsedTime();

      orb.rotation.x = elapsed * 0.18;
      orb.rotation.y = elapsed * 0.28;
      wireframe.rotation.x = elapsed * -0.14;
      wireframe.rotation.y = elapsed * 0.2;

      group.rotation.x += (pointer.y * 0.2 - group.rotation.x) * 0.04;
      group.rotation.y += (pointer.x * 0.35 - group.rotation.y) * 0.04;
      group.position.x += (pointer.x * 0.35 - group.position.x) * 0.03;
      group.position.y += (pointer.y * 0.2 - group.position.y) * 0.03;

      particles.rotation.y = elapsed * 0.03;
      particles.rotation.x = elapsed * 0.02;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    setRendererSize();
    window.addEventListener("resize", setRendererSize);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    animate();
  } catch (error) {
    console.warn("Three.js hero animation disabled:", error);
  }
}

function initGsapAnimations() {
  if (
    prefersReducedMotion() ||
    typeof gsap === "undefined" ||
    typeof ScrollTrigger === "undefined"
  ) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".header", {
    yPercent: -120,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTimeline
    .from(".home__social-icon", {
      y: 24,
      opacity: 0,
      stagger: 0.08,
      duration: 0.7,
    })
    .from(
      ".home__blob",
      {
        scale: 0.72,
        rotate: -14,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      },
      "-=0.4"
    )
    .from(
      ".home__title, .home__subtitle, .home__description, .home__data .button",
      {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.85,
      },
      "-=0.8"
    )
    .from(
      ".home__scroll",
      {
        y: 16,
        opacity: 0,
        duration: 0.6,
      },
      "-=0.45"
    );

  gsap.to(".home__glow--one", {
    yPercent: -12,
    xPercent: 6,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".home__glow--two", {
    yPercent: 10,
    xPercent: -6,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.utils.toArray(".section").forEach((section) => {
    const title = section.querySelector(".section__title");
    const subtitle = section.querySelector(".section__subtitle");

    if (title) {
      gsap.from(title, {
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
        },
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }

    if (subtitle) {
      gsap.from(subtitle, {
        scrollTrigger: {
          trigger: section,
          start: "top 74%",
        },
        y: 24,
        opacity: 0,
        duration: 0.75,
        delay: 0.08,
        ease: "power2.out",
      });
    }
  });

  const groupedAnimations = [
    ".about__data",
    ".skills__content",
    ".qualification__data",
    ".services__content",
    ".portfolio__content",
    ".contact__information",
    ".contact__form",
    ".project__data",
    ".project__img",
  ];

  groupedAnimations.forEach((selector) => {
    gsap.utils.toArray(selector).forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 84%",
        },
        y: 50,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        delay: index % 3 === 0 ? 0 : 0.06,
        ease: "power3.out",
      });
    });
  });

  const rocketTimeline = gsap.timeline({
    repeat: -1,
    yoyo: true,
    defaults: {
      ease: "sine.inOut",
    },
  });

  rocketTimeline
    .to(".project__img", {
      y: -18,
      x: 8,
      rotate: 7,
      duration: 2.2,
    })
    .to(
      ".project__img",
      {
        y: -6,
        x: -6,
        rotate: 2,
        duration: 1.8,
      },
      ">"
    );

  gsap.to(".project__img", {
    scrollTrigger: {
      trigger: ".project",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
    },
    yPercent: -18,
    xPercent: 6,
    rotate: 10,
    ease: "none",
  });

  gsap.utils.toArray(".services__content, .portfolio__content").forEach((card) => {
    const depthTarget =
      card.querySelector(".portfolio__img") || card.querySelector(".services__title");

    const move = (x, y) => {
      gsap.to(card, {
        rotateY: x * 8,
        rotateX: y * -8,
        y: -6,
        transformPerspective: 900,
        transformOrigin: "center",
        duration: 0.45,
        ease: "power3.out",
      });

      if (depthTarget) {
        gsap.to(depthTarget, {
          x: x * 10,
          y: y * 10,
          z: 24,
          duration: 0.45,
          ease: "power3.out",
        });
      }
    };

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      move(x, y);
    });

    card.addEventListener("pointerleave", () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
      });

      if (depthTarget) {
        gsap.to(depthTarget, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.55,
          ease: "power3.out",
        });
      }
    });
  });
}

initThreeHero();
initGsapAnimations();
