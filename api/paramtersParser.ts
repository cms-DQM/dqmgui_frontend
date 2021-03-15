import { sizes } from "../components/constants";
import { ParametersForApi } from "../plotsLocalOverlayPageComponents/interfaces";

export interface ParametersParserProsp {
  [key: string]: string
}

export const oldApi = (parameters: ParametersForApi) => {
  const width = parameters.width ? `w=${parameters.width}` : ''
  const height = parameters.width ? `h=${parameters.height}` : ''
  const norm = parameters.normalize ? 'norm=True': 'norm=False'
  const stats = parameters.stats ? `showstats=1` : `showstats=0`
  const errorBars = parameters.error ? `showerrbars=1` : `showerrbars=0`

  return { width, height, norm, stats, errorBars }
}

export const newApi = (parameters: ParametersForApi) => {
  const width = parameters.width ? `w=${parameters.width}` : ''
  const height = parameters.width ? `h=${parameters.height}` : ''
  const norm = parameters.normalize ? 'norm=True': 'norm=False'
  const stats = parameters.stats ? `showstats=1` : `showstats=0`
  const errorBars = parameters.error ? `showerrbars=1` : `showerrbars=0`

  return { width, height, norm, stats, errorBars }
}


// Need to check backend, because it's  not accepting params like this. 
// New api accepting just in the old way
// export const newApi = (parameters: ParametersForApi) => { 
//   const width = parameters.size ? `w=${sizes[parameters.size].size.w}` : `w=${parameters.width}`
//   const height = parameters.size ? `h=${sizes[parameters.size].size.h}` : `h=${parameters.height}`
//   const norm = `norm=${parameters.normalize}`
//   const stats = parameters.stats ? `stats=true` : `stats=false`
//   const errorBars = parameters.error ? `errors=true` : `errors=false`

//   return { width, height, norm, stats, errorBars }
// } 

