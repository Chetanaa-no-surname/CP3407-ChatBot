// handle API calls to openai 
const OpenAI = require('openai');
const fs = require('fs');
require('dotenv').config({ path: '../.env'});

const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

const openAiCaller = async (req, res) => {
    const userInput = req.body.message;

    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    function searchEntries(userInput) {
        const keywords = userInput.toLowerCase().trim().split(/\s+/);

        function countMatches (keywordArray) {
            return keywordArray.reduce((count, keyword) => {
                return count + (keywords.includes(keyword.toLowerCase()) ? 1 : 0);
            }, 0);
        };

        const results = data.map(entry => ({
            entry, 
            matches: countMatches(entry.keywords)
        }));

        const matchedResults = results.filter(result => result.matches > 0);
        matchedResults.sort((a, b) => b.matches - a.matches);
        return matchedResults.slice(0,3).map(result => result.entry);

    };

    let relevantEntries = searchEntries(userInput);
    let prompt = relevantEntries.length < 1 ? 'I do not have sufficient information on this topic.' : relevantEntries[0].information;

    openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: 'You are an orientation guide for new students joining James Cook University Singapore. Your role is to answer questions and provide information exclusively related to university orientation and related matters. Only provide information from https://www.jcu.edu.sg/ or already known information. In cases where there is insufficient information or questions that are unrelated to orientation, inform the user that their question is outside your scope, or politely request for them to rephrase and guide them back to the relevant topic. Keep your response clear and concise.'
            },
            {
                role: 'assistant',
                content: prompt
            },
            {
                role: 'user',
                content: userInput
            },
        ],
        model: 'gpt-4o-mini',
    })
        .then (response => {
            res.json({ message: response.choices[0].message.content.trim() });
        })
        .catch (err => {
            console.error(err);
            res.status(500).send('server error');
        });

};

exports.caller = openAiCaller;
