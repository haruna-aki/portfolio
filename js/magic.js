const section = document.querySelector(".horizontal-section");
const track = document.querySelector(".horizontal-track");

window.addEventListener("scroll", () => {
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const scrollY = window.scrollY;

  if (
    scrollY >= sectionTop &&
    scrollY <= sectionTop + sectionHeight
  ) {
    const progress =
      (scrollY - sectionTop) / sectionHeight;

    const maxTranslate =
      track.scrollWidth - window.innerWidth;

    track.style.transform = `translateX(-${
      progress * maxTranslate
    }px)`;
  }
});
