import React, { useEffect } from 'react';
import { Collapse, Divider } from 'antd';
import { useRouter } from 'next/router';

import { Reference } from './reference/reference';
import { SizeChanger } from '../sizeChanger';
import { setSize } from '../../reducers/displayFolderOrPlot';
import { setPlotToOverlay } from '../../reducers/displayFolderOrPlot';
import { sizes } from '../constants';
import { QueryProps } from '../../containers/display/interfaces';
import { formTriples } from './utils';
import FormItem from 'antd/lib/form/FormItem';


interface ViewDetailsMenuProps {
  dispatch: any;
  state: any;
  overlay_plot: any[];
}

export const ViewDetailsMenu = ({ dispatch, state }: ViewDetailsMenuProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;

  useEffect(() => {
    if (query) {
      if (query.overlay_data) {
        const formatObjects = formTriples(query.overlay_data);
        setPlotToOverlay(formatObjects)(dispatch);
      }
    }

    return () => {
      setPlotToOverlay([])(dispatch);
    };
  }, []);

  return (
    <div style={{ background: 'white', padding: 8, borderTop: '1px solid' }}>
      <FormItem
        name="SizeChanger"
        label="Size">
        <SizeChanger
          dispatch={dispatch}
          setSize={setSize}
          currentValue={sizes.medium.size}
        />
      </FormItem>
      <hr />
      <FormItem
        style={{ margin: 0 }}
        name="Reference"
        label="Reference">
        <Reference state_global={state} dispatch_gloabl={dispatch} />
      </FormItem>
    </div>
  );
};
