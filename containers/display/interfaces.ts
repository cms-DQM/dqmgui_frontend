export interface TripleProps {
  [key: string]: string | number | boolean,
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
}