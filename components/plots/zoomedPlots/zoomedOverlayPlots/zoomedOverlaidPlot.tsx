import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Store } from 'antd/lib/form/interface';
import { SettingOutlined, FullscreenOutlined, BlockOutlined } from '@ant-design/icons';
import { } from '@ant-design/icons';

import {
  functions_config,
} from '../../../../config/config';
import {
  get_overlaied_plots_urls,
} from '../../../../api/oldApi';
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
import {
  removePlotFromRightSide,
  get_plot_error,
} from '../../plot/singlePlot/utils';
import { ZoomedPlotMenu } from '../menu';
import { Customisation } from '../../../customisation';
import { Plot_portal } from '../../../../containers/display/portal';
import { PlotImage } from '../../plot/plotImages';
import { getZoomedOverlaidPlotsUrlForOverlayingPlotsWithDifferentNames } from '../../../utils';

interface ZoomedPlotsProps {
  selected_plot: PlotDataProps;
  params_for_api: ParamsForApiProps;
}

export const ZoomedOverlaidPlot = ({
  selected_plot,
  params_for_api,
}: ZoomedPlotsProps) => {
  const [customizationParams, setCustomisationParams] = useState<
    Partial<Store> & CustomizeProps
  >();

  useEffect(() => {
    if(selected_plot.draw){
      setCustomisationParams(selected_plot.draw)
    }
  }, [])
  
const [openCustomisation, toggleCustomisationMenu] = useState(false);
  params_for_api.customise = customizationParams;
  const [isPortalWindowOpen, setIsPortalWindowOpen] = React.useState(false);

  const router = useRouter();
  const query: QueryProps = router.query;
  const url = getZoomedOverlaidPlotsUrlForOverlayingPlotsWithDifferentNames(query, selected_plot)

  const zoomedPlotMenuOptions = [
    {
      label: 'Customize',
      value: 'Customize',
      action: () => toggleCustomisationMenu(true),
      icon: <SettingOutlined />,
    },
  ];

  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api);
  const allOverlaidPlotsUrls = params_for_api.overlaidWithLayoutsConfig ?
    [params_for_api.overlaidWithLayoutsConfig].concat(overlaid_plots_urls) : overlaid_plots_urls

  const joined_overlaid_plots_urls = allOverlaidPlotsUrls.join('');
  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls;

  const source = get_plot_source(params_for_api);

  return (
    <StyledCol space={2}>
      <Customisation
        plot_name={selected_plot.name}
        open={openCustomisation}
        onCancel={() => toggleCustomisationMenu(false)}
        setCustomisationParams={setCustomisationParams}
      />
      <StyledPlotRow
        minheight={params_for_api.height}
        width={params_for_api.width?.toString()}
        is_plot_selected={true.toString()}
        nopointer={true.toString()}
        justifycontent="center"
      >
        <PlotNameCol error={get_plot_error(selected_plot).toString()}>
          {selected_plot.name}
        </PlotNameCol>
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
          <PlotImage
            params_for_api={params_for_api}
            plot={selected_plot}
            plotURL={source}
            query={query}
          />
        </ImageDiv>
      </StyledPlotRow>
    </StyledCol>
  );
};
