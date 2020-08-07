import React, { useRef, useContext } from 'react';
import { useRouter } from 'next/router';

import { root_url, functions_config } from '../../../../config/config';
import {
  get_plot_with_overlay,
  get_overlaied_plots_urls,
} from '../../../../config/config';
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
  PlusIcon,
  MinusIcon,
} from '../../../../containers/display/styledComponents';
import {
  scroll,
  removePlotFromRightSide,
  addPlotToRightSide,
  scrollToBottom,
} from '../singlePlot/utils';
import { store } from '../../../../contexts/leftSideContext';

interface OverlaidPlotImageProps {
  params_for_api: ParamsForApiProps;
  plot: PlotDataProps;
  isPlotSelected: boolean;
  imageRefScrollDown: any;
}

export const OverlaidPlotImage = ({
  plot,
  params_for_api,
  isPlotSelected,
  imageRefScrollDown,
}: OverlaidPlotImageProps) => {
  const globalState = useContext(store);
  const { normalize } = globalState;

  params_for_api.plot_name = plot.name;
  params_for_api.normalize = normalize;

  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api);
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('');
  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls;

  const plot_with_overlay = get_plot_with_overlay(params_for_api);
  const source = `${root_url}${plot_with_overlay}`;

  const router = useRouter();
  const query: QueryProps = router.query;

  const imageRef = useRef(null);

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
    <div ref={imageRef}>
      <StyledCol space={2}>
        <StyledPlotRow
          isLoading={blink.toString()}
          animation={functions_config.modes.online_mode.toString()}
          minheight={params_for_api.height}
          width={params_for_api.width?.toString()}
          is_plot_selected={isPlotSelected.toString()}
        >
          <PlotNameCol
            error={(plot.qtestresults.error === 300).toString()}
          >{plot.displayedName}</PlotNameCol>
          <Column>
            {isPlotSelected ? (
              <MinusIcon onClick={() => removePlotFromRightSide(query, plot)} />
            ) : (
                <PlusIcon
                  onClick={async () => {
                    await addPlotToRightSide(query, plot);
                    scroll(imageRef);
                    scrollToBottom(imageRefScrollDown);
                  }}
                />
              )}
          </Column>
          <div
            onClick={async () => {
              isPlotSelected
                ? await removePlotFromRightSide(query, plot)
                : await addPlotToRightSide(query, plot);
              scroll(imageRef);
            }}
          >
            <img alt={plot.name} src={source} />
          </div>
        </StyledPlotRow>
      </StyledCol>
    </div>
  );
};
