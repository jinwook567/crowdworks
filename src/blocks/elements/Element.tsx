import * as table from "./register";

type Table = typeof table;

export type ElementType = keyof typeof table;

export const elementTypes = Object.keys(table) as ElementType[];

export type ElementConfig<T extends ElementType> = Parameters<Table[T]>[0];

type Props<T extends ElementType> = ElementConfig<T>;

function Element<T extends ElementType>(props: Props<T>) {
  const Component = table[props.type] as (
    props: Props<T>
  ) => ReturnType<Table[T]>;
  return <Component {...props} />;
}

export default Element;
