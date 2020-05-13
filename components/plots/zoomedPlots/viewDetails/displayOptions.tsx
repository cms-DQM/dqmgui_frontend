import React from 'react';
import { Switch } from 'antd';

import { SizeChanger } from '../../../sizeChanger';
import {
  setJSROOTMode,
  setZoomedPlotSize,
} from '../../../../reducers/displayFolderOrPlot';
import { sizes } from '../../../constants';
import { CheckboxesWrapper } from '../../../viewDetailsMenu/styledComponents';
import FormItem from 'antd/lib/form/FormItem';

interface DisplayOptionsProps {
  jsroot_mode: boolean;
  dispatch: any;
}

export const DisplayOptions = ({ dispatch }: DisplayOptionsProps) => {
  return (
    <div>
      <FormItem
        name="SizeChanger"
        label="Size">
        <SizeChanger
          dispatch={dispatch}
          setSize={setZoomedPlotSize}
          currentValue={sizes.large.size}
        />
      </FormItem>
      <hr/>
      <FormItem
        name="Jsroot"
        label="JSROOT">
        <Switch
          checkedChildren="JSROOT enabled"
          unCheckedChildren="JSROOT disabled"
          onChange={(e) => {
            setJSROOTMode(e)(dispatch);
          }}
        />
      </FormItem>
    </div>
  );
};
