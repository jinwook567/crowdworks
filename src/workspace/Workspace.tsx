import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Document, { type Coord, type Props as DocumentProps } from "./Document";
import Block, { type BaseProps as BlockProps } from "./Block";

export type Props = {
  document: Omit<
    DocumentProps,
    "onBoxHoverEnter" | "onBoxHoverLeave" | "isSelected"
  >;
  blocks: BlockProps[];
  coordData: [BlockProps["id"], Coord][];
};

function Workspace({ document, blocks, coordData }: Props) {
  const [selectedId, setSelectedId] = useState<BlockProps["id"] | null>(null);

  const isSelected = (id: string) => selectedId === id;

  const coordToId = (coordToFind: Coord) => {
    return coordData.find(([_, coord]) =>
      coord.every((x, i) => x === coordToFind[i])
    )![0];
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [document]);

  return (
    <WorkspaceContainer>
      <DocumentContainer>
        <DocumentWrapper ref={ref}>
          <Document
            {...document}
            isSelected={(coord) => isSelected(coordToId(coord))}
            onBoxHoverEnter={(coord) => setSelectedId(coordToId(coord))}
            onBoxHoverLeave={() => setSelectedId(null)}
          />
        </DocumentWrapper>
      </DocumentContainer>
      <FrameContainer
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelectedId(null);
        }}
      >
        {blocks.map((block) => (
          <Block {...block} onClick={setSelectedId} isSelected={isSelected} />
        ))}
      </FrameContainer>
    </WorkspaceContainer>
  );
}

const WorkspaceContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const DocumentWrapper = styled.div`
  height: 200vh;
  display: flex;
  align-items: center;
`;

const DocumentContainer = styled.div`
  flex: 1;
  padding: 20px;
  background: lightGray;
  height: 100vh;
  overflow: auto;
`;

const FrameContainer = styled.div`
  flex: 1;
  padding: 20px;
  min-width: 400px;
  height: 100vh;
  overflow: auto;
`;

export default Workspace;
