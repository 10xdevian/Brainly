import { type ReactElement } from "react";

interface ButtonInterface {
  title: string;
  size: "lg" | "md" | "sm";
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  variant: "primary" | "secondary";
}

const sizeStyles = {
  lg: "px-8 py-4 text-xl rounded-xl",
  md: "rounded-md",
  sm: "rounded-sm",
};

const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-400 text-purple-600",
};

const defaultButton = "p-3 m-1 ";


function Button(props: ButtonInterface) {
  return (
    <button
      className={`${sizeStyles[props.size]} ${
        variantStyles[props.variant]
      } cursor-pointer py-3 `}
    >
      <div className="flex  items-center">
        {props.startIcon}
        <div className="pl-2 pr-2">{props.title}</div>
        <div className="">{props.endIcon}</div>
      </div>
    </button>
  );
}

export default Button;
