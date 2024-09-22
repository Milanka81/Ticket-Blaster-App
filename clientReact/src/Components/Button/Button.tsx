import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  className: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, className, onClick, ...rest }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
