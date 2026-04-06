import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserFriends } from "../lib/api";
import FriendCard from "../components/FriendCard";
import { Users } from "lucide-react";

const FriendsPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 animate-fade-in">
      {/* Header matching screenshot 1 precisely */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Users className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Friends</h1>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            {isLoading ? "-" : friends.length} connections
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-10">
          <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
      ) : friends.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border p-16 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No friends yet</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            You don't have any connections yet. Head over to the Home page to
            discover learning partners!
          </p>
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
