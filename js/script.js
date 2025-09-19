// Launch Animation
const meterClasses = ["html", "css", "js", "cs", "java"];
const meters = document.querySelectorAll(".meter");
const circles = document.querySelectorAll(".progressbar-circle");
const startAnim = document.getElementById("startanimation");
const startImg = document.querySelector("#startanimation > img");
const favtask = document.getElementById("favtask");
const windowElem = document.querySelector(".window");
const winiconElem = document.querySelector(".winicon");
const contentElem = document.querySelector(".content");
const introElem = document.getElementById("intro");
const p1Elem = document.getElementById("p1");
const p2Elem = document.getElementById("p2");
const apElem = document.getElementById("ap");
let ticking = false;

meters.forEach((el, index) => {
  meterClasses.forEach(cls => el.classList.remove(cls));
});

circles[0].classList.remove("acfr");
circles[1].classList.remove("acen");

// Desktop version
if(window.matchMedia('(min-width: 768px)').matches){
  windowElem.style.position = "fixed";
  p1Elem.style.display = "none";
  p2Elem.style.display = "none";
  apElem.style.display = "none";
  document.querySelector(".blankspace").style.display = "block";
  document.querySelectorAll(".content > svg").forEach(svg => {svg.style.display = "none";});
  document.querySelectorAll(".taskbar a").forEach((link, i) => link.href = `#${['introbs', 'p1bs', 'p2bs', 'apbs'][i]}`);
}

const sleep = ms => new Promise(res => setTimeout(res, ms));
async function launchAnimation() {
  startImg.style.height = "125px";
  await sleep(500);
  startAnim.style.backgroundColor = "transparent";
  await sleep(300);
  startImg.style.height = "0px";
  startAnim.style.height = "0";
  await sleep(200);
  startAnim.style.display = "none";
  favtask.style.width = "38px";
  document.body.style.overflowY = "visible";
  circles[0].classList.add("acfr");
  circles[1].classList.add("acen");
  meters.forEach((el, index) => el.classList.add(meterClasses[index]));
}

document.getElementById("favtask").style.width = "0px";
requestAnimationFrame(() => {
  launchAnimation();
});

// Light/Dark mode logic
const switchBtn = document.querySelector('#themecheck');
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches; // Init with System preference

const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', initialTheme);
switchBtn.checked = initialTheme === 'dark';

switchBtn.addEventListener('change', () => {
  const newTheme = switchBtn.checked ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Achor Smooth scroll
document.querySelectorAll(".smooth-scroll").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
});

// Window animation
function setStyles(el, styles) {
  for (const prop in styles) el.style[prop] = styles[prop];
}

const elems = {window: windowElem, content: contentElem, intro: introElem, p1: p1Elem, p2: p2Elem, ap: apElem, icon: winiconElem};

const styleMap = {
  intro: {
    window: { width: "100%", height: "100%", backgroundColor: "transparent", backdropFilter: "blur(0px)", bottom: "50%" },
    content: { display: "block", height: "100%", width: "100%" },
    intro: { display: "flex", backgroundColor: "transparent" },
    p1: { display: "none" }, p2: { display: "none" }, ap: { display: "none" }, icon: { display: "none" }
  },
  hidden: {
    window: { width: "0%", height: "0%", bottom: "0%" },
    content: { display: "none" }
  },
  p1: {
    window: { width: "80%", height: "80%", bottom: "50%", backgroundColor: "var(--ui-color)" },
    content: { width: "calc(100% - 20px)", height: "calc(100% - 55px)", display: "block" },
    intro: { display: "none" }, p1: { display: "flex" }, p2: { display: "none" }, ap: { display: "none" }, icon: { display: "inline" }
  },
  p2: {
    window: { width: "80%", height: "80%", bottom: "50%", backgroundColor: "var(--ui-color)", backdropFilter: "blur(10px)" },
    content: { width: "calc(100% - 20px)", height: "calc(100% - 55px)", display: "block" },
    intro: { display: "none" }, p1: { display: "none" }, p2: { display: "flex" }, ap: { display: "none" }, icon: { display: "inline" }
  },
  ap: {
    window: { width: "100%", height: "100%", backgroundColor: "rgb(79, 108, 135)", backdropFilter: "blur(0px)", bottom: "50%" },
    content: { display: "block", height: "100%", width: "100%" },
    intro: { display: "none" }, p1: { display: "none" }, p2: { display: "none" }, ap: { display: "flex" }, icon: { display: "none" }
  }
};

