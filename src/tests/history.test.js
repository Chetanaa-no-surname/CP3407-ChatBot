// src/tests/history.test.js
const { addToHistory, getHistory, chatHistory } = require('../models/history');

describe('History Feature', () => {
    beforeEach(() => {
        // Reset chat history before each test
        chatHistory.length = 0;
    });

    test('should add user and assistant messages to history', () => {
        addToHistory('Hello', 'Hi there!');

        expect(chatHistory.length).toBe(2);
        expect(chatHistory[0]).toEqual({ role: 'user', content: 'Hello' });
        expect(chatHistory[1]).toEqual({ role: 'assistant', content: 'Hi there!' });
    });

    test('should not store more than 50 messages', () => {
        for (let i = 0; i < 60; i++) {
            addToHistory(`User message ${i}`, `Bot response ${i}`);
        }

        expect(chatHistory.length).toBe(50);
        expect(chatHistory[0].content).toBe('User message 35');
        expect(chatHistory[49].content).toBe('Bot response 59');
    });

    test('should return chat history as JSON', () => {
        addToHistory('Test user', 'Test bot');

        const req = {};
        const res = {
            json: jest.fn()
        };

        getHistory(req, res);

        expect(res.json).toHaveBeenCalledWith({ history: chatHistory });
    });
});