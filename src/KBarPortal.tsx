import * as React from "react";
import { createPortal } from "react-dom";
import { VisualState } from "./types";
import { useKBar } from "./useKBar";

interface Props {
  children: React.ReactNode;
}

export function KBarPortal(props: Props) {
  const { showing } = useKBar((state) => ({
    showing: state.visualState !== VisualState.hidden,
  }));

  const [target, setTarget] = React.useState<HTMLDivElement | undefined>();

  React.useLayoutEffect(() => {
    if (!showing) {
      return;
    }

    const element = document.createElement("div");
    document.body.append(element);
    setTarget(element);

    return () => {
      element.remove();
      setTarget(undefined);
    };
  }, [showing]);

  if (!target) {
    return null;
  }

  return createPortal(props.children, target);
}
