import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getAvatarUrl } from "../lib/utils";
import { getUserFriends } from "../lib/api";

import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { getStreamToken } from "../lib/api";
import ChatLoader from "../components/ChatLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const { authUser } = useAuthUser();

  const { data: friends = [] } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token,
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  const targetMember = Object.values(channel.state.members).find(
    (m) => m.user.id !== authUser._id,
  )?.user;
  const fullTargetUser = friends.find((f) => f._id === targetUserId);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-background">
      <Chat client={chatClient} theme="str-chat__theme-light">
        {/* Chat Window Pane */}
        <div className="flex-1 h-full w-full relative flex">
          <div className="flex-1 h-full w-full relative flex flex-col">
            <Channel channel={channel}>
              <Window>
                {/* Custom Chat Header matching Lovable */}
                <div
                  className="h-16 border-b border-border bg-card/80 backdrop-blur-xl flex items-center px-4 gap-3 shrink-0 cursor-pointer hover:bg-muted/10 transition-colors"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.history.back();
                    }}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <path d="m12 19-7-7 7-7" />
                      <path d="M19 12H5" />
                    </svg>
                  </button>
                  <div className="relative">
                    <img
                      src={getAvatarUrl(fullTargetUser || targetMember)}
                      alt="Chat partner"
                      className="w-10 h-10 rounded-full bg-secondary object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-success border-2 border-card" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-sm">
                      {targetMember?.name || "User"}
                    </h2>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2.5 rounded-lg hover:bg-secondary transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </button>
                    <button
                      onClick={handleVideoCall}
                      className="p-2.5 rounded-lg gradient-bg hover:opacity-90 transition-opacity shadow-glow"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary-foreground"
                      >
                        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                        <rect x="2" y="6" width="14" height="12" rx="2" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-hidden relative flex flex-col">
                  <MessageList />
                </div>

                <div className="border-t border-border bg-card/80 backdrop-blur-xl p-4 shrink-0">
                  <MessageInput focus />
                </div>
              </Window>
              <Thread />
            </Channel>
          </div>

          {/* Profile Slide-over Panel */}
          {showProfile && (
            <div className="w-80 border-l border-border bg-card/80 backdrop-blur-xl h-full shadow-lg flex flex-col shrink-0 animate-fade-in z-50 absolute right-0 top-0 bottom-0 md:relative">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold">Contact Info</h3>
                <button
                  onClick={() => setShowProfile(false)}
                  className="p-2 hover:bg-secondary rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 flex flex-col items-center">
                <img
                  src={getAvatarUrl(fullTargetUser || targetMember)}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-background shadow-md"
                />
                <h2 className="text-xl font-bold">
                  {targetMember?.name || "User"}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">Online</p>

                {fullTargetUser && (
                  <div className="w-full space-y-4">
                    <div className="bg-secondary/50 rounded-xl p-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Native Language
                      </h4>
                      <p className="font-medium text-sm">
                        {fullTargetUser.nativeLanguage || "Not specified"}
                      </p>
                    </div>

                    <div className="bg-secondary/50 rounded-xl p-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Learning Goal
                      </h4>
                      <p className="font-medium text-sm">
                        {fullTargetUser.programmingLanguage || "Not specified"}
                      </p>
                    </div>

                    <div className="bg-secondary/50 rounded-xl p-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        About
                      </h4>
                      <p className="text-sm">
                        {fullTargetUser.bio || "No bio available."}
                      </p>
                    </div>
                  </div>
                )}
                {!fullTargetUser && (
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Connecting to user details...
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </Chat>
    </div>
  );
};

export default ChatPage;
