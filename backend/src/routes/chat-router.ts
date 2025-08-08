import { Router } from "express";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  generateChatCompletion,
  sendChatsToUser,
} from "../controller/chat-controllers.js";

const chatRoutes = Router();
chatRoutes.post(
  "/new",validate(chatCompletionValidator),generateChatCompletion
);
chatRoutes.get("/all-chats", sendChatsToUser);

export default chatRoutes;