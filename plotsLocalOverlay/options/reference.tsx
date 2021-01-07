import * as React from 'react';
import { NextRouter } from 'next/router';

import { JSROOTSwitch } from './jsrootSwitch';
import { OverlayPositionSelection } from './overlayPositionSelectionProps';
import { SizeSelection } from './sizeSelection';
import { CheckBox } from './checkBox'


interface ReferenceProps {
  router: NextRouter
}

export const Reference = ({ router }: ReferenceProps) => {
  const { query } = router

  const checkBoxes = [{
    label: 'Normalize',
    value: query.normalize === 'true' ? true : false
  },
  {
    label: 'Stats',
    value: query.stats === 'true' ? true : false
  },
  {
    label: 'Error',
    value: query.error === 'true' ? true : false
  }]


  return <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex' }}>
      <div><SizeSelection
        router={router}
      /></div>
      <div>
        <OverlayPositionSelection
          router={router}
        />
      </div>
      <div><JSROOTSwitch
        router={router}
      /></div>
    </div>
    <div style={{ display: 'flex' }}>
      {
        checkBoxes.map((checkBox) =>
          <div key={checkBox.label}>
            <CheckBox option={checkBox}
              router={router}
            /></div>
        )
      }
    </div>
  </div>
}