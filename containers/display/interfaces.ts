export interface TrinomialProps {
  [key: string]: string | number,
}

export interface PlotProps {
  plot_name?: string;
  dataset_name: string;
  run_number: number;
  folders_path?: string;
  overlay_plot?: TrinomialProps[];
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