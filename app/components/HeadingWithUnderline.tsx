import React from "react";
import AnimatedUnderline from "./AnimatedUnderline";

interface HeadingWithUnderlineProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const HeadingWithUnderline: React.FC<HeadingWithUnderlineProps> = ({
  level,
  children,
  className = "",
  style = {},
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <div className="heading-container max-w-full overflow-hidden">
      <Tag className={`${className} break-words`} style={style}>
        {children}
      </Tag>
      <AnimatedUnderline />
    </div>
  );
};

export default HeadingWithUnderline;
