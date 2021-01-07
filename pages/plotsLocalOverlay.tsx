import { NextPage } from 'next'
import * as React from 'react'
import { useRouter } from 'next/router';

import { PlotsLocalOverlayContent } from '../plotsLocalOverlay'
import { SearchContent } from '../plotsLocalOverlay/serchContent'
import { ParamsForApiProps, QueryProps } from '../containers/display/interfaces';
import { sizes } from '../components/constants';
import { get_plot_url } from '../config/config';
import { Reference } from '../plotsLocalOverlay/options/reference'


const PlotsLocalOverlay: NextPage<any> = () => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const { run_number, dataset_name, folder_path, plot_name } = query

  const params_for_api: ParamsForApiProps = {
    run_number,
    dataset_name,
    folders_path: folder_path,
    plot_name,
    width: sizes.large.size.w,
    height: sizes.large.size.h
  }
  const [plotUrl, setPlotUrl] = React.useState(get_plot_url(params_for_api))

  if (run_number && dataset_name) {
    return (<div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <PlotsLocalOverlayContent params_for_api={params_for_api} plotUrl={plotUrl} />
      </div>
      <div style={{ width: '50%' }}>
        <div>
          <Reference router={router}/>
        </div>
        <div>
          <SearchContent params_for_api={params_for_api} setPlotUrl={setPlotUrl} />
        </div>
      </div>
    </div>)
  }
  return <></>
}



export default PlotsLocalOverlay