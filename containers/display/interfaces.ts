import { TrinomialProps } from "../../components/ViewDetailsMenu";

export interface PlotProps {
  plot_name: string;
  dataset_name: string;
  run_number: number;
  folders_path?: string;
  overlay_plot?: TrinomialProps[];
  width: number,
  height: number,
  overlay?: string,
}

export interface ParamsForApiProps extends PlotProps {
  joined_overlaied_plots_urls?: string,
  overlay?: string,
}