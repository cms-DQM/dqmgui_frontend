import { getPathName } from '../components/utils';

export let root_url_ = ''

if (!root_url_) {
  root_url_ = getPathName()
}

export const current_mode = root_url_ ? root_url_.split('/')[2] : ''
const config: any = {
  development: {
    root_url: 'http://localhost:8080/',
    title: 'Development',
  },
  production: {
    root_url: root_url_,
    title: current_mode,
  },
};

export const root_url = config[process.env.NODE_ENV || 'development'].root_url;

// setting config by ENV
const set_env = () => {
  if (process.env.NODE_ENV === 'production' && current_mode) {
    const ONLINE_MODE = current_mode.split('-').includes('online')
    const RELVAL_MODE = current_mode.split('-').includes('relval')

    const new_backend = current_mode.split('-').includes('new')
    const noBasePath = root_url_ === '/'

    const MODE = () => {
      if (ONLINE_MODE) {
        return 'ONLINE'
      } else if (RELVAL_MODE) {
        return 'RELVAL'
      } else if (noBasePath) {
        return 'ONLINE'
      } else {
        return 'OFFLINE'
      }
    }

    const production_config: any = {
      new_back_end: {
        new_back_end: new_backend || noBasePath || false,
        lumisections_on: new_backend || noBasePath || false,
        layouts: new_backend || noBasePath || false,
        latest_runs: new_backend || noBasePath || false,
      },
      mode: MODE(),
    };
    return production_config
  } else {
    const development_config: any = {
      new_back_end: {
        new_back_end: true,
        lumisections_on: true,
        layouts: true,
        latest_runs: true,
      },
      mode: 'OFFLINE',
    };
    return development_config
  }
}

export const functions_config = set_env()