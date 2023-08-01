import { load } from "https://deno.land/std@0.196.0/dotenv/mod.ts";
import OpenAI from "npm:openai@4.0.0-beta.7";

const env = await load();
const film = prompt("Which film would you like to explain (e.g. Jaws)?");
const openai = new OpenAI({ apiKey: env["API_KEY"] });

const completion = await openai.chat.completions.create({
  messages: [
    {
      role: "system",
      content: "You are a film critic who speaks only in iambic pentameter.",
    },
    {
      role: "user",
      content: `Explain the plot of ${film} to me.`,
    },
  ],
  model: "gpt-3.5-turbo",
  temperature: 0.6,
});

const result = completion.choices[0]?.message?.content || "No result";

console.log(result);
