import { useState, useEffect, ReactElement } from 'react';
import ReactDOM from 'react-dom';

interface PlotPortalProps {
  setIsPortalWindowOpen(open: boolean): void;
  children: ReactElement;
  title: string;
}

const PlotPortal = ({
  setIsPortalWindowOpen,
  children,
  title,
}: PlotPortalProps) => {
  const [containerEl] = useState(document.createElement('div'));
  let externalWindow: any | Window = null;

  useEffect(() => {
    externalWindow = window.open('', '');
    externalWindow.document.title = title;

    externalWindow?.document.body.appendChild(containerEl);
    externalWindow?.addEventListener('beforeunload', () => {
      setIsPortalWindowOpen(false);
    });
    return function cleanup() {
      externalWindow?.close();
      externalWindow = null;
    };
  }, []);
  return ReactDOM.createPortal(children, containerEl);
};

export default PlotPortal;
