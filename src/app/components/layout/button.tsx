"use client";

import React from "react";
import styles from "./button.module.css";
import { useTheme } from "@/app/ThemeProvider";

type ButtonProps = React.ComponentPropsWithRef<"button">;

export default function Button({ ref, ...props }: ButtonProps) {
  const { dark } = useTheme();
  const className = `${styles.button} ${dark ? styles.buttonDark : ""}`;

  return <button type="button" {...props} ref={ref} className={className} />;
}
