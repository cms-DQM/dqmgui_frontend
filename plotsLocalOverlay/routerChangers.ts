import Router, { NextRouter } from 'next/router';
import { CustomizeProps } from '../containers/display/interfaces';

import { OverlaidSeparatelyProps, ParametersForApi } from './interfaces';

export const cleanOverlaidPlotsFromURL = async (parameters: any, router: NextRouter) => {
  const copy = { ...parameters }
  await delete copy.overlayPlots
  await delete copy.overlaidSeparately
  await delete copy.customizationParams
  const customization = { ...parameters.customizeProps }
  await delete copy.overlaidGlobally

  Router.push({
    pathname: router.pathname,
    query: {
      ...copy,
      ...customization,
      overlaidGlobally: router.query.overlaidGlobally,
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
  await delete copy.customizeProps
  await delete copy.overlaidSeparately //we don't need it in request, insted if that we're using plotsString, where are all overlaid plots joined in one string
  await delete copy.customizationParams
  await delete copy.overlaidGlobally

  const customization = { ...parameters.customizeProps }

  Router.push({
    pathname: router.pathname,
    query: {
      ...copy,
      ...reference,
      ...customization,
      overlaidGlobally: router.query.overlaidGlobally,
      overlayPlots: plotsString
    },
  });
}

export const SearchPlot = async (plots_name: string, router: NextRouter, parameters: ParametersForApi) => {
  const copy = { ...parameters }
  await delete copy.customizationParams
  const customization = { ...parameters.customizeProps }

  Router.push({
    pathname: router.pathname,
    //@ts-ignore
    query: {
      ...router.query,
      search: plots_name,
    },
  });
}

export const SetCustomizationParams = async (router: NextRouter, customizeParams: CustomizeProps, parameters: ParametersForApi) => {
  const copy = { ...parameters }
  Router.push({
    pathname: router.pathname,
    //@ts-ignore
    query: {
      ...router.query,
      ...customizeParams,
    },
  });
}