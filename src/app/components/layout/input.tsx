"use client";

import React from "react";
import styles from "./input.module.css";
import { useTheme } from "@/app/ThemeProvider";

type InputProps = React.ComponentPropsWithRef<"input">;

export default function Input({ ref, ...props }: InputProps) {
  const { dark } = useTheme();
  const className = dark ? `${styles.input} ${styles.inputDark}` : styles.input;

  return <input ref={ref} {...props} className={className} />;
}
