//A express server, which will handle api requests coming in and reponde back with a json object, it will use body parser as well as cors

require('dotenv').config();
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG_KEY,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message, message1, message2 } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Escreva um ${message2} criativo para o seguinte produto destinado aos ${message}: Product: ${message1}`,
        max_tokens: 1000,
        temperature: 1,
      });
        console.log(response.data)
        if (response.data.choices) {
            res.json({
                message: response.data.choices[0].text
            });
        }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));