import * as React from 'react'
import { useRouter } from 'next/router';

import { Plots } from './plots'
import { SearchContent } from '../plotsLocalOverlay/serchContent'
import { sizes } from '../components/constants';
import { Reference } from '../plotsLocalOverlay/options/reference'
import { ParametersForApi } from '../plotsLocalOverlay/interfaces';
import { Side, SyledContent, Wrapper } from './styledComponents';
import { StyledHeader } from '../styles/styledComponents';
import { Layout } from 'antd';


export const Main = () => {
  const router = useRouter();
  const query = router.query;
  const { run_number, dataset_name, folders_path, plot_name, size } = query
  const refReference = React.useRef<any>(null)
  const [parameters, setParameters] = React.useState<ParametersForApi | undefined>()
  const [referenceHeight, setReferenceHeight] = React.useState(0)

  React.useEffect(() => {
    if (refReference.current) {
      setReferenceHeight(refReference.current.clientHeight)
    }
  }, [refReference.current])

  React.useEffect(() => {
    if (Object.keys(query).length > 0) {
      const params_for_api: any = {
        run_number: run_number as string,
        dataset_name: dataset_name as string,
        folders_path: folders_path as string,
        plot_name: plot_name as string,
        size: query.size ? query.size as string : 'large',
        jsroot: query.jsroot ? (query.jsroot === 'true' ? true : false) : false,
        stats: query.stats ? (query.stats === 'true' ? true : false) : false,
        normalize: query.normalize ? (query.normalize === 'true' ? true : false) : true,
        overlaidSeparately: { plots: [], ref: 'overlay' },
        //@ts-ignore
        height: sizes[query.size ? query.size as string : 'large'].size.h,
        //@ts-ignore
        width: sizes[query.size ? query.size as string : 'large'].size.w
      }
      setParameters(params_for_api)
    }
  }, [query.plot_name])

  if (parameters) {
    return (
      <Layout >
        <StyledHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ color: 'white', padding: 4 }}>
              Run: {parameters.run_number}
            </p>
            <p style={{ color: 'white', padding: 4 }}>
              Dataset: {parameters.dataset_name}
            </p>
            <p style={{ color: 'white', padding: 4 }}>
              Folder path: {parameters.folders_path}
            </p>
            <p style={{ color: 'white', padding: 4 }}>
              Plot: {parameters.plot_name}
            </p>
          </div>
        </StyledHeader>
        <SyledContent>
          <Wrapper direction="row">
            <Side proportion="50%" style={{ borderRight: '2px solid' }}>
              <Plots parameters={parameters} />
            </Side>
            <Side proportion="50%" >
              <div ref={refReference}>
                <Reference parameters={parameters} router={router} setParameters={setParameters} />
              </div>
                <SearchContent
                  referenceHeight={referenceHeight}
                  parameters={parameters} setParameters={setParameters} />
            </Side>
          </Wrapper>
        </SyledContent>
      </Layout>
    )
  }
  return <></>

}