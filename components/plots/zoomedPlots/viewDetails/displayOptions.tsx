import React, { useEffect, useContext } from 'react';
import { Switch } from 'antd';

import { SizeChanger } from '../../../sizeChanger';
import { CutomFormItem } from '../../../styledComponents';
import { store } from '../../../../contexts/rightSideContext';

interface DisplayOptionsProps {}

export const DisplayOptions = () => {
  const { setJSROOTmode, size, setSize } = useContext(store);

  useEffect(() => {
    return () => setJSROOTmode(false);
  }, []);

  return (
    <div>
      <CutomFormItem name="SizeChanger" label="Size">
        <SizeChanger currentValue={size} setSize={setSize} />
      </CutomFormItem>
      <hr />
      <CutomFormItem name="Jsroot" label="JSROOT">
        <Switch
          checkedChildren="JSROOT enabled"
          unCheckedChildren="JSROOT disabled"
          onChange={(e) => {
            setJSROOTmode(e);
          }}
        />
      </CutomFormItem>
    </div>
  );
};
