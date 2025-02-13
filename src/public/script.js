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
    newMesDiv.textContent = userInput;

    const parentDiv = document.getElementById('responseDiv');
    parentDiv.appendChild(newMesDiv);
    
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
            messageInput.value = '';
            
            const newResDiv = document.createElement('div');
            newResDiv.textContent = data.message;

            const parentDiv = document.getElementById('responseDiv');
            parentDiv.appendChild(newResDiv);
        })
        .catch(err => {
            console.error(err);
        });

};
