// logic and functionality for HTML 
document.getElementById('messageInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('sendButton').click();
    };
});

async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const userInput = messageInput.value;

    const newMesDiv = document.createElement('div');
    newMesDiv.classList.add('message', 'sent');
    newMesDiv.textContent = userInput;

    const parentDiv = document.getElementById('responseDiv');
    parentDiv.appendChild(newMesDiv);
    parentDiv.scrollTop = parentDiv.scrollHeight;

    messageInput.value = '';
    
    await fetch(`http://localhost:3000`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: userInput})
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('network response was not ok');
            };
            return res.json();
        })
        .then(data => {
            const newResDiv = document.createElement('div');
            newResDiv.textContent = data.message;

            const parentDiv = document.getElementById('responseDiv');
            newResDiv.classList.add('message', 'received');
            parentDiv.appendChild(newResDiv);
            parentDiv.scrollTop = parentDiv.scrollHeight;
        })
        .catch(err => {
            console.error(err);
        });

};


function toggleChatbox() {
    const chatbox = document.getElementById('chatbox');
    const chatButton = document.getElementById('chatButton');
  
    if (chatbox.style.display === "none" || chatbox.style.display === "") {
      chatbox.style.display = "flex";  // Show chatbox
      chatButton.style.display = "none";  // Hide button
    } else {
      chatbox.style.display = "none";  // Hide chatbox
      chatButton.style.display = "flex";  // Show button
    }
};

