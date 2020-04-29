import React from 'react';
import { Radio } from 'antd';

import { overlayOptions } from '../../constants';
import { setOverlay } from '../../../reducers/displayFolderOrPlot';
import { OptionProps, QueryProps } from '../../../containers/display/interfaces';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface OverlayOptionsProps {
  current_value?: any;
  dispatch_gloabl: any;
}

export const OverlayOptions = ({
  dispatch_gloabl,
}: OverlayOptionsProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const settedOverlay = query.overlay ? query.overlay : overlayOptions[0].value
  
  const [value, setValue] = React.useState(settedOverlay);

  return (
    <Radio.Group
      onChange={(e) => {
        setOverlay(e.target.value)(dispatch_gloabl)
        setValue(e.target.value);
      }}
      value={value}
    >
      {overlayOptions.map((option: OptionProps) => {
        return (
          <Link
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
            <Radio key={option.label} value={option.value}>
              {option.label}
            </Radio>
          </Link>
        );
      })}
    </Radio.Group>
  );
};
