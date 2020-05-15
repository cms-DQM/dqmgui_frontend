import React from 'react';
import { Switch } from 'antd';

import { SizeChanger } from '../../../sizeChanger';
import {
  setJSROOTMode,
  setZoomedPlotSize,
} from '../../../../reducers/displayFolderOrPlot';
import { sizes } from '../../../constants';
import { CutomFormItem } from '../../../styledComponents';

interface DisplayOptionsProps {
  jsroot_mode: boolean;
  dispatch: any;
}

export const DisplayOptions = ({ dispatch }: DisplayOptionsProps) => {
  return (
    <div>
      <CutomFormItem
        color="white"
        name="SizeChanger"
        label="Size">
        <SizeChanger
          dispatch={dispatch}
          setSize={setZoomedPlotSize}
          currentValue={sizes.large.size}
        />
      </CutomFormItem>
      <hr  />
      <CutomFormItem
        color="white"
        name="Jsroot"
        label="JSROOT">
        <Switch
          checkedChildren="JSROOT enabled"
          unCheckedChildren="JSROOT disabled"
          onChange={(e) => {
            setJSROOTMode(e)(dispatch);
          }}
        />
      </CutomFormItem>
    </div>
  );
};
