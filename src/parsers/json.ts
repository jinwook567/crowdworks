import { type Props as WorkspaceProps } from "../workspace/Workspace";

export const parse = (json: any): WorkspaceProps => {
  const texts = json.texts.map((t: any) => ({
    type: "text",
    id: t.self_ref,
    bbox: t.prov[0].bbox,
    level: t.level,
    text: t.text,
  }));

  const pictures = json.pictures.map((p: any) => ({
    type: "picture",
    id: p.self_ref,
    bbox: p.prov[0].bbox,
    width: p.image.size.width,
    height: p.image.size.height,
    src: p.image.uri,
  }));

  const tables = json.tables.map((t: any) => {
    const data = t.data.table_cells.map((cell: any) => ({
      node: cell.text,
      colSpan: cell.col_span,
      rowSpan: cell.row_span,
      cIndex: cell.start_col_offset_idx,
      rIndex: cell.start_row_offset_idx,
    }));

    const arr = data.reduce((acc: any, cur: any) => {
      if (!acc[cur.rIndex]) {
        acc[cur.rIndex] = [];
      }
      acc[cur.rIndex][cur.cIndex] = cur;
      return acc;
    }, []);

    return {
      type: "table",
      id: t.self_ref,
      bbox: t.prov[0].bbox,
      columns: arr[0],
      rows: arr.slice(1),
    };
  });

  const height = json.pages["1"].size.height;

  const toTopLeftBox = (bbox: any) => {
    const top = height - bbox.t;
    const left = bbox.l;
    const bottom = height - bbox.b;
    const right = bbox.r;

    return [top, right, bottom, left];
  };

  const elements = [...texts, ...tables, ...pictures];

  const allCoordData = elements.map(
    (el) => [el.id, toTopLeftBox(el.bbox)] as [any, any]
  );

  const groups = json.groups.map((g: any) => ({
    id: g.self_ref,
    type: "group",
    elements: g.children.map((child: any) =>
      elements.find((el) => el.id === child.$ref)
    ),
  }));

  const allBlocks = [...elements, ...groups];

  const blocks = json.body.children
    .map((child: any) => allBlocks.find((b) => b.id === child.$ref))
    .filter((v: any) => v);

  const coordBlocks = blocks.flatMap((block: any) =>
    block.type === "group" ? block.elements : block
  );

  const coordData = coordBlocks
    .map((b: any) => allCoordData.find((d) => d[0] === b.id))
    .filter((v: any) => v);

  const document = {
    type: json.origin.mimetype.split("/")[1],
    page: 1,
    file: `/${json.origin.filename}`,
    boxes: coordData.map((coord: any) => coord[1]),
  };

  return { document, blocks, coordData };
};
