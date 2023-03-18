import axios from 'axios';

export const makeApiCall = async (text) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const endpoint = `https://api.openai.com/v1/engines/davinci-text-003/jobs`;

  const response = await axios.post(endpoint, {
    prompt: text,
    max_tokens: 100,
    n: 1,
    stop: null,
    temperature: 0.5,
  }, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data.choices[0].text;
};
