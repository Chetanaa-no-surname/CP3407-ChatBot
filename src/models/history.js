let chatHistory = []; // Stores chat history

function addToHistory(userMessage, botResponse) {
    // Push new conversation entry
    chatHistory.push({ role: 'user', content: userMessage });
    chatHistory.push({ role: 'assistant', content: botResponse });

    // Keep only the last 20 messages to prevent memory overload
    if (chatHistory.length > 50) {
        chatHistory = chatHistory.slice(-50);
    }
}

function getHistory(req, res) {
    res.json({ history: chatHistory });
}

// Export functions
module.exports = { addToHistory, getHistory, chatHistory };
