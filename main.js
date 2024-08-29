import "./style.css";
import "./webgl";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "gsap/all";
import SplitType from "split-type";

const lenis = new Lenis();

const raf = (time) => {
  lenis.raf(time);
  requestAnimationFrame(raf);
};

requestAnimationFrame(raf);

///////////////////////////////////////////////////////

const mm = gsap.matchMedia();
gsap.registerPlugin(ScrollTrigger);

const preloadFincra = () => {
  const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });

  tl.to("#easer", {
    scale: 1.5,
    duration: 0.5,
    yoyo: true,
    ease: "power1.inOut",
    transformOrigin: "center",
    repeat: -1,
  });

  window.addEventListener("load", () => {
    tl.to("#easer", {
      scale: 100,
      delay: 2,
      duration: 1,
      transformOrigin: "center",
      onComplete: () => {
        document.querySelector("#preloader").classList.add("ease");
      },
    });

    mm.add("(max-width: 480px)", () => {
      tl.to("#hero", {
        y: "10%",
        borderRadius: "20px",
        width: "85%",
        height: "100vh",
        duration: 2,
      })
        .to(
          "#preloader",
          {
            opacity: 0,
            duration: 0.5,
          },
          "-=1"
        )
        .to("#preloader", {
          visibility: "hidden",
          duration: 0.5,
          // onComplete: () => tl.pause()
        })
        .from("#hero #content > div, #hero #content > h4", {
          y: -50,
          opacity: 0,
          stagger: 0.5,
          duration: 0.5,
        });

      ScrollTrigger.create({
        onUpdate: (self) => {
          productHero.style.top = `${27 + self.progress * 170}%`;
        },
      });
    }).add("(min-width: 480px)", () => {
      tl.to("#hero", {
        y: "10%",
        borderRadius: "20px",
        width: "95%",
        height: "100vh",
        duration: 2,
      })
        .to(
          "#preloader",
          {
            opacity: 0,
            duration: 0.5,
          },
          "-=1"
        )
        .to("#preloader", {
          visibility: "hidden",
          duration: 0.5,
          // onComplete: () => tl.pause()
        })
        .from("#hero #content > div, #hero #content > h4", {
          y: -50,
          opacity: 0,
          stagger: 0.5,
          duration: 0.5,
        });

      ScrollTrigger.create({
        onUpdate: (self) => {
          productHero.style.top = `${48 + self.progress * 170}%`;
        },
      });
    });
  });

  const isChrome = navigator.userAgent.indexOf("Chrome") !== -1;
  const isSafari = navigator.userAgent.indexOf("Safari") !== -1;

  if (!(isChrome && isSafari)) {
    if (isSafari) {
      document.body.classList.add("safari");
      console.log("is Safari");
    }
  }
};

preloadFincra();

const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");
const navdropdown = document.getElementById("burger-dd");
const ddlinks = document.querySelectorAll(".dd-link");

const tl = gsap.timeline({ paused: true });

tl.from(ddlinks, {
  y: 150,
  height: "auto",
  opacity: 0,
  stagger: 0.05,
  duration: 0.5,
  delay: 0.5,
});

// TEXT SPLIT HOVER HAVIMATION

gsap.to(".fade-in", {
  opacity: 0,
  duration: 0.5,
});

const targetElementsForSplits = document.querySelectorAll(".hover-split");

targetElementsForSplits.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    const splitText = new SplitType(button, { type: "chars, words" });
    gsap.from(splitText.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.02,
      duration: 0.5,
      ease: "back.out",
    });
  });
});

const targetTextElsForFadeUp = document.querySelectorAll(
  ".split-text-slide-up"
);

targetTextElsForFadeUp.forEach((el, i) => {
  const splitText = new SplitType(el, { type: "chars, words" });
  gsap.from(splitText.words, {
    scrollTrigger: {
      trigger: el,
      start: "top 60%",
      end: "top bottom",
      toggleActions: "restart none none none",
    },
    y: "100",
    stagger: 0.1,
    opacity: 0,
    ease: "back.out",
    duration: 0.5,
  });
});

const productHero = document.getElementById("product-hero");

let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;
  scrollTop > lastScrollTop
    ? navbar.classList.add("hidden")
    : navbar.classList.remove("hidden");
  lastScrollTop = scrollTop;
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("fold");
  navdropdown.classList.toggle("show");

  if (hamburger.classList.contains("fold")) {
    tl.timeScale(1).play();
  } else {
    tl.timeScale(4).reverse();
  }
});

const videoPlayer = document.getElementById("video-player");
const items = document.querySelectorAll(".item");

items.forEach((item, index) => {
  ScrollTrigger.create({
    trigger: item,
    start: "top 30%",
    end: "bottom center",
    onEnter: () => {
      const videoSrc = item.getAttribute("data-video");
      videoPlayer.setAttribute("src", videoSrc);
      videoPlayer.play();
    },
    onEnterBack: () => {
      const videoSrc = item.getAttribute("data-video");
      videoPlayer.setAttribute("src", videoSrc);
      videoPlayer.play();
    },
  });
});

ScrollTrigger.create({
  trigger: ".vid-content-container",
  start: "top top",
  end: "bottom bottom",
  pin: "#video-container",
});

const learnBtns = document.querySelectorAll(".alt-animate-hover");

learnBtns.forEach((button) => {
  const arrowHold = button.querySelector(".arrow-hold");
  const arrowSvg = button.querySelector(".arrow-hold > svg");

  const learnBtnTl = gsap.timeline({ paused: true });

  learnBtnTl
    .to(arrowHold, {
      x: -2,
    })
    .to(
      arrowSvg,
      {
        x: 8,
        strokeWidth: "1.5px",
        opacity: 1,
        duration: 0.3,
      },
      "<"
    );

  button.addEventListener("mouseenter", () => learnBtnTl.play());
  button.addEventListener("mouseleave", () => learnBtnTl.reverse());
});

// earth map animaion

gsap.to("[clip-path='url(#__lottie_element_11)']", {
  x: "-=1367",
  duration: 6.5,
  repeat: -1,
  ease: "none",
});

// why-fincra

gsap.from("#why-fincra .tease", {
  scrollTrigger: {
    trigger: "#why-fincra",
    start: "top 20%",
    end: "top bottom",
    toggleActions: "restart none none none",
  },
  x: 100,
  stagger: 0.4,
  opacity: 0,
  ease: "back.out",
  duration: 1,
});
