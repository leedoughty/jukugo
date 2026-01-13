import React from "react";
import styles from "./sidebar.module.css";

type SidebarProps = {
  children: React.ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  return <div className={styles.sidebar}>{children}</div>;
}
