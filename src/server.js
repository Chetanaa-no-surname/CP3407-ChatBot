// configure express server to handle API routes
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '../.env'});

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'static')));

const openAi = require('./models/openai.js');
const history = require('./models/history.js');
app.post('/', openAi.caller);
app.get('/getHistory', history.getHistory); // Route to get history
app.get('/suggestedQn', history.getSuggestions);


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});


