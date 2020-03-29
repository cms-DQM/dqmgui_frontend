const config = {
  development: {
    root_url: 'http://localhost:8081/dqm/dev'
  },
  production: {
    root_url: 'http://localhost:8081/dqm/dev'
  }
};

export const root_url = config[process.env.NODE_ENV || 'development'].root_url;
