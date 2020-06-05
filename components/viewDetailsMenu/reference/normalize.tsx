import * as React from 'react';
import FormItem from 'antd/lib/form/FormItem';

import { CustomCheckbox } from '../../styledComponents';
import { store } from '../../../contexts/leftSideContext';

export const NormalizeCheckbox = () => {
  const leftSideState = React.useContext(store);
  const { normalize, setNormalize } = leftSideState;

  return (
    <FormItem>
      <CustomCheckbox
        onClick={(e: any) => setNormalize(e.target.checked)}
        checked={normalize}
      >
        Normalize
      </CustomCheckbox>
    </FormItem>
  );
};
