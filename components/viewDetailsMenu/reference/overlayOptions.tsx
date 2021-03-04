import React, { useEffect, useContext } from 'react';
import { Select } from 'antd';
import { useRouter } from 'next/router';

import { overlayOptions } from '../../constants';
import {
  OptionProps,
  QueryProps,
} from '../../../containers/display/interfaces';
import { StyledSelect } from '../styledComponents';

const { Option } = Select;

interface OvelrayOptions {
  setOverlaiPosition(overlayPosition: string): void;
  overlayPosition: string
}

export const OverlayOptions = ({ overlayPosition, setOverlaiPosition }: OvelrayOptions) => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const [value, setValue] = React.useState(overlayPosition);

  useEffect(() => {
    setOverlaiPosition(value)
  }, [value])

  return (
    <StyledSelect
      onChange={(e: any) => {
        setValue(e);
      }}
      value={query.overlay}
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
