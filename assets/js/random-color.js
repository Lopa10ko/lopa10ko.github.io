// From http://stackoverflow.com/a/5365036/2065702
const aboutToggle = document.querySelector('.about-toggle');
const projectsToggle = document.querySelector('.projects-toggle');
const contactToggle = document.querySelector('.contact-toggle');
const textlogoToggle = document.querySelector('.textlogo');

function generateRandomColor() {
    const randomColor = "#"+((1<<24)*Math.random()|0).toString(16);
    document.documentElement.style.setProperty('--random-color', randomColor);
}

aboutToggle.addEventListener("mouseover", () => {generateRandomColor()});
projectsToggle.addEventListener("mouseover", () => {generateRandomColor()});
contactToggle.addEventListener("mouseover", () => {generateRandomColor()});
textlogoToggle.addEventListener("mouseover", () => {generateRandomColor()});