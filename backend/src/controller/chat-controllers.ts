import type { NextFunction, Request, Response } from "express";
import Chats from"../model/chatModel.js"
import dotenv from"dotenv"
dotenv.config()
import { GoogleGenAI } from "@google/genai";
import tools from "../utils/tools.js";

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

    // Define tool declarations for function calling
    const toolDeclarations = [
      {
        name: "getDoctorInfo",
        description:
          "Retrieve information about our surgeons. Pass doctorId as 'andre', 'catherine', or 'both' to list both.",
        parameters: {
          type: "object",
          properties: {
            doctorId: {
              type: "string",
              description:
                "ID of the doctor to retrieve. Use 'andre', 'catherine', or 'both' to get both.",
              enum: ["andre", "catherine", "both"],
            },
          },
        },
      },
    ];

    // Send request with history + new message + tools
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        ...history,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        tools: [{ functionDeclarations: toolDeclarations as any }],
      },
    });

    // Try to extract a function call (if any)
    const extractFunctionCalls = (resp: any) => {
      const calls: Array<{ name: string; args: Record<string, any> }> = [];
      try {
        const candidates = resp?.candidates ?? [];
        for (const cand of candidates) {
          const parts = cand?.content?.parts ?? [];
          for (const p of parts) {
            if (p?.functionCall) {
              const { name, args } = p.functionCall;
              calls.push({ name, args: args ?? {} });
            } else if (p?.function_call) {
              const { name, args } = p.function_call;
              calls.push({ name, args: args ?? {} });
            }
          }
        }
        // Some SDK variants expose response.functionCalls directly
        if (resp?.functionCalls?.length) {
          for (const fc of resp.functionCalls) {
            calls.push({ name: fc?.name, args: fc?.args ?? {} });
          }
        }
      } catch (_) {}
      return calls;
    };

    const functionCalls = extractFunctionCalls(response);

    let aiReply: string | undefined;

    if (functionCalls.length > 0) {
      const fc = functionCalls[0];
      if (fc && fc.name === "getDoctorInfo") {
        const doctorId = fc.args?.doctorId as string | undefined;
        const result = await (tools as any).getDoctorInfo({ doctorId });

        // Format a concise, helpful reply from tool result
        if (result?.doctors && Array.isArray(result.doctors)) {
          const list = result.doctors
            .map((d: any) => `- ${d.name} — Specialties: ${d.specialties?.join(", ")}`)
            .join("\n");
          aiReply = `${result.message}\n${list}`;
        } else if (result?.doctor) {
          const d = result.doctor;
          const specs = Array.isArray(d?.specialties) ? d.specialties.join(", ") : "";
          aiReply = `${result.message}\nName: ${d.name}\nSpecialties: ${specs}\nBio: ${d.bio}`;
        } else if (result?.message) {
          aiReply = result.message;
        }
      }
    }

    // Fallback to model text if no tool call or no formatted reply
    if (!aiReply) {
      // @google/genai adds a text convenience getter on responses
      // but also keep a defensive fallback
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyResponse: any = response as any;
      aiReply = anyResponse?.text || "No response";
    }

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


