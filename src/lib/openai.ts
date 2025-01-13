import OpenAI from 'openai';

if (!import.meta.env.VITE_OPENAI_API_KEY) {
  console.error('OpenAI API key is missing. Please check your .env file.');
}

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});