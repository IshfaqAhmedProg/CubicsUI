import { ReactNode } from "react";

export interface Suggestion {
  itemName: string;
  title: string;
  icon?: ReactNode;
  desc?: string;
  sample?: string;
}
