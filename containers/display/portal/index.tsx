import * as React from 'react';
import PlotPortal from './portal';

interface Plot_portal_props {
  isPortalWindowOpen: boolean;
  setIsPortalWindowOpen(open: boolean): void;
  children: any;
  title: string;
}

export const Plot_portal = ({
  isPortalWindowOpen,
  setIsPortalWindowOpen,
  children,
  title,
}: Plot_portal_props) => {

  return (
    <>
      {isPortalWindowOpen && (
        <PlotPortal setIsPortalWindowOpen={setIsPortalWindowOpen} title={title}>
          <div>{children}</div>
        </PlotPortal>
      )}
    </>
  );
};
