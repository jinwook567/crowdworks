import Container, {
  containerTypes,
  type ContainerConfig,
  type ContainerType,
} from "../blocks/containers/Container";
import Element, {
  type ElementConfig,
  type ElementType,
} from "../blocks/elements/Element";
import { type BaseConfig } from "../blocks/config";
import Frame from "./Frame";
import styled from "styled-components";

export type BaseProps =
  | ContainerConfig<ContainerType>
  | ElementConfig<ElementType>;

export type Props = BaseProps & {
  onClick: (id: BaseConfig["id"]) => void;
  isSelected: (id: BaseConfig["id"]) => boolean;
};

function Block({ onClick, isSelected, ...props }: Props) {
  return (
    <>
      {isContainer(props) ? (
        <Container {...props}>
          {(elements) =>
            elements.map((el, i) => (
              <BlockFrame
                onClick={() => onClick(props.elements[i].id)}
                shouldFocus={isSelected(props.elements[i].id)}
                scrollPos="nearest"
              >
                {el}
              </BlockFrame>
            ))
          }
        </Container>
      ) : (
        <BlockFrame
          onClick={() => onClick(props.id)}
          shouldFocus={isSelected(props.id)}
          scrollPos="nearest"
        >
          <Element {...props} />
        </BlockFrame>
      )}
    </>
  );
}

const BlockFrame = styled(Frame)`
  background: ${(props) =>
    props.shouldFocus ? "rgba(255, 255, 0, 0.5)" : "transparent"};
`;

function isContainer(config: {
  type: string;
}): config is ContainerConfig<ContainerType> {
  return containerTypes.some((type) => type === config.type);
}

export default Block;
