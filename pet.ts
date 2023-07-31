import { load } from "https://deno.land/std@0.196.0/dotenv/mod.ts";
import OpenAI from "npm:openai@4.0.0-beta.7";

const env = await load();

function generatePrompt(animal: string): string {
  const animalName = animal.substring(0, 1).toUpperCase() +
    animal.substring(1).toLowerCase();

  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${animalName}
Names:`;
}

async function makeRequest(
  prompt: string,
): Promise<OpenAI.Chat.ChatCompletion.Choice[]> {
  const openai = new OpenAI({ apiKey: env["API_KEY"] });

  const completion = await openai.chat.completions.create({
    messages: [{
      role: "user",
      content: prompt,
    }],
    model: "gpt-3.5-turbo",
    temperature: 0.6,
  });

  return completion.choices;
}

async function main(): Promise<string> {
  const animal = window.prompt(
    "What animal would you like to name (e.g. cat)?",
  );
  const prompt = generatePrompt(animal || "Badger");
  const result = await makeRequest(prompt);

  return result[0]?.message?.content || "";
}

const answer = await main();
console.log(answer);
