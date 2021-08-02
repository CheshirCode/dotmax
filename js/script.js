const menuButton = document.querySelector(".header__burger");
const menuButton1 = document.querySelector(".nav");
const contentBody = document.querySelector("body");

menuButton.onclick = function () {
  menuButton.classList.toggle("active");
  menuButton1.classList.toggle("active");
  contentBody.classList.toggle("lock");
}

menuButton1.onclick = function () {
  menuButton.classList.remove("active");
  menuButton1.classList.remove("active");
  contentBody.classList.remove("lock");
}

function slidesPlugin(activeSlide) {
  const slides = document.querySelectorAll('.slide');
  slides[activeSlide].classList.add('active')

  for (const slide of slides) {
    slide.addEventListener('click', () => {
      clearActiveClasses()
      slide.classList.add('active')
    })
  }

  function clearActiveClasses() {
    slides.forEach((slide) => {
      slide.classList.remove('active')
    })
  }
}
slidesPlugin(0)