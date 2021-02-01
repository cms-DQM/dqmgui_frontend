import {
  ParamsForApiProps,
  TripleProps,
} from '../containers/display/interfaces';
import { functions_config } from './config';

export const get_customize_params = (params = {} as any) => {
  const xtype = params.xtype ? `xtype=${params.xtype};` : '';
  const xmin = params.xmin ? `xmin=${params.xmin};` : '';
  const xmax = params.xmax ? `xmax=${params.xmax};` : '';

  const ytype = params.ytype ? `ytype=${params.ytype};` : '';
  const ymin = params.ymin ? `ymin=${params.ymin};` : '';
  const ymax = params.ymax ? `ymax=${params.ymax};` : '';

  const ztype = params.ztype ? `ztype=${params.ztype};` : '';
  const zmin = params.zmin ? `zmin=${params.zmin};` : '';
  const zmax = params.zmax ? `zmax=${params.zmax};` : '';

  const drawopts = params.drawopts ? `drawopts=${params.drawopts};` : '';
  const withref = params.withref ? `withref=${params.withref};` : '';
  const parameters = `${xtype}${xmin}${xmax}${ytype}${ymin}${ymax}${ztype}${zmin}${zmax}${drawopts}${withref}`;

  return parameters;
};

export const getRunsWithLumisections = (
  params: ParamsForApiProps | TripleProps
) => {
  const lumisectionValue =
    params.lumi === -1 || !functions_config.new_back_end.lumisections_on
      ? undefined
      : params.lumi;
  const lumisectionParameter = lumisectionValue
    ? `${params.run_number}:${lumisectionValue}`
    : params.run_number;

  return lumisectionParameter;
};

export const getRunsWithLumisectionsForOverlaidPlots = (
  params: TripleProps
) => {
  const lumisectionValue = params.lumi === -1 ? undefined : params.lumi;
  const lumisectionParameter = lumisectionValue
    ? `${params.run_number}:${lumisectionValue}`
    : params.run_number;

  return lumisectionParameter;
};
