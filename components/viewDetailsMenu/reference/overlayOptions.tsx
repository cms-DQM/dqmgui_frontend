import React from 'react';
import { Select } from 'antd';
import { useRouter } from 'next/router';

import { overlayOptions } from '../../constants';
import {
  OptionProps,
  QueryProps,
} from '../../../containers/display/interfaces';
import { StyledSelect } from '../styledComponents';
import { useChangeRouter } from '../../../hooks/useChangeRouter';

const { Option } = Select;

export const OverlayOptions = () => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const settedOverlay = query.overlay ? query.overlay : overlayOptions[0].value;

  const [value, setValue] = React.useState(settedOverlay);
  useChangeRouter({ overlay: value }, [value], true);

  return (
    <StyledSelect
      onChange={(e: any) => {
        setValue(e);
      }}
      value={value}
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
