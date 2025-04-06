import React from "react";
import {
  IconHappy,
  IconMid,
  IconSad,
  IconVeryHappy,
  IconVerySad,
} from "./Svgs";

interface MoodIconProps {
  moodScore: number;
}

const MoodIcon: React.FC<MoodIconProps> = ({ moodScore }) => {
  // Determine which icon to display based on the mood score
  let icon;
  if (moodScore <= 20) {
    icon = <IconVerySad className="size-8 ml-2" />;
  } else if (moodScore <= 40) {
    icon = <IconSad className="size-8 ml-2" />;
  } else if (moodScore <= 60) {
    icon = <IconMid className="size-9 ml-2" />;
  } else if (moodScore <= 80) {
    icon = <IconHappy className="size-10 ml-2" />;
  } else {
    icon = <IconVeryHappy className="size-8 ml-2" />;
  }

  return (
    <div className="group relative">
      {/* Icon with hover effect */}
      {icon}

      {/* Display score on hover with animation */}
      <span className="absolute opacity-0 group-hover:opacity-100 text-xs text-white bg-black p-1 rounded-md bottom-[-1rem] left-1/2 transform -translate-x-1/2 translate-y-5 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
        {moodScore}
      </span>
    </div>
  );
};

export default MoodIcon;
