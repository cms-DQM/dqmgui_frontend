import { getPathName } from '../components/utils';

export let root_url_ = ''

if (!root_url_) {
  root_url_ = getPathName()
}

const current_mode = root_url_.split('/')[2]
const config: any = {
  development: {
    root_url: 'http://localhost:8081/',
    title: 'Development',
  },
  production: {
    root_url: root_url_,
    title: current_mode,
  },
};

export const root_url = config[process.env.NODE_ENV || 'development'].root_url;

const lumis_env_variable = process.env.LUMIS === 'true';

// setting config by ENV
const set_env = () => {
  if (process.env.NODE_ENV === 'production') {
    const ONLINE_MODE = current_mode.split('-').includes('online')
    const RELVAL_MODE = current_mode.split('-').includes('relval')

    const MODE = () => {
      if (ONLINE_MODE) {
        return 'ONLINE'
      } else if (RELVAL_MODE) {
        return 'RELVAL'
      } else {
        return 'OFFLINE'
      }
    }

    const new_backend = current_mode.split('-').includes('new')
    const production_config: any = {
      new_back_end: {
        new_back_end: current_mode.split('-').includes('new') || false,
        lumisections_on: (lumis_env_variable && new_backend) || false,
        layouts: new_backend || false,
        latest_runs: new_backend || false,
      },
      mode: MODE(),
    };
    return production_config
  } else {
    const development_config: any = {
      new_back_end: {
        new_back_end: true,
        lumisections_on: false,
        layouts: true,
        latest_runs: true,
      },
      mode: 'ONLINE',
    };
    return development_config
  }
}

export const functions_config = set_env()