import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import {
  BellIcon,
  ClockIcon,
  MessageSquareIcon,
  UserCheckIcon,
  Check,
} from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";
import { getAvatarUrl } from "../lib/utils";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="max-w-2xl mx-auto px-4 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
          <BellIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            {incomingRequests.length} pending requests
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
      ) : (
        <div className="space-y-4">
          {incomingRequests.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-3 text-muted-foreground uppercase tracking-wider">
                <UserCheckIcon className="h-4 w-4" />
                Friend Requests
              </h2>
              {incomingRequests.map((request) => (
                <div
                  key={request._id}
                  className="flex items-center gap-4 p-4 rounded-xl border transition-all bg-primary/5 border-primary/20"
                >
                  <div className="relative">
                    <img
                      src={getAvatarUrl(request.sender)}
                      alt={request.sender.fullName}
                      className="w-11 h-11 rounded-full bg-secondary object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center">
                      <UserCheckIcon className="w-3 h-3 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-semibold">
                        {request.sender.fullName}
                      </span>{" "}
                      <span className="text-muted-foreground">
                        wants to connect with you
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      2 min ago
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => acceptRequestMutation(request._id)}
                      disabled={isPending}
                      className="w-8 h-8 rounded-full gradient-bg text-primary-foreground flex items-center justify-center hover:opacity-90 shadow-glow disabled:opacity-50 transition-all"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      disabled={isPending}
                      className="w-8 h-8 rounded-full border border-border text-muted-foreground hover:bg-secondary flex items-center justify-center disabled:opacity-50 transition-all"
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
                </div>
              ))}
            </div>
          )}

          {acceptedRequests.length > 0 && (
            <div className="space-y-2 mt-8">
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-3 text-muted-foreground uppercase tracking-wider">
                <BellIcon className="h-4 w-4" />
                New Connections
              </h2>
              {acceptedRequests.map((notification) => (
                <div
                  key={notification._id}
                  className="flex items-center gap-4 p-4 rounded-xl border transition-all bg-card border-border"
                >
                  <div className="relative">
                    <img
                      src={getAvatarUrl(notification.recipient)}
                      alt={notification.recipient.fullName}
                      className="w-11 h-11 rounded-full bg-secondary object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center">
                      <MessageSquareIcon className="w-3 h-3 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-semibold">
                        {notification.recipient.fullName}
                      </span>{" "}
                      <span className="text-muted-foreground">
                        accepted your friend request.
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" /> Recently
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
            <NoNotificationsFound />
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
