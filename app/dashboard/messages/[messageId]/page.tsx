"use client";

import Container from "@/components/containers/container";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Window,
  LoadingIndicator,
} from "stream-chat-react";
import { useState, useEffect } from "react";
import axios from "axios";

import { useTheme } from "@/context/theme-context";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// Custom header component
const CustomChannelHeader = () => (
  <div className="flex items-center gap-1 p-2 border-b">
    <Link
      href={"/dashboard/messages"}
      className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition"
    >
      <ChevronLeft className="w-5 h-5" />
    </Link>
    <ChannelHeader />
  </div>
);

export default function MessageIdPage() {
  const { messageId } = useParams(); // this is matchId
  const { user } = useAuth();
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const [channelId, setChannelId] = useState("");

  const { isDark } = useTheme();
  useEffect(() => {
    if (!user) return;

    const initChat = async () => {
      try {
        // 1️⃣ Get match channel ID
        const channelRes = await axios.get(
          `http://localhost:5000/api/v1/match/${messageId}/channel`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const channelId = channelRes.data.channelId;
        setChannelId(channelId);

        // 2️⃣ Get Stream token for current user
        const tokenRes = await axios.get(
          "http://localhost:5000/api/v1/stream/token",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const streamToken = tokenRes.data.token;

        // 3️⃣ Initialize Stream client
        const client = new StreamChat(process.env.NEXT_PUBLIC_STREAM_API_KEY!);
        await client.connectUser(
          { id: user.id, name: user.name, image: user.photo },
          streamToken
        );

        setChatClient(client);
      } catch (err) {
        console.error(err);
      }
    };

    initChat();

    // cleanup on unmount
    return () => {
      chatClient?.disconnectUser();
    };
  }, [user]);

  if (!chatClient || !channelId) return <LoadingIndicator />;

  const channel = chatClient.channel("messaging", channelId);

  return (
    <Container className="px-0 py-0 flex flex-col h-screen md:h-[90vh]  md:px-4 md:py-5">
      <Chat
        client={chatClient}
        theme={isDark ? "str-chat__theme-dark" : "str-chat__theme-light"}
      >
        <Channel channel={channel}>
          <Window>
            <CustomChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
        </Channel>
      </Chat>
    </Container>
  );
}
