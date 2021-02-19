import * as React from 'react';
import { PlotImageProps } from '.';

import { root_url } from '../../../../config/config';
import { useBlink } from '../../../../hooks/useBlink';
import { useUpdateLiveMode } from '../../../../hooks/useUpdateInLiveMode';
import { makeid } from '../../../utils';
import { ErrorMessage } from '../../errorMessage';
import { ImageFallback } from '../../imageFallback';
import { PlotUpdateIdicator } from '../plotsWithLayouts/styledComponents';
import {
  addPlotToRightSide,
  removePlotFromRightSide,
} from '../singlePlot/utils';



export const LiveModePlotImage = ({
  imageRef,
  query,
  isPlotSelected,
  params_for_api,
  plotURL,
  plot,
}: PlotImageProps) => {
  const { not_older_than, addLoader } = useUpdateLiveMode()
  const { blink } = useBlink(not_older_than)
  const [loader, setLoader] = React.useState(true)
  const [id, setId] = React.useState<string>()

  const [new_image_url, set_new_image_url] = React.useState(
    `${root_url}${plotURL};notOlderThan=${not_older_than}`
  );
  const [old_image_url, set_old_image_url] = React.useState(
    `${root_url}${plotURL};notOlderThan=${not_older_than}`
  );

  const [show_old_img, set_show_old_img] = React.useState(true);
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    set_new_image_url(
      `${root_url}${plotURL};notOlderThan=${not_older_than}`
    );
    set_show_old_img(blink);
  }, [
    not_older_than,
    params_for_api.customizeProps,
    params_for_api.height,
    params_for_api.width,
    params_for_api.run_number,
    params_for_api.dataset_name,
    params_for_api.lumi,
    params_for_api.normalize,
    params_for_api.overlay_plot,
    params_for_api.plot_name,
    params_for_api.folders_path,
    params_for_api.overlay_plot,
    params_for_api.joined_overlaied_plots_urls,
    plotURL,
    blink
  ]);

  React.useEffect(() => {
    const id_ = makeid()
    setId(id_)
  }, [])

  React.useEffect(() => {
    addLoader({ value: loader, id })
  }, [loader])

  const old_image_display = show_old_img ? '' : 'none';
  const new_image_display = show_old_img ? 'none' : '';
  return (
    <>
      {imageError ? (
        <ErrorMessage />
      ) : (
          <div
            onClick={async () => {
              if (imageRef) {
                isPlotSelected
                  ? await removePlotFromRightSide(query, plot)
                  : await addPlotToRightSide(query, plot);
                scroll(imageRef);
              }
            }}
          >
            {!imageError && (
              <PlotUpdateIdicator
                update={blink.toString()}>
                <ImageFallback
                  retryTimes={3}
                  style={{ display: new_image_display }}
                  onLoad={() => {
                    setLoader(false)
                    set_old_image_url(new_image_url);
                    set_show_old_img(false);
                  }}
                  alt={plot.name}
                  src={new_image_url}
                  setImageError={setImageError}
                  width={params_for_api.width}
                  height={params_for_api.height}
                />
                {/*When images is updating, we getting blinking effect. 
                    We trying to avoid it with showing old image instead of nothing (when a new image is just requesting process)
                    Old image is an image which is 20 sec older then the new requested one.
                    */}
                <ImageFallback
                  retryTimes={3}
                  style={{ display: old_image_display }}
                  alt={plot.name}
                  src={old_image_url}
                  setImageError={setImageError}
                  width={'auto'}
                  height={'auto'}
                />
              </PlotUpdateIdicator>
            )}
          </div>
        )}
    </>
  );
};
