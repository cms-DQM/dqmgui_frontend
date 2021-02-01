import * as React from 'react'
import { useRouter } from 'next/router';
import { Tag } from 'antd';

import { Plots } from './plots'
import { SearchContent } from '../plotsLocalOverlay/serchContent'
import { sizes } from '../components/constants';
import { Reference } from '../plotsLocalOverlay/options/reference'
import { ParametersForApi } from '../plotsLocalOverlay/interfaces';
import { Side, SyledContent, TagsWrapper, TagWrapper, Wrapper } from './styledComponents';
import { StyledHeader, StyledLogo, StyledLogoDiv, StyledLogoWrapper } from '../styles/styledComponents';
import { Layout } from 'antd';
import { PlotSearch } from './plotsSearch';


export const Main = () => {
  const router = useRouter();
  const query = router.query;
  const { run_number, dataset_name, folders_path, plot_name, size } = query
  const refReference = React.useRef<any>(null)
  const plotsAreaRef = React.useRef<any>(null)

  const [parameters, setParameters] = React.useState<ParametersForApi | undefined>()
  const [referenceHeight, setReferenceHeight] = React.useState(0)
  const [plotsAreaWidth, setPlotsAreaWidth] = React.useState(0)

  React.useEffect(() => {
    if (refReference.current) {
      setReferenceHeight(refReference.current.clientHeight)
    }
  }, [refReference.current])

  React.useEffect(() => {
    if (plotsAreaRef.current) {
      setPlotsAreaWidth(plotsAreaRef.current.clientWidth)
    }
  }, [plotsAreaRef.current])

  React.useEffect(() => {
    if (Object.keys(query).length > 0) {
      const overlaidGloballyPlots = query.overlaidGlobally ? (query.overlaidGlobally as string).split('&') : []
      const overlaidGloballyPlotsObjects = overlaidGloballyPlots.map((plot) => {
        if (overlaidGloballyPlots) {
          const parts = plot.split('/')
          const label = parts.pop()
          const plot_name = parts.pop()
          const run_number = parts.shift()
          const folders_path = parts.splice(3).join('/')
          const dataset_name = '/' + parts.join('/')
          return { run_number, dataset_name, folders_path, plot_name, label }
        }
      })

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
        overlaidGlobally: overlaidGloballyPlotsObjects,
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
        <StyledHeader justifyContent='space-between'>
          <>
            <StyledLogoDiv>
              <StyledLogoWrapper>
                <StyledLogo src="../images/CMSlogo_white_red_nolabel_1024_May2014.png" />
              </StyledLogoWrapper>
            </StyledLogoDiv>
            <TagsWrapper>
              <TagWrapper>
                <Tag color="geekblue">Run :{parameters.run_number}</Tag>
              </TagWrapper>
              <TagWrapper>
                <Tag color="geekblue">Dataset: {parameters.dataset_name}</Tag>
              </TagWrapper>
              <TagWrapper>
                <Tag color="geekblue"> Folders path: {parameters.folders_path}</Tag>
              </TagWrapper>
              <TagWrapper>
                <Tag color="geekblue">Plot name:  {parameters.plot_name}</Tag>
              </TagWrapper>
              <PlotSearch parameters={parameters} setParameters={setParameters} />
            </TagsWrapper>
          </>
        </StyledHeader>
        <SyledContent>
          <Wrapper direction="row">
            <Side ref={plotsAreaRef} proportion="50%" border={true.toString()} >
              <Plots plotsAreaWidth={plotsAreaWidth} parameters={parameters} />
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