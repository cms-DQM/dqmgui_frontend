import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FullscreenOutlined, SettingOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { BlockOutlined } from '@ant-design/icons';
import { message } from 'antd';

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
import { Customisation } from '../../../customisation';
import { ZoomedPlotMenu } from '../menu';
import { Plot_portal } from '../../../../containers/display/portal';
import { PlotImage } from '../../plot/plotImages';
import { getZoomedPlotsUrlForOverlayingPlotsWithDifferentNames } from '../../../utils';
import { chooseApiForGettingPlotUrl } from '../../../../api/utils';

const info = () => {
  message.info('Plot is already customised');
};


interface ZoomedPlotsProps {
  selected_plot: PlotDataProps;
  params_for_api: ParamsForApiProps;
}

export const ZoomedPlot = ({
  selected_plot,
  params_for_api,
}: ZoomedPlotsProps) => {
  const [customizationParams, setCustomisationParams] = useState<
    Partial<Store> & CustomizeProps
  >();

  useEffect(() => {
    if(selected_plot.draw){
      setCustomisationParams(selected_plot.draw)
      info()
    }
  }, [])

  const [openCustomisation, toggleCustomisationMenu] = useState(false);
  const [isPortalWindowOpen, setIsPortalWindowOpen] = useState(false);

  params_for_api.customise = customizationParams;
  const plot_url = chooseApiForGettingPlotUrl(params_for_api);
  const copy_of_params = { ...params_for_api };
  copy_of_params.height = window.innerHeight;
  copy_of_params.width = Math.round(window.innerHeight * 1.33);

  const zoomed_plot_url = chooseApiForGettingPlotUrl(copy_of_params);

  const router = useRouter();
  const query: QueryProps = router.query;

  const url = getZoomedPlotsUrlForOverlayingPlotsWithDifferentNames(query, selected_plot)

  const zoomedPlotMenuOptions = [
    {
      label: 'Customize',
      value: 'customise',
      action: () => toggleCustomisationMenu(true),
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
      <Customisation
        plot_name={selected_plot.name}
        customizationParams={customizationParams}
        open={openCustomisation}
        onCancel={() => toggleCustomisationMenu(false)}
        setCustomisationParams={setCustomisationParams}
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
