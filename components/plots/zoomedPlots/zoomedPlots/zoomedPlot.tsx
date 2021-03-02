import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FullscreenOutlined, SettingOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { BlockOutlined } from '@ant-design/icons';

import {
  functions_config,
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
import { PlotImage } from '../../plot/plotImages';
import { getZoomedPlotsUrlForOverlayingPlotsWithDifferentNames } from '../../../utils';
import { chooseApiForGettingPlotUrl } from '../../../../api/utils';

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
  const [openCustomization, toggleCustomizationMenu] = useState(false);
  const [isPortalWindowOpen, setIsPortalWindowOpen] = useState(false);

  params_for_api.customizeProps = customizationParams;
  const plot_url = chooseApiForGettingPlotUrl(params_for_api);
  const copy_of_params = { ...params_for_api };
  copy_of_params.height = window.innerHeight;
  copy_of_params.width = Math.round(window.innerHeight * 1.33);

  const zoomed_plot_url = chooseApiForGettingPlotUrl(copy_of_params);

  const router = useRouter();
  const query: QueryProps = router.query;

const url = getZoomedPlotsUrlForOverlayingPlotsWithDifferentNames( query, selected_plot)
  const zoomedPlotMenuOptions = [
    {
      label: 'Open in a new tab',
      value: 'open_in_a_new_tab',
      action: () => setIsPortalWindowOpen(true),
      icon: <FullscreenOutlined />,
    },
    {
      label: 'Customize',
      value: 'customize',
      action: () => toggleCustomizationMenu(true),
      icon: <SettingOutlined />,
    },
    functions_config.new_back_end.new_back_end && {
      label: 'Overlay with another plot',
      value: 'overlay',
      url: url,
      icon: <BlockOutlined />,
    },
  ];
  
  return (
    <StyledCol space={2}>
      {/* Plot opened in a new tab */}
      <Plot_portal
        isPortalWindowOpen={isPortalWindowOpen}
        setIsPortalWindowOpen={setIsPortalWindowOpen}
        title={selected_plot.name}
      >
        <StyledPlotRow
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
              params_for_api={copy_of_params}
              plot={selected_plot}
              plotURL={zoomed_plot_url}
              query={query}
            />
          </ImageDiv>
        </StyledPlotRow>
      </Plot_portal>
      {/* Plot opened in a new tab */}
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
            params_for_api={params_for_api}
            plot={selected_plot}
            plotURL={plot_url}
            query={query}
          />
        </ImageDiv>
      </StyledPlotRow>
    </StyledCol>
  );
};
