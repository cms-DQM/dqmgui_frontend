import * as React from 'react';
import { MinusOutlined } from '@ant-design/icons';

import {
  TripleProps,
} from '../../../../containers/display/interfaces';
import { CustomTd, StyledSecondaryButton } from '../../../styledComponents';
import { Checkbox } from 'antd';
import { RunBrowser } from '../../../browsing/runsBrowser';
import { DatasetsBrowser } from '../../../browsing/datasetsBrowsing/datasetsBrowser';
import { Field } from '../field';
import { useChangeRouter } from '../../../../hooks/useChangeRouter';
import { makeURLForOverlayData } from '../../../plots/plot/singlePlot/utils';

interface TableOfSelectedRunForOverlayProps {
  overlaid_run: TripleProps;
  changeTriple(triple: TripleProps, value: string, key: string): void;
  removeTriple(triple: TripleProps): void;
  index: number,
  triples: TripleProps[]
}

export const TableOfSelectedRunForOverlay = ({
  overlaid_run,
  changeTriple,
  removeTriple,
  index,
  triples
}: TableOfSelectedRunForOverlayProps) => {
  const overlay_data = makeURLForOverlayData(triples)

  useChangeRouter({overlay_data: overlay_data}, [overlaid_run.dataset_name, overlaid_run.run_number, overlaid_run.label], true)
  return (
    <tr>
      <CustomTd spacing={'4'}>
        <Checkbox
          checked={overlaid_run.checked as boolean}
          onChange={(e: any) => {
            const value = overlaid_run.checked ? overlaid_run.checked : e.target.checked
            changeTriple(overlaid_run, value, 'checked')
          }}
        />
      </CustomTd>
      <CustomTd spacing={'4'}>{index + 1}.</CustomTd>
      <CustomTd spacing={'4'}>
        <RunBrowser
          a={'kasjkaska'}
          withoutLabel={true}
          setCurrentRunNumber={(run_number) => {
            changeTriple(overlaid_run, run_number, 'run_number')
          }}
          current_run_number={overlaid_run.run_number as string}
          current_dataset_name={overlaid_run.dataset_name as string}
          withoutArrows={true}
        />
      </CustomTd>
      <CustomTd spacing={'4'}>
        <DatasetsBrowser
          selectorWidth={'100%'}
          setCurrentDataset={(dataset_name) => {
            const value = overlaid_run.dataset_name ? overlaid_run.dataset_name.toString() : dataset_name
            changeTriple(overlaid_run, value, 'dataset_name')
          }}
          withoutArrows={true}
          current_dataset_name={overlaid_run.dataset_name as string}
          current_run_number={overlaid_run.run_number as string}
        />
      </CustomTd>
      <CustomTd spacing={'4'}>
        <Field
          overlaid_run={overlaid_run}
          changeTriple={changeTriple}
          placeholder="label"
          value={overlaid_run.label}
        />
      </CustomTd>
      <CustomTd spacing={'4'}>
        <StyledSecondaryButton
          onClick={() => {
            removeTriple(overlaid_run)
          }}
          icon={<MinusOutlined />}
        ></StyledSecondaryButton>
      </CustomTd>
    </tr>
  );
};
