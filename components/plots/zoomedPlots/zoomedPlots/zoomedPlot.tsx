import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FullscreenOutlined, SettingOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import lozad from 'lozad';

import {
  get_plot_url,
  root_url,
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
  Image,
  MinusIcon,
} from '../../../../containers/display/styledComponents';
import {
  removePlotFromRightSide,
  get_plot_error,
} from '../../plot/singlePlot/utils';
import { Customization } from '../../../customization';
import { ZoomedPlotMenu } from '../menu';
import { Plot_portal } from '../../../../containers/display/portal';
import { ErrorMessage } from '../../errorMessage';
import { CustomDiv } from '../../../styledComponents';
import { Spinner } from '../../../../containers/search/styledComponents';
import { useBlinkOnUpdate } from '../../../../hooks/useBlinkOnUpdate';

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
  const [isPortalWindowOpen, setIsPortalWindowOpen] = React.useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  params_for_api.customizeProps = customizationParams;
  const plot_url = get_plot_url(params_for_api);

  const copy_of_params = { ...params_for_api };
  copy_of_params.height = window.innerHeight;
  copy_of_params.width = Math.round(window.innerHeight * 1.33);
  const zoomed_plot_url = get_plot_url(copy_of_params);
  const zoomed_source = `${root_url}${zoomed_plot_url}`;

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
      action: () => toggleCustomizationMenu(true),
      icon: <SettingOutlined />,
    },
  ];

  const { blink, updated_by_not_older_than } = useBlinkOnUpdate();
  const [source, setSource] = useState(`${root_url}${plot_url};notOlderThan=${updated_by_not_older_than}`)

  React.useEffect(() => {
    setSource(`${root_url}${plot_url};notOlderThan=${updated_by_not_older_than}`)
    setImageLoading(blink)
  }, [blink])

  //lazy loading for plots
  const observer = lozad();
  observer.observe();

  return (
    <StyledCol space={2}>
      {/* Plot opened in a new tab */}
      <Plot_portal
        isPortalWindowOpen={isPortalWindowOpen}
        setIsPortalWindowOpen={setIsPortalWindowOpen}
        title={selected_plot.displayedName}
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
      {/* Plot opened in a new tab */}
      <Customization
        plot_name={selected_plot.name}
        open={openCustomization}
        onCancel={() => toggleCustomizationMenu(false)}
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
              alignitems="center"
              id={selected_plot.name}
              width={params_for_api.width}
              height={params_for_api.height}
              display="flex"
            >
              {!imageError && (
                <Image
                  key={source}
                  onLoad={() => setImageLoading(false)}
                  alt={selected_plot.name}
                  data-src={source}
                  className="lozad"
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
