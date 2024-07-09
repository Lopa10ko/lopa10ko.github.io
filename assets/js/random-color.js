const everyLink = document.getElementsByTagName('a');

function generateRandomColor() {
    const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 60%)`;
    document.documentElement.style.setProperty("--random-color", randomColor);
}

Array.from(everyLink).forEach(link => link.addEventListener("mouseover", () => {generateRandomColor()}));
