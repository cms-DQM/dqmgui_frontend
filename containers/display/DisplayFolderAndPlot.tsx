import { FC, useState, useEffect } from 'react';
import { useRequest } from '../../hooks/useRequest';
import Link from 'next/link';
import { Plot } from './plot';
import { ViewDetailsMenu, TrinomialProps } from '../../components/ViewDetailsMenu';
import { sizes } from '../../components/constants';
import { OverlaidPlot } from './overlaidPlots';

interface DirectoryInterface {
  subdir: string;
}

interface PlotInterface {
  obj: string,
}

interface FolderProps {
  folder_path?: string;
  run_number: number;
  dataset_name: string;
}


const DiplayFolder: FC<FolderProps> = ({
  folder_path,
  run_number,
  dataset_name
}) => {
  const [overlay_plot, set_plot_to_overlay] = useState<TrinomialProps[] | undefined>()
  const [width, set_width] = useState(sizes.medium.size.w)
  const [height, set_height] = useState(sizes.medium.size.h)
  const [overlay, set_overlay] = useState('overlay')

  const { data, error, isLoading } = useRequest(
    `/data/json/archive/${run_number}${dataset_name}${folder_path}`,
    {},
    [folder_path]
  );
  // what is streamerinfo? (coming from api, we don't know what it is, so we filtered it out)
  const contents: (PlotInterface & DirectoryInterface)[] = data ?
    data.contents.filter((one_item: (PlotInterface | DirectoryInterface)) => !one_item.hasOwnProperty('streamerinfo'))
    : []
  const isPlotExists = contents.filter((one_item: (PlotInterface | DirectoryInterface)) => one_item.hasOwnProperty('obj'))

  return (
    <>
      <div>
        folder path: {folder_path}, {run_number}, {dataset_name}
      </div>{
        isPlotExists.length > 0 &&
        <ViewDetailsMenu set_plot_to_overlay={set_plot_to_overlay} />
      }
      <div>
        {contents.map((directory_or_plot) => {

          const directory_name = directory_or_plot?.subdir
          const plot_name = directory_or_plot?.obj

          return (
            <li key={directory_name || plot_name}>
              {directory_name ?
                <Link
                  href={{
                    pathname: '/',
                    query: {
                      run_number: run_number,
                      dataset_name: dataset_name,
                      folder_path: `${folder_path}/${directory_name}`
                    }
                  }}
                >
                  <a>{directory_name}</a>
                </Link>
                : overlay_plot ?
                  <OverlaidPlot
                    plot_name={plot_name}
                    dataset_name={dataset_name}
                    folders_path={folder_path}
                    run_number={run_number}
                    width={width}
                    height={height}
                    overlay={overlay}
                    overlay_plot={overlay_plot}
                  />
                  :
                  <Plot
                    plot_name={plot_name}
                    dataset_name={dataset_name}
                    folders_path={folder_path}
                    run_number={run_number}
                    width={width}
                    height={height}
                  />
              }
            </li>
          )
        }
        )}
      </div>
    </>
  );
};

export default DiplayFolder;
