import styles from "./errorMessage.module.css";

type ErrorMessageProps = {
  children: React.ReactNode;
};

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return <div className={styles.error}>{children}</div>;
}
