"use client";

// react-next
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

// context
import { useAuth } from "@/context/auth-context";
import { useTheme } from "@/context/theme-context";

// components
import Container from "@/components/containers/container";

// lib
import axios from "axios";
import { ChevronLeft } from "lucide-react";

// stream-chat (message service)
import { StreamChat } from "stream-chat";

// stream-chat-react (message service)
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Window,
  LoadingIndicator,
} from "stream-chat-react";

// custom header component
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
  // message id params for dynamic view
  const { messageId } = useParams();

  // auth-context and theme context
  const { user } = useAuth();
  const { isDark } = useTheme();

  // navigation
  const router = useRouter();

  // stream-chat state
  const [channelId, setChannelId] = useState("");
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  // error state
  const [isError, setIsError] = useState(false);

  // initialize a chat
  useEffect(() => {
    // if there's no user, stop.
    if (!user) return;

    const initChat = async () => {
      try {
        // get the match channel id from backend
        const channelRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/match/${messageId}/channel`,
          {
            headers: { Authorization: `Bearer ${user.token}` }, // get the user jwt token
          }
        );
        const channelId = channelRes.data.channelId;
        setChannelId(channelId);

        // get Stream token for current user
        const tokenRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/stream/token`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const streamToken = tokenRes.data.token;

        const photoURL = user.photo
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${user.photo.replace(
              /\\/g,
              "/"
            )}`
          : undefined;

        // initialize Stream client
        const client = new StreamChat(process.env.NEXT_PUBLIC_STREAM_API_KEY!);
        await client.connectUser(
          { id: user.id, name: user.name, image: photoURL },
          streamToken
        );

        setChatClient(client);
      } catch (err) {
        setIsError(true);
      }
    };

    initChat();

    // cleanup on unmount
    return () => {
      chatClient?.disconnectUser();
    };
  }, [user]);

  // redirect when channel or init fails
  useEffect(() => {
    if (isError) {
      router.replace("/dashboard/messages");
    }
  }, [isError, router]);

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
