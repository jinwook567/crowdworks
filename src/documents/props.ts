export type BaseProps = {
  page: number;
  onLoad?: (arg: { pages: number }) => void;
  width?: number;
  height?: number;
};
