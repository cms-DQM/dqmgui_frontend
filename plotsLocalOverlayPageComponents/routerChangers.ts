import Router, { NextRouter } from 'next/router';
import { CustomizeProps } from '../containers/display/interfaces';
import qs from 'qs';

import { OverlaidSeparatelyProps, ParametersForApi } from './interfaces';
import { root_url_ } from '../config/config';

export const cleanOverlaidPlotsFromURL = async (parameters: any, router: NextRouter) => {
  const copy = { ...parameters }
  await delete copy.overlayPlots
  await delete copy.overlaidSeparately
  await delete copy.customizationParams
  const customization = { ...parameters.customizeProps }
  await delete copy.overlaidGlobally

  const parameters_for_query = {
    ...copy,
    ...customization,
    overlaidGlobally: router.query.overlaidGlobally,
  }
  const stringified = qs.stringify(parameters_for_query, {});

  Router.push({
    pathname: router.pathname,
    query: parameters_for_query,
  }, 
  // `${root_url_}/?${stringified}`
  );
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
  Router.push({
    pathname: router.pathname,
    //@ts-ignore
    query: {
      ...router.query,
      ...customizeParams,
    },
  });
}