// lenis import
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

///////////////////////////////////////////////////////

const mm = gsap.matchMedia();

mm.add("(max-width: 480px)", () => {
  gsap.to("#hero", {
    y: "10%",
    borderRadius: "20px",
    width: "85%",
    height: "100vh",
    duration: 2,
    delay: 2,
    ease: "power1.inOut",
  });
}).add("(min-width: 480px)", () => {
  gsap.to("#hero", {
    y: "10%",
    borderRadius: "20px",
    width: "95%",
    height: "100vh",
    duration: 2,
    delay: 2,
    ease: "power1.inOut",
  });
});

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
  delay: 0.5
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

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("fold");
  navbar.classList.toggle("sticky");
  navdropdown.classList.toggle("show");

  if (hamburger.classList.contains("fold")) {
    tl.timeScale(1).play();
  } else {
    tl.timeScale(4).reverse();
  }
});

gsap.registerPlugin(gsap.ScrollTrigger);

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

// brand news carousel

const carousel = document.querySelector(".carousel");


// startCarousel();

