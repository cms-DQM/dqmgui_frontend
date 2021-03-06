import * as React from 'react';
import { NextRouter } from 'next/router';
import { message } from 'antd';

import { JSROOTSwitch } from './jsrootSwitch';
import { OverlayPositionSelection } from './overlayPositionSelectionProps';
import { SizeSelection } from './sizeSelection';
import { CheckBox } from './checkBox'
import { ParametersForApi } from '../interfaces';
import { sizes } from '../../components/constants';
import { Grid, StyledButton, Wrapper } from '../styledComponents';
import { Tooltip } from 'antd';
import { Customisation } from '../../components/customisation';
import { CustomizeProps } from '../../containers/display/interfaces';
import { SetCustomisationParams } from '../routerChangers';
import cleanDeep from 'clean-deep';


interface ReferenceProps {
  router: NextRouter
  parameters: ParametersForApi;
  setParameters: React.Dispatch<React.SetStateAction<ParametersForApi | undefined>>
}

const info = () => {
  message.info('Plot is already customised');
};

export const Reference = ({ router, parameters, setParameters }: ReferenceProps) => {
  const { query } = router
  const defaultSize = parameters.size
  const defaultOverlayPosition = query.overlayPosition ? query.overlayPosition : 'overlay'
  const defaultJSROOTState = query.jsroot ? query.jsroot === 'true' ? true : false : false
  const [openCustomisation, setOpenCustomisation] = React.useState(false)
  const [customizationParams, setCustomisationParams] = React.useState<any>({})
  const isPlotCustomized = Object.keys(parameters.customise ? parameters.customise : {}).length > 0

  const checkBoxes = [{
    label: 'Normalize',
    value: query.normalize ? query.normalize === 'true' ? true : false : true
  },
  {
    label: 'Stats',
    value: query.stats ? query.stats === 'true' ? true : false : true
  },
  {
    label: 'Error',
    value: query.error ? query.error === 'true' ? true : false : false
  }]

  const [reference, setReference] = React.useState({
    size: defaultSize,
    jsroot: defaultJSROOTState,
    ref: defaultOverlayPosition,
    [checkBoxes[0].label.toLocaleLowerCase()]: checkBoxes[0].value,
    [checkBoxes[1].label.toLocaleLowerCase()]: checkBoxes[1].value,
    [checkBoxes[2].label.toLocaleLowerCase()]: checkBoxes[2].value,
  })

  React.useEffect(() => {
    const copy = { ...parameters }
    //@ts-ignore
    copy.height = sizes[reference.size].size.h
    //@ts-ignore
    copy.width = sizes[reference.size].size.w
    copy.size = reference.size
    if (copy.overlaidSeparately) {
      copy.overlaidSeparately.ref = reference.ref as string
    }
    copy.jsroot = reference.jsroot
    copy.size = reference.size
    copy.stats = reference.stats as boolean
    copy.normalize = reference.normalize as boolean
    copy.error = reference.error as boolean
    copy.customise = customizationParams
    const addedPropsToParameters = { ...copy, overlaidSeparately: { ...copy.overlaidSeparately } }
    //@ts-ignore
    setParameters(addedPropsToParameters)

  }, [reference.size,
  reference.jsroot,
  reference.ref,
  reference[checkBoxes[0].label.toLocaleLowerCase()],
  reference[checkBoxes[1].label.toLocaleLowerCase()],
  reference[checkBoxes[2].label.toLocaleLowerCase()],
  customizationParams,
  query.ref,
  query.normalize,
  query.stats,
  query.error,
  query.jsroot,
  query.size])

  React.useEffect(()=>{
    const costumization = {
      xtype: query.xtype as string,
      xmin: query.xmin as string,
      xmax: query.xmax as string,
      ytype: query.ytype as string,
      ymin: query.ymin as string,
      ymax: query.ymax as string,
      ztype: query.ztype as string,
      zmin: query.zmin as string,
      zmax: query.zmax as string,
      drawopts: query.drawopts as string,
      withref: query.withref as string,
    }
    setCustomisationParams(cleanDeep(costumization))
  },[])

  React.useEffect(()=>{
    if(isPlotCustomized){
      info()
    }
  },[isPlotCustomized])

  return <Wrapper direction="column">
    <Customisation
      plot_name={parameters.plot_name}
      open={openCustomisation}
      customizationParams={customizationParams}
      onCancel={() => setOpenCustomisation(false)}
      setCustomisationParams={async (params: CustomizeProps) => {
        setCustomisationParams(params)
        await SetCustomisationParams(router, params, parameters)
      }
      }
    />
    <Wrapper direction="row">
      <Grid space={'2'}>
        <SizeSelection
          setReference={setReference}
          reference={reference}
        /></Grid>
      <Grid space={'2'}>
        <OverlayPositionSelection
          setReference={setReference}
          reference={reference}
        />
      </Grid>
      <Grid space={'2'}>
        <JSROOTSwitch
          disabled={!!query.overlayPlots}
          setReference={setReference}
          reference={reference}
        /></Grid>
      <Grid space="2">
        <Tooltip title={isPlotCustomized ? 'This plot is customised!' : ''}>
          <StyledButton isPlotCustomized={isPlotCustomized.toString()} onClick={() => 
            setOpenCustomisation(!openCustomisation)}>Customize</StyledButton>
        </Tooltip>
      </Grid>
    </Wrapper>
    <Wrapper direction="row">
      {
        checkBoxes.map((checkBox) =>
          <Grid space={'2'} key={checkBox.label}>
            <CheckBox option={checkBox}
              setReference={setReference}
              reference={reference}
            /></Grid>
        )
      }
    </Wrapper>
  </Wrapper>
}