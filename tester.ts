import { load } from "https://deno.land/std@0.196.0/dotenv/mod.ts";
import OpenAI from "npm:openai@4.0.0-beta.7";

const env = await load();
const language = "JavaScript";

const code = `
function nccError(msg, exitCode = 1) {
  const err = new Error(msg);
  err.nccError = true;
  err.exitCode = exitCode;
  throw err;
}
`;

const prompt =
  `Write unit tests for the ${language} code delimited by triple-quotes ("""):

"""
${code}
"""`;

const openai = new OpenAI({ apiKey: env["API_KEY"] });

const completion = await openai.chat.completions.create({
  messages: [{
    role: "user",
    content: prompt,
  }],
  model: "gpt-3.5-turbo",
  temperature: 0.6,
});

const result = completion.choices[0]?.message?.content || "No result";

console.log(result);
