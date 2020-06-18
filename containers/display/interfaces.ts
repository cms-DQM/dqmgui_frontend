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
  icon?: JSX.Element;
}

export interface SizeProps {
  w: number;
  h: number;
}

export interface PlotProps extends LumisectionRequestProps {
  plot_name?: string;
  folders_path?: string;
  overlay_plot?: TripleProps[];
  width: number;
  height: number;
  overlay?: string;
  stats?: boolean;
  normalize?: string;
  errorBars?: boolean;
}

export interface LumisectionRequestProps {
  dataset_name: string;
  run_number: string;
  lumi?: number | string;
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
  search_by_run_number: string;
}

export interface PlotDataProps {
  displayedName: string;
  name: string;
  path: string;
  properties?: PlotPropertiesProps;
}

export interface NavigationSearchFieldsProps {
  search_by_dataset_name: string;
  search_by_run_number: string;
}

export interface QueryProps {
  run_number?: string;
  dataset_name?: string;
  folder_path?: string;
  search_run_number?: string;
  search_dataset_name?: string;
  selected_plots?: string;
  overlay_data?: string;
  overlay?: string;
  workspace?: string;
  plot_search?: string;
  normalize?: string;
  lumi?: string;
}

export interface PlotPropertiesProps {
  hasref: number;
  isEff: number;
  kind: string;
  lumisect: string;
  report: PlotPropertiesReportProps;
}

export interface PlotPropertiesReportProps {
  alarm: number;
  error: number;
  other: number;
  warn: number;
}

export interface PlotInterface {
  obj: string;
  path: string;
  content: any;
  properties: any;
}

export interface DirectoryInterface {
  subdir: string;
}

