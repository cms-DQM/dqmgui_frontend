import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Store } from 'antd/lib/form/interface';
import lozad from 'lozad';
import {
  SettingOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';

import {
  ParamsForApiProps,
  PlotDataProps,
  QueryProps,
  CustomizeProps,
} from '../../../../containers/display/interfaces';
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
import { Spinner } from '../../../../containers/search/styledComponents';
import { CustomDiv } from '../../../styledComponents';
import { ErrorMessage } from '../../errorMessage';
import { useBlinkOnUpdate } from '../../../../hooks/useBlinkOnUpdate';
import { store } from '../../../../contexts/leftSideContext';
import { get_overlaied_plots_urls } from '../../../../config/apis/get_plots_urls';
import { get_plot_source } from '../../../../config/apis/utils/plots';

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
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isPortalWindowOpen, setIsPortalWindowOpen] = React.useState(false);

  const { configuration } = useContext(store)
  const { mode, root_url, functions_config } = configuration

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
  params_for_api.functions_config =functions_config
  const source = get_plot_source(root_url, params_for_api);

  const copy_of_params = { ...params_for_api };
  copy_of_params.height = window.innerHeight;
  copy_of_params.width = Math.round(window.innerHeight * 1.33);
  const zoomed_plot_url = get_plot_source(root_url, copy_of_params);
  const zoomed_source = `${zoomed_plot_url}`;

  const { blink } = useBlinkOnUpdate();

  //lazy loading for plots
  const observer = lozad();
  observer.observe();

  return (
    <StyledCol space={2}>
      <Plot_portal
        isPortalWindowOpen={isPortalWindowOpen}
        setIsPortalWindowOpen={setIsPortalWindowOpen}
        title={selected_plot.displayedName}
      >
        <StyledPlotRow
          isLoading={blink.toString()}
          animation={(mode === 'ONLINE').toString()}
          minheight={copy_of_params.height}
          width={copy_of_params.width?.toString()}
          is_plot_selected={true.toString()}
          nopointer={true.toString()}
        >
          <PlotNameCol error={get_plot_error(selected_plot, functions_config.new_back_end).toString()}>
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
        animation={(mode === 'ONLINE').toString()}
        minheight={params_for_api.height}
        width={params_for_api.width?.toString()}
        is_plot_selected={true.toString()}
        nopointer={true.toString()}
      >
        <PlotNameCol error={get_plot_error(selected_plot, functions_config.new_back_end).toString()}>
          {selected_plot.displayedName}
        </PlotNameCol>
        <Column display="flex">
          <ZoomedPlotMenu options={zoomedPlotMenuOptions} />
          <MinusIcon
            onClick={() => removePlotFromRightSide(query, selected_plot)}
          />
        </Column>
        {imageError ? (
          <ErrorMessage />
        ) : (
          <ImageDiv
            id={selected_plot.name}
            width={params_for_api.width}
            height={params_for_api.height}
          >
            {!imageError && (
              <Image
                onLoad={() => setImageLoading(false)}
                className="lozad"
                alt={selected_plot.name}
                data-src={source}
                onError={() => {
                  setImageError(true);
                  setImageLoading(false);
                }}
                width={params_for_api.width}
                height={params_for_api.height}
              />
            )}
            {imageLoading && (
              <CustomDiv display="flex" justifycontent="center" width="100%">
                <Spinner />
              </CustomDiv>
            )}
          </ImageDiv>
        )}
      </StyledPlotRow>
    </StyledCol>
  );
};
