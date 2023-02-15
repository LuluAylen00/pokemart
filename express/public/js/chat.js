var socket = io();

let inputTexto = document.getElementById("texto");

function addMessage(e) {
    var mensaje = {
        id: document.getElementById("chat-id").value,
        author: document.getElementById("username").value,
        text: document.getElementById("texto").value,
        avatar: document.getElementById("avatar-chat").value,
        time: new Date().toString()
    };
    inputTexto.value = "";
    if (mensaje.text.length > 0) {
        socket.emit("new-message", mensaje);
    }
}

function renderPeople(people){
    console.log("Conexión");
    let totalConnected = document.getElementById("total-connected")
    totalConnected.innerHTML = people
}

let connectedPeople = 0
socket.on("connected", function (data) {
    connectedPeople = connectedPeople + 1
    renderPeople(data);
})

socket.on("messages", function (data) {
    //console.log(data);
    render(data);
});

function render(data) {
    let div = document.getElementById("messages");
    console.log(data[0]);
    div.innerHTML = "";
    let dataLength = data.length;
    let dayStatus = {
        priority: 0,
        msg: ""
    };
    data.forEach(function (elem, i) {
        let time = new Date(elem.date);
        const month = time.toLocaleString('default', { month: 'long' });
        let actualDay = `${time.getDate(time)} de ${month}`;
        dayStatus.priority = (data.length - i)
        if (dayStatus.msg != actualDay) {
            let span = document.createElement("span");
            span.style.order = (data.length * 2) - (i * 2) + 1
            span.classList.add("daystatus");
            span.innerHTML = actualDay;
            div.appendChild(span);
            dayStatus.msg = actualDay;
        }
        let divChiquito = document.createElement("div");
        divChiquito.setAttribute("class", "each-message");
        divChiquito.style.order = (data.length * 2) - (i * 2);
        if (i % 2 == 0) {
            divChiquito.classList.add("each-message-even");
        } else {
            divChiquito.classList.add("each-message-odd");
        }

        let avatar = document.createElement("img");
        avatar.setAttribute("src", `/img/avatar/${elem.trainer.avatar.filename}`);
        avatar.setAttribute("class", "each-message-avatar");
        divChiquito.appendChild(avatar);

        let strong = document.createElement("h5");
        strong.innerHTML = elem.trainer.username + ": ";
        strong.setAttribute("class", "each-message-name");
        divChiquito.appendChild(strong);

        let em = document.createElement("h5");
        em.innerHTML = elem.message;
        em.setAttribute("class", "each-message-text");
        divChiquito.appendChild(em);

        let hour = document.createElement("em");

        function process(hours,minutes) {
            let hour = String(hours).length == 1 ? "0"+String(hours) : String(hours)
            let minute = String(minutes).length == 1 ? "0"+String(minutes) : String(minutes)
            return `${hour}:${minute}`
        }


        hour.innerHTML = process(time.getHours(),time.getMinutes());
        hour.setAttribute("class", "each-message-hour");
        divChiquito.appendChild(hour);

        div.appendChild(divChiquito);
        })

    //document.getElementById("messages").innerHTML = div;
}



if (inputTexto.value.length > 0) {
    inputTexto.addEventListener("click",addMessage())
    inputTexto.addEventListener("keydown",function(e){
        console.log(e.key);
        if (e.key == "Enter") {
            addMessage()
        }
    })
}