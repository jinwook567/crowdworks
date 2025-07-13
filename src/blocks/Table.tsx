import type { BaseConfig } from "./config";

type Cell = {
  colSpan?: number;
  rowSpan?: number;
  node: React.ReactNode;
};

export type TableConfig = BaseConfig & {
  type: "table";
  columns: Cell[];
  rows: Cell[][];
};

function Table({ columns, rows }: TableConfig) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ node, ...props }) => (
            <th {...props}>{node}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr>
            {row.map(({ node, ...props }) => (
              <td {...props}>{node}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
