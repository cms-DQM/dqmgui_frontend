import React from 'react';
import { Switch } from 'antd';

import { SizeChanger } from '../../sizeChanger';
import {
  setJSROOTMode,
  setZoomedPlotSize,
} from '../../../reducers/displayFolderOrPlot';
import { sizes } from '../../constants';

interface DisplayOptionsProps {
  jsroot_mode: boolean;
  dispatch: any;
}

export const DisplayOptions = ({ dispatch }: DisplayOptionsProps) => {
  return (
    <div>
      <SizeChanger
        dispatch={dispatch}
        setSize={setZoomedPlotSize}
        currentValue={sizes.fill.size}
      />
      <div>
        <Switch
          checkedChildren="JSROOT enabled"
          unCheckedChildren="JSROOT disabled"
          onChange={(e) => {
            setJSROOTMode(e)(dispatch);
          }}
        />
      </div>
    </div>
  );
};
