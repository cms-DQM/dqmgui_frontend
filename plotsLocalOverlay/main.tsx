import * as React from 'react'
import { useRouter } from 'next/router';

import { PlotsLocalOverlayContent } from '../plotsLocalOverlay/plot'
import { SearchContent } from '../plotsLocalOverlay/serchContent'
import { sizes } from '../components/constants';
import { Reference } from '../plotsLocalOverlay/options/reference'
import { ParametersForApi } from '../plotsLocalOverlay/interfaces';

export const Main = () => {
  const router = useRouter();
  const query = router.query;
  const { run_number, dataset_name, folders_path, plot_name, size } = query

  const [parameters, setParameters] = React.useState<ParametersForApi | undefined>()

  React.useEffect(() => {
    if (Object.keys(query).length > 0) {
      const params_for_api: ParametersForApi = {
        run_number: run_number as string,
        dataset_name: dataset_name as string,
        folders_path: folders_path as string,
        plot_name: plot_name as string,
        size: query.size? query.size as string: 'large',
        height : sizes[query.size? query.size as string: 'large'].size.h,
        width : sizes[query.size? query.size as string: 'large'].size.w
      }
      setParameters(params_for_api)
    }
  }, [query.run_number,
  query.dataset_name,
  query.folders_path,
  query.plot_name])

  if (parameters) {
    return (<div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%', margin: '32px' }}>
          <PlotsLocalOverlayContent parameters={parameters} />
        </div>
        <div style={{ width: '50%', margin: '32px' }}>
          <div>
            <Reference parameters={parameters} router={router} setParameters={setParameters} />
          </div>
          <div>
            <SearchContent parameters={parameters} setParameters={setParameters} />
          </div>
        </div>
      </div>
    </div>)
  }
  return <></>

}