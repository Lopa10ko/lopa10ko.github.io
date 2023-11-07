window.addEventListener('load', () => {
    messages_json = JSON.parse(localStorage.getItem('messages')) || [];
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

        messages_json.push(message_obj);
        localStorage.setItem('messages', JSON.stringify(messages_json));
        e.target.reset();
        display_messages();
    });

    display_messages();
});

function display_messages() {
    const message_list = document.getElementById("msg-list");
    message_list.innerHTML = '';

    messages_json.forEach(msg => {
        const msg_box = document.createElement("div");
        msg_box.classList.add("msg-box", "flex", "column");
        const div = document.createElement("div");
        const textcard_heading_wrapper = document.createElement("span");
        textcard_heading_wrapper.classList.add("textcard-heading-wrapper", "flex");

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("aria-hidden", "true");
        svg.classList.add("mini-svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const path_1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path_1.setAttribute("style", "fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;");
        path_1.setAttribute("d", "M 4.001953 8.197266 L 12 14.097656 L 19.998047 8.197266 ");
        path_1.setAttribute("transform", "matrix(0.666667,0,0,0.666667,0,0)");
        const path_2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path_2.setAttribute("style", "fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;");
        path_2.setAttribute("d", "M 4.998047 6.498047 L 19.001953 6.498047 C 20.103516 6.498047 21 7.394531 21 8.501953 L 21 18.498047 C 21 19.605469 20.103516 20.501953 19.001953 20.501953 L 4.998047 20.501953 C 3.896484 20.501953 3 19.605469 3 18.498047 L 3 8.501953 C 3 7.394531 3.896484 6.498047 4.998047 6.498047 Z M 4.998047 6.498047 ");
        path_2.setAttribute("transform", "matrix(0.666667,0,0,0.666667,0,0)");

        const timestamp = document.createElement("span");
        timestamp.classList.add("msg-timestamp");
        timestamp.innerText = "Message from " + (new Date(msg.timestamp)).toLocaleString();

        const textcard_desc_wrapper = document.createElement("div");
        textcard_desc_wrapper.classList.add("textcard-desc-wrapper");
        const textcard_desc = document.createElement("div");
        textcard_desc.classList.add("textcard-desc");
        const textcard_desc_main = document.createElement("div");
        textcard_desc_main.classList.add("textcard-desc-main");
        const p = document.createElement("p");
        p.innerText = msg.content;

        const actions = document.createElement("div");
        actions.classList.add("msg-actions", "flex");
        const button_delete = document.createElement("button");
        button_delete.classList.add("msg-delete");
        button_delete.innerText = "delete";

        g.appendChild(path_1);
        g.appendChild(path_2);
        svg.appendChild(g);
        textcard_heading_wrapper.appendChild(svg);
        textcard_heading_wrapper.appendChild(timestamp);
        textcard_desc_main.appendChild(p);
        textcard_desc.appendChild(textcard_desc_main);
        textcard_desc_wrapper.appendChild(textcard_desc);
        div.appendChild(textcard_heading_wrapper);
        div.appendChild(textcard_desc_wrapper);
        actions.appendChild(button_delete);
        msg_box.appendChild(div);
        msg_box.appendChild(actions);
        message_list.appendChild(msg_box);

        button_delete.addEventListener('click', () => {
            messages_json = messages_json.filter(el => el !== msg);
            localStorage.setItem('messages', JSON.stringify(messages_json));
            display_messages();
        });
    });
}
