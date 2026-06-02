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
  SpeakerLayout,
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
    let videoClient;
    let callInstance;

    const initCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return;

      try {
        console.log("Initializing Audio Call...");

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        callInstance = videoClient.call("default", callId);

        await callInstance.join({ create: true });

        // Audio-only configuration
        await callInstance.camera.disable();
        await callInstance.microphone.enable();

        console.log("Joined audio call successfully");

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining audio call:", error);
        toast.error("Could not join the audio call.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();

    return () => {
      if (callInstance) callInstance.leave();
      if (videoClient) videoClient.disconnectUser();
    };
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) {
    return <PageLoader />;
  }

  return (
    <div className="h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden bg-base-100">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />

      {/* Audio Call Container */}
      <div className="w-full max-w-6xl h-full bg-base-200/50 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden relative z-10 flex flex-col justify-center text-white">
        <div className="flex-1 w-full relative">
          {client && call ? (
            <StreamVideo client={client}>
              <StreamCall call={call}>
                <AudioCallContent />
              </StreamCall>
            </StreamVideo>
          ) : (
            <div className="flex items-center justify-center h-full text-white/50">
              <p>
                Could not initialize audio call. Please refresh and try again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AudioCallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) {
    navigate("/");
    return null;
  }

  return (
    <StreamTheme>
      <div className="h-full flex flex-col">
        {/* Shows participants, active speaker, and screen sharing */}
        <div className="flex-1">
          <SpeakerLayout />
        </div>

        {/* Audio Controls */}
        <CallControls />
      </div>
    </StreamTheme>
  );
};

export default AudioCallPage;