/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyBh1y3jrD095AXRztIfo_T9r8Pr_DgQKkU";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function runChat(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  const response = result.response;

  console.log(response.text());
  return response.text();
}

export const formatResponse = (response) => {
  let arr = response.split("**");
  let newResponse = "";

  for (let i = 0; i < arr.length; i++) {
    if (i === 0 || i % 2 !== 1) {
      newResponse += arr[i];
    } else {
      newResponse += "<b>" + arr[i] + "</b>";
    }
  }

  return newResponse
    .split("*")
    .join("- ")
    .split("\n\n")
    .join("</br></br>")
    .split("\n")
    .join("</br>");
};

export default runChat;
