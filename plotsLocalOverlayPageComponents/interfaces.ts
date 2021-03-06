import { CustomizeProps } from "../containers/display/interfaces";

export interface ParametersForApi {
  overlaidSeparately: OverlaidSeparatelyProps
  customise?: CustomizeProps,
  run_number: string;
  dataset_name: string;
  folders_path: string;
  plot_name: string
  size: string;
  height: number;
  width: number;
  jsroot: boolean;
  normalize: boolean,
  stats: boolean,
  error: boolean,
  lumi: number,
  search?: string,
  plot_search?: string,
  customizationParams?: CustomizeProps;
  overlaidGlobally?: [{
    run_number: string;
    dataset_name: string;
    folders_path: string;
    plot_name: string;
    label: string;
  }],
  notOlderThan?: number;
}

export interface PlotProperties {
  run_number?: string;
  dataset_name?: string;
  folders_path: string;
  plot_name: string;
  label: string;
}

export interface OverlaidSeparatelyProps {
  plots: PlotProperties[],
  ref: string,
}

export interface QueryProperties {
  run_number: string;
  dataset_name: string;
  folder_path: string;
  overlayPlots: string;
  overlayPosition: string;
  normalize: string;
  stats: string;
  error: string;
}
