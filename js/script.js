// Launch Animation
const startAnim = document.getElementById("startanimation");
const startImg = document.querySelector("#startanimation > img");
const favtask = document.getElementById("favtask");
const elems = {
  window: document.querySelector(".window"),
  content: document.querySelector(".content"),
  intro: document.getElementById("intro"),
  p1: document.getElementById("p1"),
  p2: document.getElementById("p2"),
  ap: document.getElementById("ap")
};

let ticking = false;

// Desktop version
if(window.matchMedia('(min-width: 768px)').matches){
  setStyles(elems.window, { position : "fixed" });
  setStyles(elems.p1, { display : "none" });
  setStyles(elems.content, { overflowY : "hidden" });
  document.querySelector(".winicon").style.display = "block";
  document.querySelector(".blankspace").style.display = "block";
  document.querySelectorAll(".content > svg").forEach(svg => {svg.style.display = "none";});
  document.querySelectorAll(".taskbar a").forEach((link, i) => link.href = `#${['introbs', 'p1bs', 'p2bs', 'apbs'][i]}`);
  
  // Others Projects image hover logic
  const imageMap = {
    "proj1": Object.assign(new Image(), { src: "assets/trcapture.webp" }),
    "proj2": Object.assign(new Image(), { src: "assets/japkey.webp" }),
    "proj3": Object.assign(new Image(), { src: "assets/cpcapture.webp" }),
    "proj4": Object.assign(new Image(), { src: "assets/htcapture.webp" }),
    "proj5": Object.assign(new Image(), { src: "assets/rngcapture.webp" })
  };
  const projectImage = document.getElementById("projImg");

  Object.keys(imageMap).forEach(projClass => {
    const link = document.querySelector(`#${projClass}`);
    if (link) {
      link.addEventListener("mouseover", () => {
        projectImage.src = imageMap[projClass].src;
        projectImage.style.opacity = '1';
      });
      link.addEventListener("mouseout", () => {
        projectImage.style.opacity = '0';
      });
    }
  });
}

const sleep = ms => new Promise(res => setTimeout(res, ms));
async function launchAnimation() {
  startImg.style.height = "125px";
  await sleep(300);
  startAnim.style.backgroundColor = "transparent";
  await sleep(200);
  startImg.style.height = "0px";
  startAnim.style.height = "0";
  await sleep(200);
  startAnim.style.display = "none";
  favtask.style.width = "38px";
  document.body.style.overflowY = "visible";
}

document.getElementById("favtask").style.width = "0px";
requestAnimationFrame(() => {
  launchAnimation();
});

// Light/Dark mode logic
const switchBtn = document.querySelector("#themecheck");

function applyTheme(theme, save = true) {
  document.documentElement.setAttribute("data-theme", theme);
  switchBtn.checked = theme === "dark";

  if (save) localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme, false);
} else {
  applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", false);
}
switchBtn.addEventListener("change", () => {
  applyTheme(switchBtn.checked ? "dark" : "light");
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

const styleMap = {
  intro: {
    window: { width: "100%", height: "100%", backgroundColor: "transparent", bottom: "50%" },
    content: { height: "100%", width: "100%" },
    intro: { display: "flex" }, p1: { display: "none" }, p2: { display: "none" }, ap: { display: "none" }
  },
  hidden: {
    window: { width: "0%", height: "0%", bottom: "0%" }
  },
  p1: {
    window: { width: "80%", height: "80%", bottom: "50%", backgroundColor: "var(--ui-color)" },
    content: { width: "calc(100% - 20px)", height: "calc(100% - 55px)" },
    intro: { display: "none" }, p1: { display: "flex" }, p2: { display: "none" }, ap: { display: "none" }
  },
  p2: {
    window: { width: "80%", height: "80%", bottom: "50%", backgroundColor: "var(--ui-color)" },
    content: { width: "calc(100% - 20px)", height: "calc(100% - 55px)" },
    intro: { display: "none" }, p1: { display: "none" }, p2: { display: "flex" }, ap: { display: "none" }
  },
  ap: {
    window: { width: "100%", height: "100%", backgroundColor: "rgb(79, 108, 135)", bottom: "50%" },
    content: { height: "100%", width: "100%" },
    intro: { display: "none" }, p1: { display: "none" }, p2: { display: "none" }, ap: { display: "flex" }
  }
};

let lastState = null;
const sectionElems = [
  document.getElementById("introbs"),
  document.getElementById("p1bs"),
  document.getElementById("p2bs"),
  document.getElementById("apbs")
];

function winanim() {
  const tops = sectionElems.map(el => el.getBoundingClientRect().top);
  let state = tops[0] > -80 ? "intro" : tops[1] > 80 ? "hidden" :  tops[1] > -80 ? "p1" : tops[2] > 80 ? "hidden" : tops[2] > -80 ? "p2" : tops[3] > 80 ? "hidden" : "ap";

  if (state === lastState) return;
  lastState = state;

  const styles = styleMap[state];
  for (const key in styles) setStyles(elems[key], styles[key]);
}

if(window.matchMedia('(min-width: 768px)').matches){
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
  }, { passive: true });

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

// Reveal effect on scroll
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle("notshow", !entry.isIntersecting);
  });
});
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));