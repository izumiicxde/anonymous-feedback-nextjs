import { openai } from "@ai-sdk/openai";
import OpenAI from "openai";
import { streamText, convertToCoreMessages } from "ai";
import { NextResponse } from "next/server";

export const maxDuration = 30;
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    // const { messages } = await req.json();
    const prompt = `Create a list of three open-ended and engaging questions formatted as single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example your output should be structured like this: "What's a hobby you've recently started ?||If you could have dinner with any historical figure, Who would it be?||What's a simple thing that makes you happy?".Ensure the questions are intriguing, foster curiosity and contribute to positive and welcoming conversational environment.`;
    const result = await streamText({
      model: openai("gpt-3.5-turbo-instruct"),
      maxTokens: 400,
      prompt,
    });
    console.log(result.toDataStreamResponse());
    return result.toDataStreamResponse();
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      console.error("Unexpected error occured", error);
      throw error;
    }
  }
}
