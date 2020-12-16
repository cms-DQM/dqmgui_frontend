import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FullscreenOutlined, SettingOutlined, BlockOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';

import {
  get_plot_url,
  functions_config,
  get_plot_with_overlay_new_api,
} from '../../../../config/config';
import {
  ParamsForApiProps,
  PlotDataProps,
  QueryProps,
  CustomizeProps,
} from '../../../../containers/display/interfaces';
import {
  StyledCol,
  PlotNameCol,
  StyledPlotRow,
  Column,
  ImageDiv,
  MinusIcon,
} from '../../../../containers/display/styledComponents';
import {
  removePlotFromRightSide,
  get_plot_error,
} from '../../plot/singlePlot/utils';
import { Customization } from '../../../customization';
import { ZoomedPlotMenu } from '../menu';
import { Plot_portal } from '../../../../containers/display/portal';
import { useBlinkOnUpdate } from '../../../../hooks/useBlinkOnUpdate';
import { PlotImage } from '../../plot/plotImage';
import { OverlayWithAnotherPlot } from '../../../viewDetailsMenu/reference/overlayRunsWithDifferentPlotNames/overlayWithAnotherPlot';
import { dialogsSwitch } from './dialogsSwitch'
import { CUSTOMIZATION_DIALOG, OVERLAY_PLOT_MENU } from './constants';

interface ZoomedPlotsProps {
  selected_plot: PlotDataProps;
  params_for_api: ParamsForApiProps;
}

export const ZoomedPlot = ({
  selected_plot,
  params_for_api,
}: ZoomedPlotsProps) => {
  const [customizationParams, setCustomizationParams] = useState<
    Partial<Store> & CustomizeProps
  >();
  const [isPortalWindowOpen, setIsPortalWindowOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(dialogsSwitch(''))

  const [overlaid_plot_url, set_overlaid_plot_url] = useState<string>()
  params_for_api.customizeProps = customizationParams;

  const plot_url = get_plot_url(params_for_api);
  const copy_of_params = { ...params_for_api };
  copy_of_params.height = window.innerHeight;
  copy_of_params.width = Math.round(window.innerHeight * 1.33);

  const zoomed_plot_url = get_plot_url(copy_of_params);

  const router = useRouter();
  const query: QueryProps = router.query;

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

  const { blink, updated_by_not_older_than } = useBlinkOnUpdate();
  const [currentPlotUrl, setCurrentPlotUrl] = useState(overlaid_plot_url ? overlaid_plot_url: plot_url)

  useEffect(() => {
    if (overlaid_plot_url) {
      setCurrentPlotUrl(overlaid_plot_url)
    } else {
      setCurrentPlotUrl(plot_url)
    }
  }, [overlaid_plot_url, plot_url])

  useEffect(() => {
    set_overlaid_plot_url(get_plot_with_overlay_new_api(params_for_api))
  }, [params_for_api.overlaidSeparately, params_for_api.notOlderThan])

  return (
    <StyledCol space={2}>
      <OverlayWithAnotherPlot
        visible={openDialog[OVERLAY_PLOT_MENU]}
        setOpenOverlayWithAnotherPlotModal={(value: boolean) => setOpenDialog(dialogsSwitch(value))}
        default_overlay={selected_plot.overlay}
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
      {/* Plot opened in a new tab */}
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
          alignitems="center"
          id={selected_plot.name}
          width={params_for_api.width}
          height={params_for_api.height}
          display="flex"
        >
          <PlotImage
            updated_by_not_older_than={updated_by_not_older_than}
            blink={blink}
            params_for_api={params_for_api}
            plot={selected_plot}
            plotURL={currentPlotUrl}
            query={query}
          />
        </ImageDiv>
      </StyledPlotRow>
    </StyledCol>
  );
};
