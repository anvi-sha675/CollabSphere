import React, { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const AudioCallPage = () => {
  const { id: callId } = useParams();

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return;

      try {
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);

        await callInstance.join({
          create: true,
          audio: true,
          video: false,
        });

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error(error);
        toast.error("Could not join audio call.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();

    return () => {
      if (call) call.leave();
      if (client) client.disconnectUser();
    };
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <div className="h-screen flex items-center justify-center bg-base-100">
      {client && call ? (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <AudioCallContent />
          </StreamCall>
        </StreamVideo>
      ) : (
        <div>Unable to connect.</div>
      )}
    </div>
  );
};

const AudioCallContent = () => {
  const navigate = useNavigate();

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState === CallingState.LEFT) {
    navigate("/");
    return null;
  }

  return (
    <StreamTheme>
      <div className="h-screen flex flex-col items-center justify-center gap-8">
        <div className="text-center">
          <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-white mx-auto">
            🎧
          </div>

          <h1 className="text-2xl font-bold mt-6">
            Audio Call
          </h1>

          <p className="text-muted-foreground mt-2">
            Connected...
          </p>
        </div>

        <CallControls />
      </div>
    </StreamTheme>
  );
};

export default AudioCallPage;