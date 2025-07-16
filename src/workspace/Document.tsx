import styled from "styled-components";
import DocumentComponent, {
  type DocumentType,
  type DocumentProps,
} from "../documents/Document";
import Frame from "./Frame";
import { useState } from "react";

// top,right,bottom,left
export type Coord = [number, number, number, number];

export type Props = DocumentProps<DocumentType> & {
  boxes: Coord[];
  onBoxHoverEnter: (coord: Coord) => void;
  onBoxHoverLeave: (coord: Coord) => void;
  isSelected: (coord: Coord) => boolean;
};

function Document({
  boxes,
  onBoxHoverEnter,
  onBoxHoverLeave,
  isSelected,
  ...props
}: Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Container
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <DocumentComponent {...props} />
      {boxes.map((coord) => (
        <Box
          coord={coord}
          onMouseEnter={() => onBoxHoverEnter(coord)}
          onMouseLeave={() => onBoxHoverLeave(coord)}
          shouldFocus={!isHover && isSelected(coord)}
          scrollPos="center"
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const Box = styled(Frame)<{ coord: Coord }>`
  width: ${(props) => props.coord[1] - props.coord[3]}px;
  height: ${(props) => props.coord[2] - props.coord[0]}px;
  position: absolute;
  top: ${(props) => props.coord[0]}px;
  left: ${(props) => props.coord[3]}px;
  opacity: 0.5;
  ${(props) =>
    props.shouldFocus &&
    `
    outline: 2px solid black;
    background-color: yellow;
    `}

  &:hover {
    outline: 2px solid black;
    background-color: yellow;
  }
`;

export default Document;
