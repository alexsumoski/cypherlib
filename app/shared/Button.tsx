import React, { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  icon?: ReactNode;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className = "",
  icon,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 bg-black text-white border-[1px] rounded border-white px-4 py-2 transition duration-300 ease-in-out transform hover:bg-white hover:text-black hover:-translate-y-1 ${className}`}
    >
      {children} {icon}
    </button>
  );
};

export default Button;
