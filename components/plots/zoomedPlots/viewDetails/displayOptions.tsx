import React from 'react';
import { Switch } from 'antd';

import { SizeChanger } from '../../../sizeChanger';
import {
  setJSROOTMode,
  setZoomedPlotSize,
} from '../../../../reducers/displayFolderOrPlot';
import { sizes } from '../../../constants';
import { CheckboxesWrapper } from '../../../viewDetailsMenu/styledComponents';

interface DisplayOptionsProps {
  jsroot_mode: boolean;
  dispatch: any;
}

export const DisplayOptions = ({ dispatch }: DisplayOptionsProps) => {
  return (
    <div>
      <CheckboxesWrapper>
        <SizeChanger
          dispatch={dispatch}
          setSize={setZoomedPlotSize}
          currentValue={sizes.large.size}
        />
      </CheckboxesWrapper>
      <CheckboxesWrapper>
        <Switch
          checkedChildren="JSROOT enabled"
          unCheckedChildren="JSROOT disabled"
          onChange={(e) => {
            setJSROOTMode(e)(dispatch);
          }}
        />
      </CheckboxesWrapper>
    </div>
  );
};
