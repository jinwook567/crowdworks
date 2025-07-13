import GroupComponent, { type GroupConfig } from "./Group";
import Element, {
  type ElementConfig,
  type ElementType,
} from "../elements/Element";
import { createElement } from "react";

type Children = {
  children: (Elements: React.ReactNode[]) => React.ReactNode;
};

export const group = (
  props: GroupConfig<ElementConfig<ElementType>> & Children
) => {
  const { children, ...config } = props;
  return createElement(
    GroupComponent,
    config,
    children(config.elements.map(Element))
  );
};
