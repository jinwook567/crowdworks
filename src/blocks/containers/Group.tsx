import type { PropsWithChildren } from "react";
import type { BaseConfig } from "../config";

export type GroupConfig<Child> = BaseConfig & {
  type: "group";
  elements: Child[];
};

function Group<Child>({ children }: PropsWithChildren<GroupConfig<Child>>) {
  return <div>{children}</div>;
}

export default Group;
