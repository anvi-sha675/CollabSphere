import { PhoneIcon } from "lucide-react";

function AudioCallButton({ handleAudioCall }) {
  return (
    <div className="p-3 border-b flex items-center justify-end max-w-7xl mx-auto w-full absolute top-0">
      <button
        onClick={handleAudioCall}
        className="btn btn-primary btn-sm text-white"
      >
        <PhoneIcon className="size-6" />
      </button>
    </div>
  );
}

export default AudioCallButton;