import * as table from "./register";

type Table = typeof table;

export type DocumentType = keyof typeof table;

export const elementTypes = Object.keys(table) as DocumentType[];

export type DocumentProps<T extends DocumentType> = Parameters<Table[T]>[0];

type Props<T extends DocumentType> = DocumentProps<T>;

function Document<T extends DocumentType>(props: Props<T>) {
  const Component = table[props.type] as (
    props: Props<T>
  ) => ReturnType<Table[T]>;
  return <Component {...props} />;
}

export default Document;
