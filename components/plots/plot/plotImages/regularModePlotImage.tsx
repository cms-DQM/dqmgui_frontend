import * as React from 'react';
import { PlotImageProps } from '.';

import { root_url } from '../../../../config/config';
import { ErrorMessage } from '../../errorMessage';
import { ImageFallback } from '../../imageFallback';
import {
  addPlotToRightSide,
  removePlotFromRightSide,
} from '../singlePlot/utils';

export const RegularModePlotImage = ({
  imageRef,
  query,
  isPlotSelected,
  params_for_api,
  plotURL,
  plot,
}: PlotImageProps) => {
  const [image_url, set_image_url] = React.useState(
    `${root_url}${plotURL}`
  );

  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    set_image_url(
      `${root_url}${plotURL}`
    );
  }, [plotURL]);

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
              <>
                <ImageFallback
                  style={{ display: '' }}
                  retryTimes={3}
                  alt={plot.name}
                  src={image_url}
                  setImageError={setImageError}
                  width={params_for_api.width}
                  height={params_for_api.height}
                />
              </>
            )}
          </div>
        )}
    </>
  );
};
