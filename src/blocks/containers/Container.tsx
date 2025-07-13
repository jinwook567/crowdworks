import * as table from "./register";

type Table = typeof table;

export type ContainerType = keyof typeof table;

export const containerTypes = Object.keys(table) as ContainerType[];

type Props<T extends ContainerType> = Parameters<Table[T]>[0];

export type ContainerConfig<T extends ContainerType> = Omit<
  Parameters<Table[T]>[0],
  "children"
>;

function Container<T extends ContainerType>(props: Props<T>) {
  const Component = table[props.type] as (
    props: Props<T>
  ) => ReturnType<Table[T]>;
  return <Component {...props} />;
}

export default Container;
