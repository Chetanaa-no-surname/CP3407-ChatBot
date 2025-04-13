const { getSuggestions, suggestedQuestions } = require('../models/history');

// Jest Tests
describe("getSuggestions", () => {
    let req, res;

    beforeEach(() => {
        req = {}; // Mock request
        res = {
            json: jest.fn(), // Mock response
        };
    });

    it("should return an array of 3 suggestions", () => {
        getSuggestions(req, res);
        // Ensure the response is called with the correct format
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                suggestions: expect.any(Array),
            })
        );
        // Ensure there are exactly 3 suggestions
        expect(res.json.mock.calls[0][0].suggestions).toHaveLength(3);
    });

    it("should return suggestions that are part of suggestedQuestions", () => {
        getSuggestions(req, res);
        const suggestions = res.json.mock.calls[0][0].suggestions;
        // Ensure all suggestions are from the predefined list
        suggestions.forEach((suggestion) => {
            expect(suggestedQuestions).toContain(suggestion);
        });
    });

    it("should return random suggestions each time", () => {
        const results = new Set();
        // Call the function multiple times
        for (let i = 0; i < 5; i++) {
            getSuggestions(req, res);
            const suggestions = res.json.mock.calls[i][0].suggestions;
            results.add(suggestions.join(","));
        }
        // Ensure there are different combinations in the results
        expect(results.size).toBeGreaterThan(1);
    });
});