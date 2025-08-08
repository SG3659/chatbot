import type { NextFunction, Request, Response } from "express";
import Chats from "../model/chatModel.js"
import dotenv from "dotenv"
dotenv.config()
import { GoogleGenAI } from "@google/genai";
import tools from "../utils/tools.js";

<<<<<<< HEAD
export const generateChatCompletion = async (req: Request,
=======
export const  generateChatCompletion=async( req: Request,
>>>>>>> b98f2925f1da6498b91e3ab7a5c65138b306f54a
  res: Response,
  next: NextFunction): Promise<Response> => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ message: "Message is required and must be a string" });
    }
    // console.log(process.env.GEMINI_KEY)
    if (!process.env.GEMINI_KEY) {
      return res.status(500).json({ message: "Gemini API key not configured" });
    }
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
      {
        name: "getPrePostOpGuidance",
        description: "Provide Pre or Post Operation Guidance",
        parameters: {
          type: "object",
          properties: {
            procedure: {
              type: "string",
              description: "Provide the pre or post OP of surgery name Use Rhinoplasty Facelift Lip Fillers"
            }
          }
        }

      },
      {
        name: "getTreatmentClinicOffer",
        description: "Return clinic offer for treatment pass treatment like 'facelift' ' lipfillers' ",
        parameters: {
          type: "object",
          properties: {
            procedure: {
              type: "string",
              description: "Optional treatment name or 'all' to list all offers."
            }
          }
        }

      }
    ];
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
<<<<<<< HEAD
=======

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

>>>>>>> b98f2925f1da6498b91e3ab7a5c65138b306f54a
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
    // console.log(response.candidates[0]?.content)
    // extracting  function call name
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
      } catch (_) { }
      return calls;
    };
    const functionCalls = extractFunctionCalls(response);
    let aiReply: string | undefined;
    // tools calling in function
    if (functionCalls.length > 0) {
      const fc = functionCalls[0];
      // toll function call
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
      } else if (fc && fc.name === "getPrePostOpGuidance") {
        const procedure = fc.args?.procedure as string | undefined;
        const result = await (tools as any).getPrePostOpGuidance({ procedure });
        const preList = (result?.preOp ?? []).map((i: string) => `• ${i}`).join("\n");
        const postList = (result?.postOp ?? []).map((i: string) => `• ${i}`).join("\n");
        const header = result?.message ?? "Pre-op and post-op guidance:";
        const disclaimer = result?.disclaimer ? `\n\nNote: ${result.disclaimer}` : "";
        aiReply = `${header}\n\nPre-op:\n${preList}\n\nPost-op:\n${postList}${disclaimer}`;
      } else if (fc && fc.name === "getTreatmentClinicOffer") {
        const treatment = fc.args?.treatment as string | undefined;
        const result = await (tools as any).getTreatmentClinicOffer({ treatment });
        if (result?.offers && Array.isArray(result.offers)) {
          const list = result.offers
            .map((o: any) => `- ${o.treatment} — from $${o.startingPrice}`)
            .join("\n");
          aiReply = `${result.message}\n${list}`;
        } else if (result?.offer) {
          const o = result.offer;
          const range = Array.isArray(o.priceRange) ? `$${o.priceRange[0]}–$${o.priceRange[1]}` : "";
          aiReply = `${result.message}\nSummary: ${o.summary}\nStarting at: $${o.startingPrice}${range ? ` (typical ${range})` : ""}`;
        } else if (result?.message) {
          aiReply = result.message;
        }
      }
    }
    if (!aiReply) {
      const anyResponse: any = response as any;
      aiReply = anyResponse?.text || "No response";
    }
    // Save user and AI messages in parallel
    Chats.create({ role: "user", content: message }),
      Chats.create({ role: "assistant", content: aiReply })
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
): Promise<Response> => {
  try {
    const chats = await Chats.find().lean();
    return res.status(200).json({ chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

