import axiosconfig from "../services/axios-config"

export const sendChatRequest = async (message: string) => {
  const email = localStorage.getItem("email");
  console.log(email)
  const res = await axiosconfig.post("/chat/new", { message, email });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axiosconfig.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};