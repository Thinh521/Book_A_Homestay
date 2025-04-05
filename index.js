//Header scroll
//Header back to top
const header = document.querySelector(".header");
const backTopBtn = document.querySelector(".back-top--btn");

let lastScrollPos = 0;

const hideHeader = function () {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }
    lastScrollPos = window.scrollY; 
}

window.addEventListener("scroll", function (){
    if (window.scrollY >= 70) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
    } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
})


// Sourse sliderShow
const wrapper = document.querySelector(".services-box");
const carousel = document.querySelector(".services-list");
const arrowBtns = document.querySelectorAll(".course-btn");
const firstCardWidth = carousel.querySelector(".services-item").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerViewLeft = Math.round(carousel.offsetWidth / firstCardWidth);
carouselChildrens.slice(-cardPerViewLeft).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerViewLeft).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});


let cardPerViewRight = Math.round(carousel.offsetWidth / firstCardWidth);
carouselChildrens.slice(-cardPerViewRight).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerViewRight).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// add event left right khi click vào btn
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth; 
    });
    btn.addEventListener("click", () => {
        carousel.scrollRight += btn.id === "right" ? -firstCardWidth : firstCardWidth; 
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging"); //add class dragging
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // kiểm tra có hoạt động kéo thả 
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX); // di chuyển left right
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging"); //remove class dragging
}

const infiniteScroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

carousel.addEventListener("mousedown", dragStart);  // di chuyển left right
carousel.addEventListener("mousemove", dragging); //Lắm nghe event top bottom left right carousel
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
carousel.addEventListener("mouseleave", autoPlay());