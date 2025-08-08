import type { NextFunction, Request, Response } from "express";
import Chats from"../model/chatModel.js"
import dotenv from"dotenv"
dotenv.config()
import { GoogleGenAI } from "@google/genai";
export const  generateChatCompletion=async( req: Request,
  res: Response,
  next: NextFunction):Promise<Response> =>{
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ message: "Message is required and must be a string" });
    }

    if (!process.env.GEMINI_KEY) {
      return res.status(500).json({ message: "Gemini API key not configured" });
    }

    // Get previous chats from DB
    const previousChats = await Chats.find().lean();

    // Map to Gemini history format
    const history = previousChats
      .filter(chat => chat?.content)
      .map(({ role, content }) => ({
        role: role === "assistant" ? "model" : "user",
        parts: [{ text: content }]
      }));

    // Initialize GenAI client
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

    // Send request with history + new message
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Updated model name
      contents: [
        ...history,
        { role: "user", parts: [{ text: message }] }
      ]
    });

    const aiReply = response?.text || "No response";

    // Save user and AI messages in parallel
    await Promise.all([
      Chats.create({ role: "user", content: message }),
      Chats.create({ role: "assistant", content: aiReply })
    ]);

    return res.status(200).json({ 
      message: aiReply,
      success: true 
    });
  } catch (error) {
   console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}




export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) :Promise<Response>=> {
  try {
    const chats = await Chats.find().lean();
    return res.status(200).json({ chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


