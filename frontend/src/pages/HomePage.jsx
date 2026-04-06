import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Search, UserPlus, CheckCircle, Clock } from "lucide-react";
import FriendCard from "../components/FriendCard";
import useAuthUser from "../hooks/useAuthUser";
import { motion } from "framer-motion";
import { getAvatarUrl } from "../lib/utils";

const HomePage = () => {
  const queryClient = useQueryClient();
  const { authUser } = useAuthUser();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const [search, setSearch] = useState("");
  const [showRecommended, setShowRecommended] = useState(false);

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  const filteredFriends = friends.filter((f) =>
    f.fullName?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 animate-fade-in">
      {/* Search + Action exactly matching the light design */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search friends..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-11 pr-4 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary/50 transition-all font-medium"
          />
        </div>
        <button
          onClick={() => setShowRecommended(!showRecommended)}
          className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl gradient-bg text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shadow-glow"
        >
          <UserPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Friend</span>
        </button>
      </div>

      {/* Stats - using the precise styling from screenshot */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Friends", value: loadingFriends ? "-" : friends.length },
          {
            label: "Online",
            value: friends.filter((f) => f.isOnline).length || "0",
          },
          { label: "Discoverable", value: recommendedUsers.length },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-xl border border-border p-6 text-center shadow-sm"
          >
            <p className="text-[28px] font-bold text-primary tracking-tight leading-none mb-1">
              {stat.value}
            </p>
            <p className="text-[13px] text-muted-foreground font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recommended Section (Toggled) */}
      {showRecommended && !loadingUsers && recommendedUsers.length > 0 && (
        <div className="mb-10 animate-slide-up">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" /> Recommended Partners
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedUsers.slice(0, 3).map((user) => {
              const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
              return (
                <div
                  key={user._id}
                  className="bg-card rounded-2xl border border-border p-5 flex flex-col items-center text-center shadow-sm hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-secondary">
                    <img
                      src={getAvatarUrl(user)}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">
                    {user.fullName}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2 min-h-[32px]">
                    {user.bio || "No bio available."}
                  </p>

                  <button
                    onClick={() => sendRequestMutation(user._id)}
                    disabled={hasRequestBeenSent || isPending}
                    className={`mt-auto w-full h-9 rounded-lg text-sm font-medium transition-all ${
                      hasRequestBeenSent
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
                    }`}
                  >
                    {hasRequestBeenSent ? "Request Sent" : "Connect"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Friends Grid */}
      {loadingFriends ? (
        <div className="flex justify-center p-10">
          <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
      ) : filteredFriends.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFriends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border p-16 text-center shadow-sm">
          <h3 className="font-semibold mb-2">No friends found</h3>
          <p className="text-sm text-muted-foreground">
            Try a different search or click 'Add Friend' to discover new
            learners!
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
