import { FC, useState, useEffect } from 'react';
import { useRequest } from '../../hooks/useRequest';
import Link from 'next/link';
import { Plot } from './plot';
import { ViewDetailsMenu } from '../../components/ViewDetailsMenu';
import { TrinomialProps, ParamsForApiProps } from './interfaces'
import { sizes } from '../../components/constants';
import { OverlaidPlot } from './overlaidPlots';
import { SizeChanger } from '../../components/sizeChanger';
import { ZoomedPlots } from '../../components/zoomedPlots';

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
  const [selected_plots, set_selected_plots] = useState<string[]>([])

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

  const params_for_api: ParamsForApiProps = {
    overlay_plot: overlay_plot,
    run_number: run_number,
    folders_path: folder_path,
    dataset_name: dataset_name,
    width: width,
    height: height,
    overlay: overlay,
  }
  const windows_width = selected_plots ? '50%' : '100%'

  return (
    <>
      <div >
        folder path: {folder_path}, {run_number}, {dataset_name}
      </div>{
        isPlotExists.length > 0 &&
        <>
          <ViewDetailsMenu set_plot_to_overlay={set_plot_to_overlay} />
          <SizeChanger set_height={set_height} set_width={set_width} />
        </>
      }
      <div style={{ width: `${windows_width}` }}>
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
                    params_for_api={params_for_api}
                    set_selected_plots={set_selected_plots}
                  />
                  :
                  <Plot
                    plot_name={plot_name}
                    params_for_api={params_for_api}
                    set_selected_plots={set_selected_plots}
                  />
              }
            </li>
          )
        }
        )}
      </div>
      {selected_plots &&
        <div style={{ width: `${windows_width}` }}>
          <ZoomedPlots
            params_for_api={params_for_api}
            selected_plots={selected_plots}
          />
        </div>
      }
    </>
  );
};

export default DiplayFolder;
