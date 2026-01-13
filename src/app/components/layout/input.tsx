import React from "react";
import styles from "./input.module.css";
import { useTheme } from "@/app/ThemeProvider";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  const { dark } = useTheme();
  const className = dark ? `${styles.input} ${styles.inputDark}` : styles.input;

  return <input {...props} className={className} />;
}
