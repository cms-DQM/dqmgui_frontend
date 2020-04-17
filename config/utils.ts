import {
    ParamsForApiProps,
} from '../containers/display/interfaces';

export const get_customize_params = (params: ParamsForApiProps) => {
    const xtype = params.xtype ? `xtype=${params.xtype};` : ''
    const xmin = params.xmin ? `xmin=${params.xmin};` : ''
    const xmax = params.xmin ? `xmax=${params.xmax};` : ''

    const ytype = params.ytype ? `ytype=${params.ytype};` : ''
    const ymin = params.ymin ? `ymin=${params.ymin};` : ''
    const ymax = params.ymin ? `ymay=${params.ymax};` : ''

    const ztype = params.ztype ? `ztzpe=${params.ztype};` : ''
    const zmin = params.zmin ? `zmin=${params.zmin};` : ''
    const zmax = params.zmin ? `zmaz=${params.zmax};` : ''

    const drawopts = params.drawopts ? `drawopts=${params.drawopts};` : ''
    const withref = params.withref ? `withref=${params.withref};` : ''

    const parameters = `${xtype}${xmin}${xmax}${ytype}${ymin}${ymax}${ztype}${zmin}${zmax}${drawopts}${withref}`
    return parameters
}