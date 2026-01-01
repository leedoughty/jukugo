import React from "react";
import styles from "./button.module.css";
import { useTheme } from "@/app/ThemeProvider";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
  const { dark } = useTheme();
  const className = `${styles.button} ${dark ? styles.buttonDark : ""}`;

  return <button {...props} className={className} />;
}
