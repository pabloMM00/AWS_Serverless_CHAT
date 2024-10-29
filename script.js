const apiUrl = "https://<api_gateway_url>/prod/sendMessage"; // Cambia esto por la URL de API Gateway

const username = localStorage.getItem("username");
const userColor = localStorage.getItem("userColor");

async function sendMessage() {
    const message = document.getElementById("message").value;

    if (!message) {
        alert("Por favor, escribe un mensaje.");
        return;
    }

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, message, userColor })
    });

    if (response.ok) {
        document.getElementById("message").value = ""; // Limpia el campo de mensaje
        loadMessages();
    } else {
        console.error("Error al enviar el mensaje.");
    }
}

async function loadMessages() {
    const response = await fetch(apiUrl + "/getMessages", { method: "GET" });
    if (response.ok) {
        const messages = await response.json();
        const chatBox = document.getElementById("chat-box");
        chatBox.innerHTML = "";

        messages.forEach(msg => {
            const msgElem = document.createElement("div");
            msgElem.textContent = `${msg.username}: ${msg.message}`;
            msgElem.style.color = msg.userColor;
            chatBox.appendChild(msgElem);
        });
    }
}

window.onload = loadMessages;
