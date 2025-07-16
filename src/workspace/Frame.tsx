import { useEffect, useRef } from "react";

type Props = {
  shouldFocus: boolean;
  scrollPos: ScrollLogicalPosition;
} & React.HTMLAttributes<HTMLDivElement>;

function Frame({ shouldFocus, scrollPos, children, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldFocus && ref.current) {
      ref.current.focus();
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: scrollPos,
      });
    }
  }, [shouldFocus]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}

export default Frame;
