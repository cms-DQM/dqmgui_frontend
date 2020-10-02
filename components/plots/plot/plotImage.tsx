import * as React from 'react'

import { root_url, get_plot_url } from '../../../config/config';
import { ParamsForApiProps } from '../../../containers/display/interfaces';
import { Image } from '../../../containers/display/styledComponents';

interface PlotImageProps {
  updated_by_not_older_than: number
  params_for_api: ParamsForApiProps;
  blink: boolean;
  setImageLoading: any;
  setImageError: any;
  plot: any;
  plotURL: string;
}

export const PlotImage = ({ params_for_api, plotURL, updated_by_not_older_than, blink, setImageLoading, setImageError, plot }: PlotImageProps) => {

  const [new_image_url, set_new_image_url] = React.useState(`${root_url}${plotURL};notOlderThan=${updated_by_not_older_than}`);
  const [old_image_url, set_old_image_url] = React.useState(`${root_url}${plotURL};notOlderThan=${updated_by_not_older_than}`);
  const [show_old_img, set_show_old_img] = React.useState(true)

  React.useEffect(() => {
    set_new_image_url(`${root_url}${plotURL};notOlderThan=${updated_by_not_older_than}`)
    set_show_old_img(blink);
  }, [updated_by_not_older_than, 
    params_for_api.customizeProps,
    params_for_api.height,
    params_for_api.width,
    params_for_api.run_number,
    params_for_api.dataset_name,
    params_for_api.lumi
  ]);


  const old_image_display = show_old_img ? '' : 'none'
  const new_image_display = show_old_img ? 'none' : ''

  return (
    <>
      <Image
        style={{ display: new_image_display }}
        onLoad={() => {
          setImageLoading(false)
          set_old_image_url(new_image_url)
          set_show_old_img(false)
        }}
        alt={plot.name}
        src={new_image_url}
        onError={() => {
          setImageError(true);
          setImageLoading(false);
        }}
        width={params_for_api.width}
        height={params_for_api.height}
      />
      <Image
        style={{ display: old_image_display }}
        alt={plot.name}
        src={old_image_url}
        onError={(error) => {
          setImageError(true);
          setImageLoading(false);
        }}
        width={params_for_api.width}
        height={params_for_api.height}
      />
    </>
  )
}