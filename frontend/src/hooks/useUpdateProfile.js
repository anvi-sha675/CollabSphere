import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useUpdateProfile = () => {
	const queryClient = useQueryClient();

	const { mutate: updateProfile, isPending } = useMutation({
		mutationFn: async (data) => {
            // Reusing onboarding endpoint to update profile details
			const res = await axiosInstance.post("/auth/onboarding", data);
			return res.data;
		},
		onSuccess: () => {
			toast.success("Profile updated successfully");
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: (err) => {
			toast.error(err.response?.data?.message || "Failed to update profile");
		},
	});

	return { updateProfile, isPending };
};

export default useUpdateProfile;
