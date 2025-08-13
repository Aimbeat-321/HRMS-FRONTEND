import React from "react";

const colors = {
  text: {
    grey: "text-[#808080]",
    white: "text-[#F5F5F5]",
    black: "text-[#333333]",
  },
  bg: {
    white: "bg-white",
    grey: "bg-[#4D4D4D]",
    lightgrey: "bg-[#E6E6E6]",
  },
} as const;

type TextColor = keyof typeof colors.text;
type BgColor = keyof typeof colors.bg;

type TagProps = {
  text: string;
  textColor?: TextColor;
  bgColor?: BgColor;
};

const Tag: React.FC<TagProps> = ({
  text,
  textColor = "grey",
  bgColor = "white",
}) => {
  return (
    <label
      className={`
        ${colors.text[textColor]} 
        ${colors.bg[bgColor]} 
        tags
      `}
    >
      {text}
    </label>
  );
};

export default Tag;
