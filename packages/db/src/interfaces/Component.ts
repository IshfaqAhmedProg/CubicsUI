import { Environment } from "./CUIConfig.js";

export type Component = {
  id: string;
  name: string;
  aliases: string[];
  desc: string;
  categories: string[];
  supportedEnvs: Environment[];
  code: string;
};
