import React from 'react';
import { Radio } from 'antd';

import { overlayOptions } from '../../constants';
import { OptionProps, QueryProps } from '../../../containers/display/interfaces';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface OverlayOptionsProps {
  current_value?: any;
  dispatch_gloabl: any;
}

export const OverlayOptions = ({
}: OverlayOptionsProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const settedOverlay = query.overlay ? query.overlay : overlayOptions[0].value

  const [value, setValue] = React.useState(settedOverlay);

  return (
    <Radio.Group
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
    >
      {overlayOptions.map((option: OptionProps) => {
        return (
          <Link
            key={option.label}
            href={{
              pathname: '/',
              query: {
                run_number: query.run_number,
                dataset_name: query.dataset_name,
                folder_path: query.folder_path,
                overlay: option.value,
                overlay_data: query.overlay_data,
                selected_plots: query.selected_plots,
              }
            }}
          >
            <Radio value={option.value}>
              {option.label}
            </Radio>
          </Link>
        );
      })}
    </Radio.Group>
  );
};
