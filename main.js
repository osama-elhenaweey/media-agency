const navTog = document.querySelector(".header");
const btn = document.querySelector(".btn-mobile-nav");
btn.addEventListener("click", function () {
    navTog.classList.toggle("nav-open");
});
// scroll smooth
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const href = link.getAttribute("href");
        // scroll to top
        if (href === "#") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
        if (href !== "#" && href.startsWith("#")) {
            const sectionEl = document.querySelector(href);
            sectionEl.scrollIntoView({ behavior: "smooth" });
        }
        if (link.classList.contains("main-nav-link")) {
            navTog.classList.toggle("nav-open");
        }
    });
});
// sticky navbar
const sectionHeroEl = document.querySelector(".section-hero");
const observer = new IntersectionObserver(
    function (entries) {
        const ent = entries[0];
        if (ent.isIntersecting === false) {
            console.log(ent);
            document.querySelector(".header").classList.add("sticky");
        }
        if (ent.isIntersecting === true) {
            console.log(ent);
            document.querySelector(".header").classList.remove("sticky");
        }
    },
    {
        root: null,
        threshold: 0,
    }
);
observer.observe(sectionHeroEl);
///////////////////////////////////////
// Slider
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
// slider buttons
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let curSlide = 0;
let maxSlide = slides.length;
slider.addEventListener("click", function (e) {
    const clicks = e.target.classList.contains("slider__btn");

    if (!clicks) return;
    if (clicks) {
    }
});
slides.forEach((el, i) => {
    el.style.transform = `translateX(${100 * i}%)`;
});
const goToSlide = function (slide) {
    slides.forEach((el, i) => {
        el.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
};
goToSlide(0);

const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
        curSlide = 0;
    } else {
        curSlide++;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
};
const prevSlide = function () {
    if (curSlide === 0) {
        curSlide = maxSlide - 1;
    } else {
        curSlide--;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
};
btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
    if (e.key == "ArrowLeft") prevSlide();
    if (e.key == "ArrowRight") nextSlide();
});

// slider dots
const dotsContainer = document.querySelector(".dots");

const createDots = function () {
    slides.forEach((_, i) => {
        dotsContainer.insertAdjacentHTML(
            "beforeend",
            `<button class="dots__dot" data-slide="${i}"></button>
        `
        );
    });
};
createDots();
dotsContainer.addEventListener("click", function (e) {
    // console.log(e.target);
    const slide = e.target.dataset.slide;
    if (!e.target.classList.contains("dots__dot")) return;
    if (e.target.classList.contains("dots__dot")) {
        goToSlide(slide);
        activeDot(slide);
    }
});

const activeDot = function (slide) {
    const dots = document.querySelectorAll(".dots__dot");
    dots.forEach((s) => s.classList.remove("dots__dot--active"));
    document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add("dots__dot--active");
};
