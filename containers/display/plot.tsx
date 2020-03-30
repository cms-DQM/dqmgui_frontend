import { root_url } from '../../config/config';

interface PlotProps {
    plot_name: string;
    height: string;
    width: string;
    dataset_name: string;
    run_number: number;
    folders_path?: string;
}

export const Plot = ({ plot_name, height, width, dataset_name, run_number, folders_path }: PlotProps) => {
    const plot_url = `plotfairy/archive/${run_number}${dataset_name}${folders_path}/${plot_name}?w=${width};h=${height}`
    const source = `${root_url}/${plot_url}`

    return (
        <div style={{ height: height, width: width }}>
            <p>{plot_name}</p>
            <img alt={plot_name} src={source} />
        </div>
    )
}