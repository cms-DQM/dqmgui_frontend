import * as React from 'react';
import Router, { NextRouter } from 'next/router';

import { JSROOTSwitch } from './jsrootSwitch';
import { OverlayPositionSelection } from './overlayPositionSelectionProps';
import { SizeSelection } from './sizeSelection';
import { CheckBox } from './checkBox'
import { OverlaidSeparatelyProps, ParametersForApi } from '../interfaces';
import { sizes } from '../../components/constants';


interface ReferenceProps {
  router: NextRouter
  parameters: ParametersForApi;
  setParameters: React.Dispatch<React.SetStateAction<ParametersForApi | undefined>>
}

export const Reference = ({ router, parameters, setParameters }: ReferenceProps) => {
  const { query } = router
  const defaultSize = parameters.size
  const defaultOverlayPosition = query.overlayPosition ? query.overlayPosition : 'overlay'
  const defaultJSROOTState = query.jsroot ? query.jsroot === 'true' ? true : false : false

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

    copy.height = sizes[reference.size].size.h
    copy.width = sizes[reference.size].size.w
    copy.size = reference.size
    if (copy.overlaidSeparately) {
      copy.overlaidSeparately.ref = reference.ref as string
      copy.overlaidSeparately.normalize = reference.normalize as boolean
      copy.overlaidSeparately.stats = reference.stats as boolean
      copy.overlaidSeparately.error = reference.error as boolean
    }
    copy.jsroot = reference.jsroot
    copy.size = reference.size
    const addedPropsToParameters = { ...copy, overlaidSeparately: { ...copy.overlaidSeparately } }
    console.log(addedPropsToParameters)
    setParameters(addedPropsToParameters)

  }, [reference.size,
  reference.jsroot,
  reference.ref,
  reference[checkBoxes[0].label.toLocaleLowerCase()],
  reference[checkBoxes[1].label.toLocaleLowerCase()],
  reference[checkBoxes[2].label.toLocaleLowerCase()],
  query.ref,
  query.normalize,
  query.stats,
  query.error,
  query.jsroot,
  query.size])

  return <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex' }}>
      <div>
        <SizeSelection
          setReference={setReference}
          reference={reference}
        /></div>
      <div>
        <OverlayPositionSelection
          setReference={setReference}
          reference={reference}
        />
      </div>
      <div><JSROOTSwitch
        setReference={setReference}
        reference={reference}
      /></div>
    </div>
    <div style={{ display: 'flex' }}>
      {
        checkBoxes.map((checkBox) =>
          <div key={checkBox.label}>
            <CheckBox option={checkBox}
              setReference={setReference}
              reference={reference}
            /></div>
        )
      }
    </div>
  </div>
}