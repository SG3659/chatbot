"use client"
import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageCircle, Calendar, Users, Phone, Clock, User, SendHorizontal } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Box, Typography, IconButton } from "@mui/material"
import { sendChatRequest, getUserChats } from "@/helper/api-comunication"
import ChatItem from "@/components/ChatItem/ChatItem"
type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chatbot = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);

  };

  useEffect(() => {
    getUserChats()
      .then((data) => {
        setChatMessages([...data.chats]);
      })
      .catch((err) => {
        console.log(err);
      });
    localStorage.setItem("email", "teamredplayer2@gmail.com");

  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className='max-w-4xl mx-auto p-4'>
        {/* card   */}
        <Card className="mb-6 bg-white shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-blue-600">Welcome to Dezy Clinic</CardTitle>
            <p className="text-gray-600 mt-2">Your AI assistant for plastic surgery consultations and appointments</p>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
                  How I Can Help
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-green-600" />
                    Schedule, reschedule, or cancel appointments
                  </li>
                  <li className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-green-600" />
                    Answer questions about our treatments
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-green-600" />
                    Provide pre-op and post-op guidance
                  </li>
                  <li className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-green-600" />
                    Check doctor availability
                  </li>
                </ul>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Working Hours:</strong> 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* chat bot */}

        <Box sx={{
          display: "flex",
          flex: 1,
          width: "100%",
          height: "100%",
          mt: 3,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          boxShadow: 6,
          borderRadius: 2
        }}>
          <Box
            sx={{
              display: "flex",
              flex: { md: 0.8, xs: 1, sm: 1 },
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                color: "#1e88e5",
                mt: 2,
                mb: 2,
                mx: "auto",
                fontWeight: "600",
              }}
            >
              Chat with Bot
            </Typography>
            {/* Ai message */}
            <Box
              sx={{
                width: "100%",
                height: "60vh",
                borderRadius: 3,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                overflow: "scroll",
                overflowX: "hidden",
                overflowY: "auto",
                scrollBehavior: "smooth",
              }}
            >
              {chatMessages.map((chat, index) => (
                //@ts-ignore
                <ChatItem content={chat.content} role={chat.role} key={index} />
              ))}
            </Box>
            <div
              className="w-full rounded-lg bg-white flex items-center mx-auto  shadow-lg mt-6 border-2 mb-6"
            >
              {" "}
              <input
                ref={inputRef}

                type="text"
                placeholder="Ask about treatments, book or cancel an appointment..."
                className="w-full bg-transparent p-[30px] border-none outline-none  text-[20px]"
              />
              <IconButton onClick={handleSubmit} sx={{ color: "grey", mx: 1 }}>
                <SendHorizontal />
              </IconButton>
            </div>
          </Box>
        </Box>

      </div>
    </div>
  )
}

export default Chatbot
