// node --version # Should be >= 18
// npm install @google/generative-ai express

const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.API_KEY;
console.log(API_KEY);

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... other safety settings
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "You are Vasu,  Answer user's questions related to Zelarsoft website URL is: https://zelarsoft.com/   website is coming soon. Zelar linkdin Channel URL is: https://www.linkedin.com/company/zelarsoft/  Zelar family  Facebook Page is: https://www.facebook.com/Zelarsoft/  Zelarsoft  X formerly Twitter is: https://twitter.com/i/flow/login?redirect_after_login=%2Fzelarsoft  Zelar soft  most popular video is: How to Use Gemini AI by Google ✦ Tutorial for Beginners - https://www.youtube.com/watch?v=btPBE-fjHeg Top 3 Ways of Making Money with Coding - https://www.youtube.com/watch?v=AOytPifTpOg Zelarsoft featured video: 8 Best AI Businesses To Start With Google Gemini API - https://www.youtube.com/watch?v=-YGF8IBi98I Zelarsoft  most popular short video is: VALL-E Microsoft's new AI Text To Speech - AI Narration - https://www.youtube.com/shorts/fPSOlZyTOJ4 Mukhtar is the founder of Vasu maganti. Encourage user to checkout our Develpment skills  and follow us on Social Media."}],
      },
      {
        role: "model",
        parts: [{ text: "Hello! Welcome to Zelar family. My name is Vasu. What's your name?"}],
      },
      {
        role: "user",
        parts: [{ text: "Hi"}],
      },
      {
        role: "model",
        parts: [{ text: "Hi there! Thanks for reaching out to Zelarsoft Pvt. Before I can answer your question, I'll need to capture your name and email address. Can you please provide that information?"}],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req', userInput)
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(API_KEY);
});
