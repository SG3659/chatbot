import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import Image from "next/image";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}


const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  return role == "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img
          src="/bot.jpg"
          alt="bot"
          width={40}
          height={40}
          style={{ objectFit: "cover" }}
        />      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>

            <Typography sx={{ fontSize: "20px" }}>{block}</Typography>

          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#e3f2fd",
        gap: 2,
        borderRadius: 2,
      }}
    >

      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>

            <Typography sx={{ fontSize: "20px" }}>{block}</Typography>

          )}
      </Box>
    </Box>
  );
};

export default ChatItem;