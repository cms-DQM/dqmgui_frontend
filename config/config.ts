import { getPathName } from '../components/utils';

export let root_url_ = ''

if(!root_url_){
  root_url_ = getPathName()
}
const config: any = {
  development: {
    root_url: 'http://localhost:8081/',
    title: 'Development',
  },
  production: {
    root_url: root_url_,
    title: root_url_.split('/')[2],
  },
};

const new_env_variable = process.env.NEW_BACK_END === 'true';
const layout_env_variable = process.env.LAYOUTS === 'true';
const latest_runs_env_variable = process.env.LATEST_RUNS === 'true';
const lumis_env_variable = process.env.LUMIS === 'true';

export const functions_config: any = {
  new_back_end: {
    new_back_end: new_env_variable || false,
    lumisections_on: (lumis_env_variable && new_env_variable) || false,
    layouts: (layout_env_variable && new_env_variable) || false,
    latest_runs: (latest_runs_env_variable && new_env_variable) || false,
  },
  mode: process.env.MODE || 'OFFLINE',
};

export const root_url = config[process.env.NODE_ENV || 'development'].root_url;
export const mode = config[process.env.NODE_ENV || 'development'].title;

export const service_title =
  config[process.env.NODE_ENV || 'development'].title;

