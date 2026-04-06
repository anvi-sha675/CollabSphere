import React, { useState } from "react";
import useAuthUser from "../hooks/useAuthUser.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api.js";
import {
  CameraIcon,
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
} from "lucide-react";
import { LANGUAGES, PROGRAMMING_LANGUAGE } from "../constants/index.js";
import { getAvatarUrl } from "../lib/utils.js";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    programmingLanguage: authUser?.programmingLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile Onboarded Successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const randomAvatar = getAvatarUrl();
    setFormState((prev) => ({ ...prev, profilePic: randomAvatar }));
    toast.success("Random avatar generated!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 animate-fade-in">
      {/* Ambient background effects mimicking login page */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="bg-card/80 backdrop-blur-xl border border-border w-full max-w-2xl shadow-xl rounded-2xl relative z-10 p-8 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center tracking-tight mb-2">
          Complete Your Profile
        </h1>
        <p className="text-muted-foreground text-center mb-8 text-sm">
          Let's setup your learning preferences to find the best partners.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* profile pic */}
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* img */}
            <div className="size-28 rounded-full bg-secondary overflow-hidden border-4 border-background shadow-md">
              {formState.profilePic ? (
                <img
                  src={formState.profilePic}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <CameraIcon className="size-10 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* generate avatar button */}
            <button
              type="button"
              onClick={handleRandomAvatar}
              className="inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary h-9 px-4 py-2 rounded-md"
            >
              <ShuffleIcon className="size-4 text-muted-foreground" />
              Generate Random Avatar
            </button>
          </div>

          <div className="space-y-4">
            {/* full name */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                className="flex h-11 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Your full name"
              />
            </div>

            {/* bio */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Bio</label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                className="flex min-h-[80px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Tell others about yourself and your learning goals"
              />
            </div>

            {/* languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* native language */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Native Language
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                  className="flex h-10 w-full items-center justify-between rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled className="text-muted-foreground">
                    Select Native Language
                  </option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* learning language */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Programming Language
                </label>
                <select
                  name="learningLanguage"
                  value={formState.programmingLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      programmingLanguage: e.target.value,
                    })
                  }
                  className="flex h-10 w-full items-center justify-between rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled className="text-muted-foreground">
                    Select Learning Language
                  </option>
                  {Object.keys(PROGRAMMING_LANGUAGE).map((lang) => (
                    <option key={`learning-${lang}`} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* location */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Location
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-4 text-muted-foreground" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  className="flex h-11 w-full rounded-xl border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>

          {/* submit button */}
          <button
            className="w-full gradient-bg h-11 rounded-xl text-primary-foreground font-semibold flex items-center justify-center hover:opacity-90 transition-opacity shadow-glow mt-4 disabled:opacity-50"
            disabled={isPending}
            type="submit"
          >
            {!isPending ? (
              <>
                <ShipWheelIcon className="size-5 mr-2" />
                Complete Onboarding
              </>
            ) : (
              <>
                <LoaderIcon className="animate-spin size-5 mr-2" />
                Onboarding...
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
