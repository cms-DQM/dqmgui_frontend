import * as React from 'react'

import { ParamsForApiProps, QueryProps } from '../../../../containers/display/interfaces'
import { LiveModePlotImage } from './liveModePlotImage'
import { RegularModePlotImage } from './regularModePlotImage';

export interface PlotImageProps {
    params_for_api: ParamsForApiProps;
    plot: any;
    plotURL: string;
    isPlotSelected?: boolean;
    query: QueryProps;
    imageRef?: any;
}

export const PlotImage = ({
    ...props
}: PlotImageProps) => {
    const liveModeDataset = '/Global/Online/ALL';
    const liveModeRun = '0';
    const idItLiveMode = props.query.dataset_name === liveModeDataset && props.query.run_number === liveModeRun
    if (idItLiveMode) {
        return <LiveModePlotImage {...props} />
    } else {
        return <RegularModePlotImage {...props} />
    }

}