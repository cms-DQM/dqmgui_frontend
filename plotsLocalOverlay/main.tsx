import * as React from 'react'
import { useRouter } from 'next/router';

import { PlotsLocalOverlayContent } from '../plotsLocalOverlay/plot'
import { SearchContent } from '../plotsLocalOverlay/serchContent'
import { sizes } from '../components/constants';
import { Reference } from '../plotsLocalOverlay/options/reference'
import { ParametersForApi } from '../plotsLocalOverlay/interfaces';
import { Side, Wrapper } from './styledComponents';
import { StyledHeader } from '../styles/styledComponents';
import { Layout } from 'antd';

const { Footer, Content } = Layout;

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
      // <StyledLayout>
      <Layout>
        <StyledHeader>
          <div style ={{display:'flex', justifyContent: 'space-between'}}>
          <p style={{ color: 'white', padding: 4}}>
            Run: {parameters.run_number}
            </p>
            <p style={{ color: 'white', padding: 4}}>
            Dataset: {parameters.dataset_name}
            </p>
            <p style={{ color: 'white', padding: 4}}>
            Folder path: {parameters.folders_path}
            </p>
            <p style={{ color: 'white', padding: 4}}>
            Plot: {parameters.plot_name}
            </p>
          </div>
        </StyledHeader>
        <Content>
          <Wrapper direction="row">
            <Side proportion="50%" style={{borderRight: '2px solid'}}>
              <PlotsLocalOverlayContent parameters={parameters} />
            </Side>
            <Side proportion="50%">
              <div>
                <Reference parameters={parameters} router={router} setParameters={setParameters} />
              </div>
              <div>
                <SearchContent parameters={parameters} setParameters={setParameters} />
              </div>
            </Side>
          </Wrapper>
        </Content>
        <Footer></Footer>
      </Layout>
    )
  }
  return <></>

}