import { pathOr } from 'ramda';

export const getPathName = () => {
  const isBrowser = () => typeof window !== 'undefined';
  let pathName = (isBrowser() && window.location.pathname) || '/';
  const the_lats_char = pathName.charAt(pathName.length - 1);
  if (the_lats_char !== '/') {
    pathName = pathName + '/'
  }
  return pathName;
}

export const getHostName = () => {
  const isBrowser = () => typeof window !== 'undefined';
  let hostname = (isBrowser() && window.location.hostname);
  const mode = (pathOr(hostname, [hostname, 'name'], machines_config))
  return mode;
}


export let root_url_ = ''
if (!root_url_) {
  root_url_ = getPathName()
}

// if the url has no path name (lor base path), we have to take host name.
// Host name is taken when GUI is ran with tunnel to P5
const current_mode_ = root_url_ ? root_url_.split('/')[2] : ''
export let current_mode = ''

export const machines_config = {
  'srv-c2f11-29-01.cms': { host: 'srv-c2f11-29-01', name: 'online-new' },
  'srv-c2f11-29-02.cms': { host: 'srv-c2f11-29-02', name: 'online-new' },
  'srv-c2f11-29-03.cms': { host: 'srv-c2f11-29-03', name: 'online-playback-new' },
  'srv-c2f11-29-04.cms': { host: 'srv-c2f11-29-04', name: 'online-test-new' },
  'localhost': { host: 'localhost', name: 'local development' },
  'vocms0738.cms': { host: 'vocms0738', name: 'offline-new' },
  'vocms0739.cms': { host: 'vocms0739', name: 'relVal-new' },
  'vocms0731.cms': { host: 'vocms0731', name: 'development-new' }
}

if (!current_mode_) {
  current_mode = getHostName()
} else {
  current_mode = current_mode_
}

const config: any = {
  development: {
    root_url: 'http://localhost:8080/',
    title: current_mode,
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
    const MODE = () => {
      const mode = current_mode.split('-')[0]// has to be 0 because it shows thats is online!!!
      return mode ? mode.toUpperCase() : 'ONLINE'//if you running gui on lxplus in production, before exporting change to mode you want to see
    }

    const production_config: any = {
      new_back_end: {
        new_back_end: true,
        lumisections_on: MODE() === 'OFFLINE',
        layouts: true,
        latest_runs: true
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
      mode: 'ONLINE', // here to set mode in development 
    };
    return development_config
  }
}

export const functions_config = set_env()