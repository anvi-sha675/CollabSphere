import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { getAvatarUrl } from "../lib/utils";
import { User, Mail, Globe, Code, MapPin, Loader2, Save } from "lucide-react";

const ProfilePage = () => {
  const { authUser } = useAuthUser();
  const { updateProfile, isPending } = useUpdateProfile();

  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    programmingLanguage: authUser?.programmingLanguage || "",
    location: authUser?.location || "",
    bio: authUser?.bio || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <User className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_2fr] gap-8">
        {/* Left Side - Avatar & Overview */}
        <div className="space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-background shadow-md">
              <img
                src={getAvatarUrl(authUser)}
                alt="Avatar"
                className="w-full h-full object-cover bg-secondary"
              />
            </div>
            <h2 className="text-xl font-bold mb-1">{authUser?.fullName}</h2>
            <p className="text-muted-foreground text-sm flex items-center gap-2 justify-center">
              <Mail className="w-4 h-4" />
              {authUser?.email}
            </p>
            <div className="mt-6 w-full flex flex-wrap gap-2 justify-center">
              <span className="text-xs uppercase font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                {authUser?.programmingLanguage || "No skillset"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-card rounded-2xl border border-border p-6 lg:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Native Language
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    name="nativeLanguage"
                    value={formData.nativeLanguage}
                    onChange={handleChange}
                    required
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Learning Goal
                </label>
                <div className="relative">
                  <Code className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    name="programmingLanguage"
                    value={formData.programmingLanguage}
                    onChange={handleChange}
                    required
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary/50 transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-4 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary/50 transition-all resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto h-11 px-8 rounded-xl gradient-bg text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-glow flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Profile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
