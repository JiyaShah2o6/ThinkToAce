// server.js
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Use the API key from environment variables
});
const openai = new OpenAIApi(configuration);

async function getAIResponse(question) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an AI tutor." },
        { role: "user", content: question },
      ],
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return `Error: ${error.message}`;
  }
}

app.post("/api/ask", async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: "No question provided" });
  }
  const answer = await getAIResponse(question);
  res.json({ answer });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
