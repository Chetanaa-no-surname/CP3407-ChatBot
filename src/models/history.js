let chatHistory = []; // Stores chat history

const suggestedQuestions = [
    "When is orientation?",
    "Where can I get my student ID?",
    "How do I access LearnJCU?",
    "What clubs are available at JCU?",
    "Is there a library tour?",
    "How do I register for classes?",
    "Where is the campus map?",
    "What is the student dress code?",
    "Are there any scholarships available?",
    "How do I contact student support?",
    "Where can I find the academic calendar?",
    "How do I apply for student housing?",
    "Is there a shuttle service on campus?",
    "Where is the cafeteria?",
    "How do I join a student club?",
    "What documents do I need for enrollment?",
    "Can I get help with my visa application?",
    "How do I contact my lecturers?",
    "Is there a career center at JCU?",
    "How do I access free Wi-Fi on campus?",
    "Where can I print my documents?",
    "How do I book a study room in the library?",
    "Where is the finance office?",
    "What do I do if I lose my student card?",
    "How do I apply for a leave of absence?",
    "Can I change my course or major later?",
    "What are the school holidays?",
    "Are there any upcoming events for students?",
    "Where can I find mental health support?",
    "How do I pay my tuition fees?"
];



function addToHistory(userMessage, botResponse) {
    // Push new conversation entry
    chatHistory.push({ role: 'user', content: userMessage });
    chatHistory.push({ role: 'assistant', content: botResponse });

    // Keep only the last 50 messages to prevent memory overload
    while (chatHistory.length > 50) {
            chatHistory.shift();;
    }
}

function getHistory(req, res) {
    res.json({ history: chatHistory });
}

function getSuggestions(req, res) {
    const shuffled = [...suggestedQuestions].sort(() => 0.5 - Math.random());
    const randomThree = shuffled.slice(0, 3);
    res.json({ suggestions: randomThree });
}

module.exports = {addToHistory, getHistory, chatHistory, getSuggestions, suggestedQuestions};

