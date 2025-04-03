// logic and functionality for HTML 
document.getElementById('messageInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('sendButton').click();
    };
});


function toggleSearch() {
    var searchBox = document.getElementById("search-box");
    if (searchBox.style.display === "none" || searchBox.style.display === "") {
        searchBox.style.display = "block";
    } else {
        searchBox.style.display = "none";
    }
}
function toggleHamburgerMenu() {
    const menu = document.getElementById("hamburgerMenu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}


async function sendMessage() {
    const suggestDiv = document.getElementById('suggestions');
    if (suggestDiv) {
        suggestDiv.remove()
    }
    const messageInput = document.getElementById('messageInput');
    const userInput = messageInput.value;

    if (!userInput.trim())return;

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
            
            const suggestionsDiv = document.createElement('div');
            suggestionsDiv.classList.add('suggestions-container');
            suggestionsDiv.id = 'suggestions'

            fetch('http://localhost:3000/suggestedQn')
                .then(res => res.json())
                .then(suggestionData => {
                    suggestionData.suggestions.forEach(question => {
                        const btn = document.createElement('button');
                        btn.textContent = question;
                        btn.addEventListener('click', function() {
                            document.getElementById('messageInput').value = this.textContent;
                            document.getElementById('sendButton').click();
                            document.getElementById('suggestions').remove();
                        });
                        suggestionsDiv.appendChild(btn);
                    });
                });
            
            parentDiv.appendChild(suggestionsDiv);
        
        })
        .catch(err => {
            console.error(err);
        });
    
        parentDiv.scrollTop = parentDiv.scrollHeight;    

};

// Function to load chat history on page load
async function loadHistory() {
    const parentDiv = document.getElementById('responseDiv');

    try {
        const res = await fetch('http://localhost:3000/getHistory');
        const data = await res.json();

        // Display chat messages
        data.history.forEach(entry => {
            const newDiv = document.createElement('div');
            newDiv.textContent = entry.content;
            newDiv.classList.add('message', entry.role === 'user' ? 'sent' : 'received');
            parentDiv.appendChild(newDiv);
        });

        //Check if last message was from assistant
        if (
            data.history.length > 0 &&
            data.history[data.history.length - 1].role === 'assistant'
        ) {
            await loadSuggestions(); // inject suggestions after last bot reply
        }

        setTimeout(() => {
            parentDiv.scrollTop = parentDiv.scrollHeight;
        }, 0);

    } catch (err) {
        console.error('Error loading chat history:', err);
    }
}


document.addEventListener('DOMContentLoaded', loadHistory, loadSuggestions);


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

async function loadSuggestions() {
    console.log('loading suggeestions')
    const parentDiv = document.getElementById('responseDiv');
    try {
        const res = await fetch('http://localhost:3000/suggestedQn');
        const data = await res.json();
        const suggestions = data.suggestions;

        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.classList.add('suggestions-container');
        suggestionsDiv.id = 'suggestions';

        suggestions.forEach((question) => {
            const btn = document.createElement('button');
            btn.textContent = question;
            btn.className = 'suggestion-btn';
            btn.addEventListener('click', function() {
                document.getElementById('messageInput').value = this.textContent;
                document.getElementById('sendButton').click();
                document.getElementById('suggestions').remove();
            });

            suggestionsDiv.appendChild(btn);
        });
        
        parentDiv.appendChild(suggestionsDiv);
        parentDiv.scrollTop = parentDiv.scrollHeight; 
    } catch (err) {
        console.error('Error loading suggested questions:', err);
    }
}


