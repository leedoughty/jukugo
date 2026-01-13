"use client";

import React from "react";
import styles from "./quizLayout.module.css";

type QuizLayoutProps = {
  children: React.ReactNode;
};

export default function QuizLayout({ children }: QuizLayoutProps) {
  return (
    <div className={styles.container}>
      <main className={styles.quizMain}>{children}</main>
    </div>
  );
}
