import { useState } from 'react';

import { root_url } from '../../config/config';
import {sizes} from '../../components/constants'

interface PlotProps {
    plot_name: string;
    dataset_name: string;
    run_number: number;
    folders_path?: string;
}

export const Plot = ({ plot_name, dataset_name, run_number, folders_path }: PlotProps) => {
    const [width, set_width] = useState(sizes.medium.size.w)
    const [height, set_height] = useState(sizes.medium.size.h)

    const plot_url = `plotfairy/archive/${run_number}${dataset_name}${folders_path}/${plot_name}?w=${width};h=${height}`
    const source = `${root_url}/${plot_url}`

    return (
        <div style={{ height: height, width: width }}>
            <p>{plot_name}</p>
            <img alt={plot_name} src={source} />
        </div>
    )
}