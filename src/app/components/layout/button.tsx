import React, { forwardRef } from "react";
import styles from "./button.module.css";
import { useTheme } from "@/app/ThemeProvider";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { dark } = useTheme();
  const className = `${styles.button} ${dark ? styles.buttonDark : ""}`;

  return <button ref={ref} {...props} className={className} />;
});

Button.displayName = "Button";

export default Button;
