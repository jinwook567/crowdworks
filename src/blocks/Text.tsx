import { createElement } from "react";
import type { BaseConfig } from "./config";

type TextConfig = BaseConfig & {
  type: "text";
  level?: 1 | 2 | 3 | 4 | 5;
  text: string;
};

function Text({ level, text }: TextConfig) {
  return createElement(level ? `h${level}` : "p", null, text);
}

export default Text;
