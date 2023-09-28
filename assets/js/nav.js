const navMenu = document.querySelector('.nav-menu');
const navToggle = document.querySelector('.nav-toggle');

navToggle.addEventListener("click", () => {
    const visibility = navMenu.getAttribute("data-visible");
    if (visibility === "false") {
        navMenu.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
    } else if (visibility === "true") {
        navMenu.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }
    console.log(visibility)
});
