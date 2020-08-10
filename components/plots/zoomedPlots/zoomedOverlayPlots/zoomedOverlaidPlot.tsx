import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Store } from 'antd/lib/form/interface';
import {
  MinusCircleOutlined,
  SettingOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';

import {
  get_overlaied_plots_urls,
  root_url,
  functions_config,
} from '../../../../config/config';
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
import { Customization } from '../../../customization';
import { Plot_portal } from '../../../../containers/display/portal';
import { store } from '../../../../contexts/leftSideContext';

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
  const [isPortalWindowOpen, setIsPortalWindowOpen] = React.useState(false);

  const zoomedPlotMenuOptions = [
    {
      label: 'Open in a new tab',
      value: 'open_in_a_new_tab',
      action: () => setIsPortalWindowOpen(true),
      icon: <FullscreenOutlined />,
    },
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

  const copy_of_params = { ...params_for_api };
  copy_of_params.height = window.innerHeight;
  copy_of_params.width = Math.round(window.innerHeight * 1.33);
  const zoomed_plot_url = get_plot_source(copy_of_params);
  const zoomed_source = `${zoomed_plot_url}`;

  const { updated_by_not_older_than } = React.useContext(store);

  const [blink, set_blink] = React.useState(updated_by_not_older_than);
  React.useEffect(() => {
    //timeouts in order to get longer and more visible animation
    setTimeout(() => {
      set_blink(true);
    }, 0);
    setTimeout(() => {
      set_blink(false);
    }, 2000);
  }, [updated_by_not_older_than]);

  return (
    <StyledCol space={2}>
      <Plot_portal
        isPortalWindowOpen={isPortalWindowOpen}
        setIsPortalWindowOpen={setIsPortalWindowOpen}
        title={selected_plot.displayedName}
      >
        <StyledPlotRow
          isLoading={blink.toString()}
          animation={functions_config.modes.online_mode.toString()}
          minheight={copy_of_params.height}
          width={copy_of_params.width?.toString()}
          is_plot_selected={true.toString()}
          nopointer={true.toString()}
        >
          <PlotNameCol error={get_plot_error(selected_plot).toString()}>
            {selected_plot.displayedName}
          </PlotNameCol>
          <ImageDiv
            id={selected_plot.name}
            width={copy_of_params.width}
            height={copy_of_params.height}
          >
            <Image
              src={zoomed_source}
              width={copy_of_params.width}
              height={copy_of_params.height}
            />
          </ImageDiv>
        </StyledPlotRow>
      </Plot_portal>
      <Customization
        plot_name={selected_plot.name}
        open={openCustomization}
        onCancel={() => toggleCustomizationMenu(false)}
        setCustomizationParams={setCustomizationParams}
      />
      <StyledPlotRow
        isLoading={blink.toString()}
        animation={functions_config.modes.online_mode.toString()}
        minheight={params_for_api.height}
        width={params_for_api.width?.toString()}
        is_plot_selected={true.toString()}
        nopointer={true.toString()}
      >
        <PlotNameCol error={get_plot_error(selected_plot).toString()}>
          {selected_plot.displayedName}
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
