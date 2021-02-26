import { sizes } from "../components/constants";
import { ParamsForApiProps } from "../containers/display/interfaces";
import { ParametersForApi } from "../plotsLocalOverlayPageComponents/interfaces";

export interface ParametersParserProsp {
  [key: string]: string
}

export const oldApi = (parameters: ParametersForApi) => {
  const width = parameters.width ? `w=${parameters.width}` : ''
  const height = parameters.width ? `h=${parameters.height}` : ''
  const norm = parameters.normalize 
  const stats = parameters.stats ? `showstats=1` : `showstats=0`
  const errorBars = parameters.error ? `showerrbars=1` : `showerrbars=0`

  return { width, height, norm, stats, errorBars }
}


export const newApi = (parameters: ParametersForApi) => {
  const width = parameters.width ? `w=${sizes[parameters.size].size.w}` : ''
  const height = parameters.width ? `h=${sizes[parameters.size].size.h}` : ''
  const norm = parameters.normalize ? `norm=true` : `norm=false`
  const stats = parameters.stats ? `stats=true` : `stats=false`
  const errorBars = parameters.error ? `errors=true` : `errors=false`

  return { width, height, norm, stats, errorBars }
} 