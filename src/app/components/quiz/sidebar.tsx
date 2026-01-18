import React, { useState } from "react";
import styles from "./sidebar.module.css";

type Feature = {
  key: string;
  icon: React.ReactNode;
  content?: React.ReactNode;
  label: string;
  action?: () => void;
  instant?: boolean;
};

type SidebarProps = {
  features: Feature[];
  defaultOpen?: string;
  darkMode?: boolean;
};

export default function Sidebar({
  features,
  defaultOpen,
  darkMode,
}: SidebarProps) {
  const initialOpen = defaultOpen
    ? Array.isArray(defaultOpen)
      ? defaultOpen
      : [defaultOpen]
    : features[0]?.key
      ? [features[0].key]
      : [];
  const [openKeys, setOpenKeys] = useState<string[]>(initialOpen);

  const handleToggle = (key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  return (
    <div className={`${styles.sidebar} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.buttonBar}>
        {features.map((f) => (
          <button
            key={f.key}
            className={`${styles.iconButton} ${openKeys.includes(f.key) ? styles.active : ""} ${darkMode ? styles.darkBtn : ""}`}
            aria-label={f.label}
            onClick={() => {
              if (f.instant && f.action) {
                f.action();
              } else {
                handleToggle(f.key);
              }
            }}
            type="button"
          >
            {f.icon}
          </button>
        ))}
      </div>
      <div
        className={`${styles.featureContent} ${darkMode ? styles.darkContent : ""}`}
      >
        {features.map(
          (f) =>
            !f.instant &&
            openKeys.includes(f.key) && <div key={f.key}>{f.content}</div>,
        )}
      </div>
    </div>
  );
}
