import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Store } from 'antd/lib/form/interface';
import { MinusCircleOutlined, SettingOutlined } from '@ant-design/icons';

import { get_overlaied_plots_urls } from '../../../../config/config';
import {
  ParamsForApiProps,
  PlotDataProps,
  QueryProps,
  CustomizeProps,
} from '../../../../containers/display/interfaces';
import { get_plot_source } from './utils';
import {
  StyledPlotRow,
  PlotNameCol,
  Column,
  StyledCol,
  ImageDiv,
  Image,
  MinusIcon,
} from '../../../../containers/display/styledComponents';
import { removePlotFromRightSide } from '../../plot/singlePlot/utils';
import { ZoomedPlotMenu } from '../menu';
import { Customization } from '../../../customization';

interface ZoomedPlotsProps {
  selected_plot: PlotDataProps;
  params_for_api: ParamsForApiProps;
}

export const ZoomedOverlaidPlot = ({
  selected_plot,
  params_for_api,
}: ZoomedPlotsProps) => {
  const [customizationParams, setCustomizationParams] = useState<
    Partial<Store> & CustomizeProps
  >();
  const [openCustomization, toggleCustomizationMenu] = useState(false);
  params_for_api.customizeProps = customizationParams;

  const zoomedPlotMenuOptions = [
    // {
    //   label: 'Remove',
    //   value: 'Remove',
    //   action: () => removePlotFromRightSide(query, selected_plot),
    //   icon: <MinusCircleOutlined />,
    // },
    {
      label: 'Customize',
      value: 'Customize',
      action: () => toggleCustomizationMenu(true),
      icon: <SettingOutlined />,
    },
  ];

  const router = useRouter();
  const query: QueryProps = router.query;

  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api);
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('');
  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls;

  const source = get_plot_source(params_for_api);

  return (
    <StyledCol space={2}>
      <Customization
        plot_name={selected_plot.name}
        open={openCustomization}
        onCancel={() => toggleCustomizationMenu(false)}
        setCustomizationParams={setCustomizationParams}
      />
      <StyledPlotRow
        minheight={params_for_api.height}
        width={params_for_api.width?.toString()}
        is_plot_selected={true.toString()}
        nopointer={true.toString()}
      // report={selected_plot.properties.report}
      >
        <PlotNameCol>{selected_plot.displayedName}</PlotNameCol>
        <Column display="flex">
          <ZoomedPlotMenu options={zoomedPlotMenuOptions} />
          <MinusIcon
            onClick={() => removePlotFromRightSide(query, selected_plot)}
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
