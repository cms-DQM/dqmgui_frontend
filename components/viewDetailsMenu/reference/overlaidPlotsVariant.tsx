import * as React from 'react'
import { Radio } from 'antd';
import { store } from '../../../contexts/leftSideContext';
import {
  OVERLAY_DIFFERENT_PLOTS_WITH_DIFFERENT_RUN_AND_DATASET_BUT_SAME_NAMES,
  OVERLAY_DIFFERENT_PLOTS_WITH_SAME_RUN_AND_DATASET_DIFFERENT_NAME
} from '../../../contexts/constants';
import { RadioChangeEvent } from 'antd/lib/radio';


export const OverlaidPlotsVariant = () => {
  const { overlaidPlotsVariant, setOverlaidPlotsVariant } = React.useContext(store)
  const changeOverlaidVariant = (e: RadioChangeEvent) =>
    setOverlaidPlotsVariant(e.target.value)

  return (
    <Radio.Group onChange={changeOverlaidVariant} value={overlaidPlotsVariant}>
      <Radio value={OVERLAY_DIFFERENT_PLOTS_WITH_DIFFERENT_RUN_AND_DATASET_BUT_SAME_NAMES}>Overlay plots which have the same names</Radio>
      <Radio value={OVERLAY_DIFFERENT_PLOTS_WITH_SAME_RUN_AND_DATASET_DIFFERENT_NAME}>Overlay plots which have the different names</Radio>
    </Radio.Group>
  )
}