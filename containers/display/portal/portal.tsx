import { useState, useEffect, ReactElement } from "react";
import ReactDOM from "react-dom";

interface PlotPortalProps {
  setIsPortalWindowOpen(open: boolean): void;
  children: ReactElement
}

const PlotPortal = ({ setIsPortalWindowOpen, children }: PlotPortalProps) => {
  const [containerEl] = useState(document.createElement("div"));
  let externalWindow: null | Window = null;

  useEffect(
    () => {
      externalWindow = window.open(
        "",
        "",
      );

      externalWindow?.document.body.appendChild(containerEl);
      externalWindow?.addEventListener("beforeunload", () => {
        setIsPortalWindowOpen(false);
      });
      console.log("Created Popup Window");
      return function cleanup() {
        console.log("Cleaned up Popup Window");
        externalWindow?.close();
        externalWindow = null;
      };
    },
    []
  );
  return ReactDOM.createPortal(children, containerEl);
};

export default PlotPortal;
