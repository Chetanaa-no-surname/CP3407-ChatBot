// configure express server to handle API routes
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '../.env'});

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('static'));

const openAi = require('./models/openai.js');
app.post('/', openAi.caller);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
