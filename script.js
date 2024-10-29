document.addEventListener("DOMContentLoaded", () => {
    const username = new URLSearchParams(window.location.search).get("username");
    if (!username) {
        window.location.href = "index.html";
        return;
    }

    const messageForm = document.getElementById("messageForm");
    const messageInput = document.getElementById("message");
    const chatBox = document.getElementById("chatBox");

    async function loadMessages() {
        const response = await fetch("get_messages.php");
        const messages = await response.json();
        // Cambia el orden aquí para que los mensajes nuevos se agreguen al final
        chatBox.innerHTML = messages.map(msg => `
            <div class="message" style="color:${msg.color}">
                <strong>${msg.username}</strong> [${msg.timestamp}]: ${msg.message}
            </div>
        `).reverse().join(''); // Usamos reverse() para invertir el orden de los mensajes
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    messageForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (!message) return;

        await fetch("save_message.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, message })
        });
        messageInput.value = "";
        loadMessages();
    });

    loadMessages();
    setInterval(loadMessages, 3000);
});
