import React, { useRef } from 'react';
import { useRouter } from 'next/router';

import { root_url, functions_config } from '../../../../config/config';
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
  OnSidePlotsWrapper,
} from '../../../../containers/display/styledComponents';
import { getOnSideOverlaidPlots } from './utils';
import {
  addPlotToRightSide,
  removePlotFromRightSide,
  scroll,
  scrollToBottom,
} from '../singlePlot/utils';
import { store } from '../../../../contexts/leftSideContext';

interface OnSideOverlaidPlotsProps {
  params_for_api: ParamsForApiProps;
  plot: PlotDataProps;
  isPlotSelected: boolean;
  imageRefScrollDown: any;
}

export const OnSideOverlaidPlots = ({
  plot,
  params_for_api,
  isPlotSelected,
  imageRefScrollDown,
}: OnSideOverlaidPlotsProps) => {
  params_for_api.plot_name = plot.name;
  const onsidePlotsURLs: string[] = getOnSideOverlaidPlots(params_for_api);

  const router = useRouter();
  const query: QueryProps = router.query;
  const imageRef = useRef(null);

  const { updated_by_not_older_than } = React.useContext(store);

  const [blink, set_blink] = React.useState(updated_by_not_older_than)
  React.useEffect(() => {
    //timeouts in order to get longer and more visible animation
    setTimeout(() => { set_blink(true) }, 0)
    setTimeout(() => { set_blink(false) }, 2000)
  }, [updated_by_not_older_than])

  return (
    <OnSidePlotsWrapper>
      {onsidePlotsURLs.map((url: string) => {
        const sourceForOnePlot = `${root_url}${url}`;
        return (
          <div ref={imageRef}>
            <StyledCol space={2} key={url}>
              <StyledPlotRow
                isLoading={blink.toString()}
                animation={functions_config.modes.online_mode.toString()}
                minheight={params_for_api.height}
                width={params_for_api.width?.toString()}
                is_plot_selected={isPlotSelected.toString()}
              // report={plot.properties.report}
              >
                <PlotNameCol>{plot.displayedName}</PlotNameCol>
                <Column>
                  {isPlotSelected ? (
                    <MinusIcon
                      onClick={() => removePlotFromRightSide(query, plot)}
                    />
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
                  <img alt={plot.name} src={sourceForOnePlot} />
                </div>
              </StyledPlotRow>
            </StyledCol>
          </div>
        );
      })}
    </OnSidePlotsWrapper>
  );
};
