import React, { forwardRef } from "react";
import styles from "./input.module.css";
import { useTheme } from "@/app/ThemeProvider";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { dark } = useTheme();
  const className = dark ? `${styles.input} ${styles.inputDark}` : styles.input;

  return <input ref={ref} {...props} className={className} />;
});

Input.displayName = "Input";

export default Input;
