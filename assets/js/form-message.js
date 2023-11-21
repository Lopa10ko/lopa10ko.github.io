window.addEventListener('load', () => {
    jsonMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const form = document.getElementById("new-msg-form");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const message_obj = {
            id: Math.random(),
            content: e.target.elements.content.value,
            deleted: false,
            timestamp: new Date().getTime(),
        }

        if (!message_obj.content) {
            alert("Provide a message!");
            return;
        }

        jsonMessages.push(message_obj);
        localStorage.setItem('messages', JSON.stringify(jsonMessages));
        e.target.reset();
        displayMessages();
    });

    displayMessages();
});

function displayMessages() {
    const messageList = document.getElementById("msg-list");
    messageList.innerHTML = '';

    jsonMessages.forEach(msg => {
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
        timestamp.innerText = `Message from you at ${(new Date(msg.timestamp)).toLocaleString()}`;

        const textcardDescWrapper = document.createElement("div");
        textcardDescWrapper.classList.add("textcard-desc-wrapper");
        const textcardDesc = document.createElement("div");
        textcardDesc.classList.add("textcard-desc");
        const textcardDescMain = document.createElement("div");
        textcardDescMain.classList.add("textcard-desc-main");
        const p = document.createElement("p");
        p.innerText = msg.content;

        const actions = document.createElement("div");
        actions.classList.add("msg-actions", "flex");
        const buttonDelete = document.createElement("button");
        buttonDelete.classList.add("msg-delete");
        buttonDelete.innerText = "delete";

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
        actions.appendChild(buttonDelete);
        messageBox.appendChild(div);
        messageBox.appendChild(actions);
        messageList.appendChild(messageBox);
        buttonDelete.addEventListener('click', () => {
            jsonMessages = jsonMessages.filter(el => el !== msg);
            localStorage.setItem('messages', JSON.stringify(jsonMessages));
            displayMessages();
        });
    });
}
