import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { getWeatherAdvice } from './src/services/AiService';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.post('/weather', async (req: Request, res: Response) => {
  const { location } = req.body;

  if (!location) {
     res.status(400).json({ error: 'Location is required' });
     return ;
  }

  try {
    const advice = await getWeatherAdvice(location);
    res.json({ location, advice });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});