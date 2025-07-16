import type { BaseConfig } from "../config";

type Props = BaseConfig & {
  type: "picture";
  width?: number;
  height?: number;
  src: string;
};

function Picture({ width, height, src }: Props) {
  return <img src={src} width={width} height={height} />;
}

export default Picture;
