export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getAvatarUrl = (user) => {
  if (!user) return "";
  const pic = user.profilePic || user.image;
  const name = user.fullName || user.name || user._id || user.id || "User";
  if (!pic || pic.includes("liara.run") || pic.includes("ui-avatars.com")) {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
  }
  return pic;
};