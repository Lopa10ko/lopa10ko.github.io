function getMessageAuthor(id) {
    const prefix = "user-";
    return prefix + id.toString();
}

function createMessageCard(message) {
    const messageBox = document.createElement("div");
    messageBox.classList.add("msg-box", "flex", "column");
    const div = document.createElement("div");
    const textcardHeadingWrapper = document.createElement("span");
    textcardHeadingWrapper.classList.add("textcard-heading-wrapper", "flex");

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.classList.add("mini-svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const pathFirst = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathFirst.setAttribute("style", "fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;");
    pathFirst.setAttribute("d", "M 4.001953 8.197266 L 12 14.097656 L 19.998047 8.197266 ");
    pathFirst.setAttribute("transform", "matrix(0.666667,0,0,0.666667,0,0)");
    const pathSecond = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathSecond.setAttribute("style", "fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;");
    pathSecond.setAttribute("d", "M 4.998047 6.498047 L 19.001953 6.498047 C 20.103516 6.498047 21 7.394531 21 8.501953 L 21 18.498047 C 21 19.605469 20.103516 20.501953 19.001953 20.501953 L 4.998047 20.501953 C 3.896484 20.501953 3 19.605469 3 18.498047 L 3 8.501953 C 3 7.394531 3.896484 6.498047 4.998047 6.498047 Z M 4.998047 6.498047 ");
    pathSecond.setAttribute("transform", "matrix(0.666667,0,0,0.666667,0,0)");

    const timestamp = document.createElement("span");
    timestamp.classList.add("msg-timestamp");
    timestamp.innerText = `Message from ${getMessageAuthor(message.id)} at ${new Date().toLocaleString()}`;

    const textcardDescWrapper = document.createElement("div");
    textcardDescWrapper.classList.add("textcard-desc-wrapper");
    const textcardDesc = document.createElement("div");
    textcardDesc.classList.add("textcard-desc");
    const textcardDescMain = document.createElement("div");
    textcardDescMain.classList.add("textcard-desc-main");
    const p = document.createElement("p");
    p.innerText = message.body;

    g.appendChild(pathFirst);
    g.appendChild(pathSecond);
    svg.appendChild(g);
    textcardHeadingWrapper.appendChild(svg);
    textcardHeadingWrapper.appendChild(timestamp);
    textcardDescMain.appendChild(p);
    textcardDesc.appendChild(textcardDescMain);
    textcardDescWrapper.appendChild(textcardDesc);
    div.appendChild(textcardHeadingWrapper);
    div.appendChild(textcardDescWrapper);
    messageBox.appendChild(div);
    return messageBox;
}

let loaderShowing = true;

function addNewMessage(message) {
    const messageList = document.getElementById('msg-list-load');
    let messageCard = createMessageCard(message);
    messageList.appendChild(messageCard);
    if (!loaderShowing) {
        return;
    }
    loaderShowing = false;
    let preloader = document.getElementById('msg-loader');
    preloader.style.display = "none";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(++max) - Math.ceil(min)) + Math.ceil(min));
}

async function handleResponse(response) {
    await sleep(getRandomInt(500, 5000));
    if (!response.ok) {
        throw new Error(`Failed to get url ${response.url}`);
    }
    return response.json();
}

async function loadMessages() {
    await sleep(600);
    try {
        let urls = [];
        const baseUrl = 'https://jsonplaceholder.typicode.com/posts/';
        for (let i = 0; i < getRandomInt(1, 10); i++) {
            urls.push(baseUrl + getRandomInt(1, 100).toString());
        }
        for (let i = 0; i < urls.length; i++) {
            fetch(urls[i])
                .then(handleResponse)
                .then(message => addNewMessage(message))
                .catch(error => console.error(error));
        }
    }
    catch(err) {
        alert(`Error on urls fetch: ${err.toString()}`);
    }
}

window.addEventListener('load', loadMessages);
