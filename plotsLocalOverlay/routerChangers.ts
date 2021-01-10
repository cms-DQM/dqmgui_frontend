import Router, { NextRouter } from 'next/router';

import { OverlaidSeparatelyProps, ParametersForApi } from './interfaces';

export const cleanOverlaidPlotsFromURL = async (parameters: ParametersForApi, router: NextRouter) => {
  const copy: any = { ...parameters }
  await delete copy.overlayPlots
  Router.push({
    pathname: router.pathname,
    query: {
      ...copy,
    },
  });
}

export const addOverlaidPlotToURL = async (plotsString: string,
  parameters: ParametersForApi,
  router: NextRouter,
) => {
  const copy: any = { ...parameters }
  const { overlaidSeparately } = parameters
  const { ref, normalize, stats, error } = overlaidSeparately as OverlaidSeparatelyProps
  const reference = { ref, normalize, stats, error } 
  console.log(reference)
  Router.push({
    pathname: router.pathname,
    query: {
      ...copy,
      ...reference,
      overlayPlots: plotsString
    },
  });
}