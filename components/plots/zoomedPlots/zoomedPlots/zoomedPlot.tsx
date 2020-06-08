import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import {
  MoreOutlined
} from '@ant-design/icons';

import { get_plot_url, root_url } from '../../../../config/config';
import {
  ParamsForApiProps,
  PlotDataProps,
  QueryProps,
} from '../../../../containers/display/interfaces';
import {
  StyledCol,
  PlotNameCol,
  StyledPlotRow,
  Column,
  MinusIcon,
  ImageDiv,
  Image,
} from '../../../../containers/display/styledComponents';
import {
  removePlotFromRightSide,
} from '../../plot/singlePlot/utils';
import { Customization } from '../../../customization';
import { ZoomedPlotMenu } from '../menu';

interface ZoomedPlotsProps {
  selected_plot: PlotDataProps;
  params_for_api: ParamsForApiProps;
}

export const ZoomedPlot = ({
  selected_plot,
  params_for_api,
}: ZoomedPlotsProps) => {

  const plot_url = get_plot_url(params_for_api);
  const source = `${root_url}${plot_url}`;
  const router = useRouter();
  const query: QueryProps = router.query;
  const [openCustomization, toggleCustomizationMenu] = useState(false)

  const zoomedPlotMeuOptions = [{
    label: 'Remove',
    value: 'Remove',
    action: () => removePlotFromRightSide(query, selected_plot),
  },
  {
    label: 'Customization',
    value: 'Customization',
    action: () => toggleCustomizationMenu(true),
  }
  ]

  return (
    <StyledCol space={2}>
      <Customization
        plot_name={selected_plot.name}
        open={openCustomization}
        onCancel={() => toggleCustomizationMenu(false)}
      />
      <StyledPlotRow
        minheight={params_for_api.height}
        width={params_for_api.width}
        is_plot_selected={true.toString()}
        nopointer={true.toString()}
      >
        <PlotNameCol>{selected_plot.name}</PlotNameCol>
        <Column>
          <Button
            type="link"
            icon={<ZoomedPlotMenu options={zoomedPlotMeuOptions} />}
          />
        </Column>
        <ImageDiv
          id={selected_plot.name}
          width={params_for_api.width}
          height={params_for_api.height}
        >
          <Image
            src={source}
            width={params_for_api.width}
            height={params_for_api.height}
          />
        </ImageDiv>
      </StyledPlotRow>
    </StyledCol>
  );
};
