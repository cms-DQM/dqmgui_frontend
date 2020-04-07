export interface TripleProps {
  [key: string]: string | number | boolean,
}

export interface OptionProps {
  label: string,
  value: any,
}
export interface PlotProps {
  plot_name?: string;
  dataset_name: string;
  run_number: number;
  folders_path?: string;
  overlay_plot?: TripleProps[];
  width: number,
  height: number,
  overlay?: string,
  stats?: boolean,
  normalize?: boolean,
  errorBars?: boolean,
}

export interface ParamsForApiProps extends PlotProps {
  joined_overlaied_plots_urls?: string,
  overlay?: string,
}

export interface DisplayFolderOrPlotComponentProps {
  errorBars: boolean,
  height: number,
  width: number,
  normalize: boolean,
  overlay_plot: TripleProps[],
  stats: boolean,
  selected_plots_name: string[]
  overlay: string,
  jsroot_mode: boolean
}

export interface NavigationSearchFieldsProps{
  search_by_dataset_name: string;
  search_by_run_number: number;
}
