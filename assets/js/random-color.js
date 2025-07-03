const everyLink = document.getElementsByTagName('a');
const everyLetter = document.getElementsByClassName('letter');

function generateRandomColor() {
    const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 40%)`;
    document.documentElement.style.setProperty("--random-color", randomColor);
}

Array.from(everyLink).forEach(link => link.addEventListener("mouseover", () => {generateRandomColor()}));
Array.from(everyLetter).forEach(letter => {
  letter.addEventListener("mouseover", generateRandomColor);
  letter.addEventListener("touchstart", generateRandomColor);
});
