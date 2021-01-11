import Router, { NextRouter } from 'next/router';

import { OverlaidSeparatelyProps, ParametersForApi } from './interfaces';

export const cleanOverlaidPlotsFromURL = async (parameters: any, router: NextRouter, setParameters: React.Dispatch<React.SetStateAction<ParametersForApi | undefined>>) => {
  await delete parameters.overlayPlots
  await delete parameters.overlaidSeparately
  setParameters(parameters)
  Router.push({
    pathname: router.pathname,
    query: {
      ...parameters,
    },
  });
}

export const addOverlaidPlotToURL = async (plotsString: string,
  parameters: ParametersForApi,
  router: NextRouter,
) => {
  const copy: any = { ...parameters }
  const { overlaidSeparately } = parameters
  const { ref } = overlaidSeparately as OverlaidSeparatelyProps
  const reference = { ref }
  await delete copy.overlaidSeparately //we don't need it in request, insted if that we're using plotsString, where are all overlaid plots joined in one string
  Router.push({
    pathname: router.pathname,
    query: {
      ...copy,
      ...reference,
      overlayPlots: plotsString
    },
  });
}