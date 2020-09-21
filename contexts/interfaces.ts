export interface ConfigurationProps {
    root_url: string,
    title: string;
    functions_config: {
        new_back_end: boolean,
        lumisections_on: boolean,
        layouts: boolean,
        latest_runs: boolean
    },
    mode: boolean
}