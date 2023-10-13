// From http://stackoverflow.com/a/5365036/2065702
const aboutToggle = document.querySelector('.about-toggle');
const projectsToggle = document.querySelector('.projects-toggle');
const contactToggle = document.querySelector('.contact-toggle');
const textlogoToggle = document.querySelector('.textlogo');

function generateRandomColor() {
    const randomColor = "#"+((1<<24)*Math.random()|0).toString(16);
    document.documentElement.style.setProperty("--random-color", randomColor);
}

function highlightSection(idStr) {
    var randomColor = document.documentElement.style.getPropertyValue("--random-color");
    const stylePoint = document.getElementById(idStr).style;
    stylePoint.setProperty("--highlight-color", randomColor);
    setTimeout(function () {
        randomColor = document.documentElement.style.getPropertyValue("--background-color");
        stylePoint.setProperty("--highlight-color", randomColor);
    }, 1500);
}

aboutToggle.addEventListener("mouseover", () => {generateRandomColor()});
projectsToggle.addEventListener("mouseover", () => {generateRandomColor()});
contactToggle.addEventListener("mouseover", () => {generateRandomColor()});
textlogoToggle.addEventListener("mouseover", () => {generateRandomColor()});
aboutToggle.addEventListener("click", () => {highlightSection("about")});
projectsToggle.addEventListener("click", () => {highlightSection("projects")});
contactToggle.addEventListener("click", () => {highlightSection("contact")});