let lastState = null;

function winanim() {
  const tops = [
    document.getElementById("introbs").getBoundingClientRect().top,
    document.getElementById("p1bs").getBoundingClientRect().top,
    document.getElementById("p2bs").getBoundingClientRect().top,
    document.getElementById("apbs").getBoundingClientRect().top
  ];

  let state =
    tops[0] > -80 ? "intro" :
    tops[1] > 80 ? "hidden" :
    tops[1] > -80 ? "p1" :
    tops[2] > 80 ? "hidden" :
    tops[2] > -80 ? "p2" :
    tops[3] > 80 ? "hidden" : "ap";

  if (state === lastState) return;
  lastState = state;

  // Apply styles
  const styles = styleMap[state];
  for (const key in styles) {
    setStyles(elems[key], styles[key]);
  }
}

if(window.matchMedia('(min-width: 768px)').matches){
  // Scroll opti avec requestAnimationFrame
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        winanim();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Page ScrollAssist
  const sectionIds = ["introbs", "p1bs", "p2bs", "apbs"];
  let isScrolling = false, startY = 0;

  const getCurrentIndex = () => {
    const mid = window.innerHeight / 2;
    return sectionIds.findIndex(id => {
      const r = document.getElementById(id).getBoundingClientRect();
      return r.top <= mid && r.bottom >= mid;
    });
  };

  const scrollTo = i => {
    if (i < 0 || i >= sectionIds.length) return;
    isScrolling = true;
    document.getElementById(sectionIds[i]).scrollIntoView({ behavior: "smooth" });
    setTimeout(() => isScrolling = false, 700);
  };

  window.addEventListener("wheel", e => {
    if (isScrolling || Math.abs(e.deltaY) < 4) return;
    const i = getCurrentIndex();
    scrollTo(e.deltaY > 0 ? i + 1 : i - 1);
  });

  window.addEventListener("touchstart", e => startY = e.touches[0].clientY);
  window.addEventListener("touchend", e => {
    if (isScrolling) return;
    const endY = e.changedTouches[0].clientY;
    const swipe = startY - endY;
    if (Math.abs(swipe) < 10) return;
    const i = getCurrentIndex();
    scrollTo(swipe > 0 ? i + 1 : i - 1);
  });
}

// Others Projects image hover logic
const imageMap = {
    "proj1": "assets/japkey.webp",
    "proj2": "assets/cpcapture.webp",
    "proj3": "assets/cgcapture.webp",
    "proj4": "assets/htcapture.webp",
    "proj5": "assets/rngcapture.webp"
}, projectImage = document.getElementById("projImg");

Object.keys(imageMap).forEach(projClass => {
  const link = document.querySelector(`#${projClass}`);
  if (link) {
    link.addEventListener("mouseover", () => {
      projectImage.src = imageMap[projClass];
      projectImage.style.opacity = '1';
    });
    link.addEventListener("mouseout", () => {
      projectImage.style.opacity = '0';
    });
  }
});

// Reveal effect on scroll
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;

    if (elementTop < windowHeight) {
      reveals[i].classList.remove("notshow");
    } else {
      reveals[i].classList.add("notshow");
    }
  }
}
window.addEventListener("scroll", reveal);

// Update copyright year dynamically
document.getElementById("copyright").innerHTML = "Copyright ©Léo.t88 2021 - " + new Date().getFullYear();
