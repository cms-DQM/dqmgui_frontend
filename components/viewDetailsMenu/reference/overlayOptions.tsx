import React, { useEffect } from 'react';
import { Select } from 'antd';
import Router from 'next/router';
import { useRouter } from 'next/router';

import { overlayOptions } from '../../constants';
import {
  OptionProps,
  QueryProps,
} from '../../../containers/display/interfaces';
import { StyledSelect } from '../styledComponents';

const { Option } = Select

export const OverlayOptions = () => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const settedOverlay = query.overlay ? query.overlay : overlayOptions[0].value;

  const [value, setValue] = React.useState(settedOverlay);

  useEffect(() => {
    Router.replace({
      pathname: '/',
      query: {
        run_number: query.run_number,
        dataset_name: query.dataset_name,
        folder_path: query.folder_path,
        overlay: value,
        overlay_data: query.overlay_data,
        selected_plots: query.selected_plots,
      },
    });
  }, [value])

  return (
    <StyledSelect
      onChange={(e: any) => {
        setValue(e);
      }}
      value={value}
    >
      {overlayOptions.map((option: OptionProps) => {
        return (
          <Option
            value={option.value}
            key={option.toString()}>
            <div>{option.label}</div>
          </Option>
        );
      })}
    </StyledSelect>
  );
};
