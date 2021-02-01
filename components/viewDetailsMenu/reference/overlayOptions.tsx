import React, { useEffect, useContext } from 'react';
import { Select } from 'antd';
import { useRouter } from 'next/router';

import { overlayOptions } from '../../constants';
import {
  OptionProps,
  QueryProps,
} from '../../../containers/display/interfaces';
import { StyledSelect } from '../styledComponents';
import { useChangeRouter } from '../../../hooks/useChangeRouter';
import { store } from '../../../contexts/leftSideContext';

const { Option } = Select;

export const OverlayOptions = () => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const settedOverlay = query.overlay ? query.overlay : overlayOptions[0].value;

  const globalState = useContext(store);
  const { setOverlaiPosition } = globalState;

  const [value, setValue] = React.useState(settedOverlay);
  useChangeRouter({ overlay: value }, [], true);
  useChangeRouter({ overlay: value }, [value], true);

  useEffect(() => {
    setOverlaiPosition(value);
  }, [value]);

  return (
    <StyledSelect
      onChange={(e: any) => {
        setValue(e);
      }}
      value={settedOverlay}
    >
      {overlayOptions.map((option: OptionProps) => {
        return (
          <Option value={option.value} key={option.toString()}>
            <div>{option.label}</div>
          </Option>
        );
      })}
    </StyledSelect>
  );
};
