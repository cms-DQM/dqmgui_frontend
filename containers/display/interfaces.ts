export interface TripleProps {
  [key: string]: string | number | boolean;
}

export interface FolderPathQuery {
  run_number?: number;
  dataset_name?: string;
  folder_path?: string;
}

export interface OptionProps {
  label: string;
  value: any;
  action?(option?: any): void;
}

export interface SizeProps {
  w: number;
  h: number;
}

export interface PlotProps {
  plot_name?: string;
  dataset_name: string;
  run_number: number;
  folders_path?: string;
  overlay_plot?: TripleProps[];
  width: number;
  height: number;
  overlay?: string;
  stats?: boolean;
  normalize?: boolean;
  errorBars?: boolean;
}

export interface ParamsForApiProps extends PlotProps {
  joined_overlaied_plots_urls?: string;
  overlay?: string;
  customizeProps?: CustomizeProps;
}

export interface DisplayFolderOrPlotComponentProps {
  errorBars: boolean;
  height: number;
  width: number;
  normalize: boolean;
  overlay_plot: TripleProps[];
  stats: boolean;
  selected_plots: PlotDataProps[];
  overlay: string;
  jsroot_mode: boolean;
  zoomedPlotSize: SizeProps;
  customizeProps?: CustomizeProps;
}

export interface CustomizeProps {
  xtype: string;
  xmin: number;
  xmax: number;
  ytype: string;
  ymin: number;
  ymax: number;
  ztype: string;
  zmin: number;
  zmax: number;
  drawopts: string;
  withref: string;
}

export interface NavigationSearchFieldsProps {
  search_by_dataset_name: string;
  search_by_run_number: number;
}

export interface PlotDataProps {
  name: string;
  dir: string;
}
