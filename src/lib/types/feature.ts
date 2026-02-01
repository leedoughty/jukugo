export type Feature = {
  key: string;
  icon: React.ReactNode;
  content?: React.ReactNode;
  label: string;
  action?: () => void;
  instant?: boolean;
};
