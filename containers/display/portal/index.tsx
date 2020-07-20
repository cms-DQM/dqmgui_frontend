import * as React from 'react';
import PlotPortal from './portal';

interface Plot_portal_props {
  isPortalWindowOpen: boolean;
  setIsPortalWindowOpen(open: boolean): void;
  children: any
}

export const Plot_portal = ({ isPortalWindowOpen, setIsPortalWindowOpen, children }: Plot_portal_props) => {
  const [containerEl] = React.useState(document.createElement('div'));

  return (
    <>
      {isPortalWindowOpen &&
        <PlotPortal setIsPortalWindowOpen={setIsPortalWindowOpen}>
          <div>
            {children}
        </div>
        </PlotPortal>
      }
    </>
  )
}