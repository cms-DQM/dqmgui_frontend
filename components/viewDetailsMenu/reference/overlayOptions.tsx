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

interface OverlayOptionsProps {
  setPositionNotGlobally?(value: string): void;
  settedOverlay: string;
}

export const OverlayOptions = ({ setPositionNotGlobally, settedOverlay }: OverlayOptionsProps) => {
  const globalState = useContext(store);
  const { setOverlaiPosition, overlayPosition } = globalState;
  const set_position = setPositionNotGlobally ? setPositionNotGlobally : setOverlaiPosition
  
  const [value, setValue] = React.useState(settedOverlay);
  useChangeRouter({ overlay: overlayPosition }, [], true);
  useChangeRouter({ overlay: overlayPosition }, [overlayPosition], true);

  useEffect(() => {
    set_position(value);
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
