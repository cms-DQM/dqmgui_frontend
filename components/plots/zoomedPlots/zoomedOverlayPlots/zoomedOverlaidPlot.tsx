import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Store } from 'antd/lib/form/interface';
import { SettingOutlined, FullscreenOutlined, BlockOutlined } from '@ant-design/icons';

import {
  get_overlaied_plots_urls,
  functions_config,
  get_plot_with_overlay_new_api,
} from '../../../../config/config';
import {
  ParamsForApiProps,
  PlotDataProps,
  QueryProps,
  CustomizeProps,
  PlotoverlaidSeparatelyProps,
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
import { useBlinkOnUpdate } from '../../../../hooks/useBlinkOnUpdate';
import { PlotImage } from '../../plot/plotImage';
import { dialogsSwitch } from '../zoomedPlots/dialogsSwitch';
import { CUSTOMIZATION_DIALOG, OVERLAY_PLOT_MENU } from '../zoomedPlots/constants';
import { OverlayWithAnotherPlot } from '../../../viewDetailsMenu/reference/overlayRunsWithDifferentPlotNames/overlayWithAnotherPlot';

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
  params_for_api.customizeProps = customizationParams;
  const [isPortalWindowOpen, setIsPortalWindowOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = useState(dialogsSwitch(''))
  const [overlaid_plot_url, set_overlaid_plot_url] = useState<string>()

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
      action: () => setOpenDialog(dialogsSwitch(CUSTOMIZATION_DIALOG)),
      icon: <SettingOutlined />,
    },
    {
      label: 'Overlay with another plot',
      value: 'overlay',
      action: () => setOpenDialog(dialogsSwitch(OVERLAY_PLOT_MENU)),
      icon: <BlockOutlined />,
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

  const { blink, updated_by_not_older_than } = useBlinkOnUpdate();
  useEffect(() => {
    params_for_api.overlaidSeparately = selected_plot.overlaidSeparately
    set_overlaid_plot_url(get_plot_with_overlay_new_api(params_for_api))
  }, [selected_plot.overlaidSeparately, params_for_api.notOlderThan])
  const [currentPlotUrl, setCurrentPlotUrl] = useState(overlaid_plot_url ? overlaid_plot_url : source)

  useEffect(() => {
    if (overlaid_plot_url) {
      setCurrentPlotUrl(overlaid_plot_url)
    } else {
      setCurrentPlotUrl(source)
    }
  }, [overlaid_plot_url, source])

  const formatGloballyOverlidPlotsObject: PlotoverlaidSeparatelyProps[] = params_for_api.overlay_plot ? params_for_api.overlay_plot.map((plot) => {
    const { run_number, dataset_name, label } = plot
    const folder_path = params_for_api.folders_path
    const name = params_for_api.plot_name
    return {
      run_number,
      dataset_name: dataset_name.slice(1, dataset_name.length),
      folder_path,
      name,
      label
    } as PlotoverlaidSeparatelyProps
  }) : []
  
  return (
    <StyledCol space={2}>
      <OverlayWithAnotherPlot
        plot={selected_plot}
        visible={openDialog[OVERLAY_PLOT_MENU]}
        setOpenOverlayWithAnotherPlotModal={(value: boolean) => setOpenDialog(dialogsSwitch(value))}
        default_overlay={selected_plot.overlay}
        globallyOverlaid={formatGloballyOverlidPlotsObject}
        params_for_api={params_for_api}
        set_overlaid_plot_url={set_overlaid_plot_url}
      />
      {/* Plot opened in a new tab */}
      <Plot_portal
        isPortalWindowOpen={isPortalWindowOpen}
        setIsPortalWindowOpen={setIsPortalWindowOpen}
        title={selected_plot.name}
      >
        <StyledPlotRow
          justifycontent="center"
          isLoading={blink.toString()}
          animation={(functions_config.mode === 'ONLINE').toString()}
          minheight={copy_of_params.height}
          width={copy_of_params.width?.toString()}
          is_plot_selected={true.toString()}
          nopointer={true.toString()}
        >
          <PlotNameCol error={get_plot_error(selected_plot).toString()}>
            {selected_plot.name}
          </PlotNameCol>
          <ImageDiv
            id={selected_plot.name}
            width={copy_of_params.width}
            height={copy_of_params.height}
          >
            <PlotImage
              blink={blink}
              params_for_api={copy_of_params}
              plot={selected_plot}
              plotURL={zoomed_plot_url}
              query={query}
              updated_by_not_older_than={updated_by_not_older_than}
            />
          </ImageDiv>
        </StyledPlotRow>
      </Plot_portal>
      <Customization
        plot_name={selected_plot.name}
        open={openDialog[CUSTOMIZATION_DIALOG]}
        onCancel={() => setOpenDialog(dialogsSwitch(false))}
        setCustomizationParams={setCustomizationParams}
      />
      <StyledPlotRow
        isLoading={blink.toString()}
        animation={(functions_config.mode === 'ONLINE').toString()}
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
            blink={blink}
            params_for_api={params_for_api}
            plot={selected_plot}
            plotURL={currentPlotUrl}
            query={query}
            updated_by_not_older_than={updated_by_not_older_than}
          />
        </ImageDiv>
      </StyledPlotRow>
    </StyledCol>
  );
};
