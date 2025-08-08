import { Router } from "express";
import chatRoutes from "./chat-router.js"
const appRouter=Router()

appRouter.use("/chat",chatRoutes)
export default appRouter