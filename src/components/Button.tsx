import React from "react";

interface ButtonProps {
  type?: "button" | "submit";
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  disabled = false,
  loading = false,
  className = "",
  ariaLabel,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${className} ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      aria-label={ariaLabel}
    >
      {loading ? "Laden..." : children}
    </button>
  );
};

export default Button;
