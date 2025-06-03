import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

if (!OPENROUTER_API_KEY) {
  throw new Error("Missing OPENROUTER_API_KEY in environment variables");
}

// Define the structure of expected AI response
interface WeatherAdvice {
  location: string;
  country: string;
  weather: string;
  temperature: string;
  advice: string;
}

export async function getWeatherAdvice(location: string): Promise<WeatherAdvice> {
  const messages = [
    {
      role: "system",
      content: `Respond with JSON in this format:
{
  "location": "",
  "country": "",
  "weather": "",
  "temperature": "",
  "advice": ""
}`
    },
    {
      role: "user",
      content: `What is the weather like today in ${location}, and what can I wear? If the input is irrelevant, 
      ask them to give the correct place name.`
    }
  ];

  try {
    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: "gpt-4o-mini",
        messages,
        max_tokens: 200,
        temperature: 0.7,
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0].message.content;

    return JSON.parse(content) as WeatherAdvice;
  } catch (error: any) {
    console.error("OpenRouter API error:", error.response?.data || error.message);
    throw new Error("Failed to fetch weather advice from OpenRouter");
  }
}
