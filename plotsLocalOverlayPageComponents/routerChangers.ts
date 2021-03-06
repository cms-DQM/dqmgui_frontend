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
  const customization = { ...parameters.customise }
  await delete copy.overlaidGlobally

  const parameters_for_query = {
    ...copy,
    ...customization,
    overlaidGlobally: router.query.overlaidGlobally,
  }
  const stringified = qs.stringify(parameters_for_query, {});
  const url_which_is_visible = root_url_ !== '/' ? `${root_url_}?${stringified}` : undefined

  Router.push({
    pathname: router.pathname,
    query: parameters_for_query,
  },
    url_which_is_visible
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
  await delete copy.customise
  await delete copy.overlaidSeparately //we don't need it in request, insted if that we're using plotsString, where are all overlaid plots joined in one string
  await delete copy.customizationParams
  await delete copy.overlaidGlobally

  const customization = { ...parameters.customise }

  const parameters_for_query = {
    ...copy,
    ...reference,
    ...customization,
    overlaidGlobally: router.query.overlaidGlobally,
    overlayPlots: plotsString
  }
  const stringified = qs.stringify(parameters_for_query, {});
  const url_which_is_visible = root_url_ !== '' ? `${root_url_}?${stringified}` : undefined

  Router.push({
    pathname: router.pathname,
    query: parameters_for_query
  }, url_which_is_visible);
}

export const SearchPlot = async (plots_name: string, router: NextRouter, parameters: ParametersForApi) => {
  const copy = { ...parameters }
  await delete copy.customizationParams

  const parameters_for_query = {
    ...router.query,
      search: plots_name,
  }
  const stringified = qs.stringify(parameters_for_query, {});
  const url_which_is_visible = root_url_ !== '/' ? `${root_url_}?${stringified}` : undefined

  Router.push({
    pathname: router.pathname,
    //@ts-ignore
    query: parameters_for_query
  },url_which_is_visible);
}

export const SetCustomisationParams = async (router: NextRouter, customiseParams: CustomizeProps, parameters: ParametersForApi) => {
  const parameters_for_query = {
    ...router.query,
    ...customiseParams,
  }
  const stringified = qs.stringify(parameters_for_query, {});
  const url_which_is_visible = root_url_ !== '/' ? `${root_url_}?${stringified}` : undefined
  Router.push({
    pathname: router.pathname,
    //@ts-ignore
    query: parameters_for_query
  }, url_which_is_visible);
}