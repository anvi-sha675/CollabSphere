import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { LANGUAGE_TO_FLAG } from "../constants";
import { getAvatarUrl } from "../lib/utils";

const FriendCard = ({ friend }) => {
  return (
    <div className="group bg-card rounded-2xl border border-border p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <img
            src={getAvatarUrl(friend)}
            alt={friend.fullName}
            className="w-12 h-12 rounded-full object-cover bg-secondary"
          />
          {friend.isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-card" />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-sm truncate">{friend.fullName}</h3>
          <p className="text-xs text-muted-foreground">
            {friend.isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4 max-h-12 overflow-hidden">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-accent text-accent-foreground text-xs font-medium">
          {getLanguageFlag(friend.nativeLanguage)} {friend.nativeLanguage}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium">
          {getLanguageFlag(friend.programmingLanguage)}{" "}
          {friend.programmingLanguage}
        </span>
      </div>

      <Link
        to={`/chat/${friend._id}`}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-accent hover:text-accent-foreground hover:border-primary/30 transition-all"
      >
        <MessageCircle className="w-4 h-4" />
        Message
      </Link>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG?.[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 inline-block rounded-sm"
      />
    );
  }
  return null;
}
