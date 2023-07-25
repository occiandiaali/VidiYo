import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "",
});
const openai = new OpenAIApi(configuration);

const aiResponder = async (s: string) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Say something intelligent about the content you are provided with for a second-grade student",
      },
      {
        role: "user",
        content: s,
      },
    ],
    temperature: 0,
    max_tokens: 150,
  });

  return response;
};

export default aiResponder;
