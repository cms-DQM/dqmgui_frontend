import { PlotDataProps, PlotInterface, DirectoryInterface } from './interfaces';
import cleanDeep from 'clean-deep';
import _ from 'lodash';

export const getFolderPath = (folders: string[], clickedFolder: string) => {
  const folderIndex = folders.indexOf(clickedFolder);
  const restFolders: string[] = folders.slice(0, folderIndex + 1);
  const foldersString = restFolders.join('/');
  return foldersString;
};

export const isPlotSelected = (
  selected_plots: PlotDataProps[],
  plot_name: string
) =>
  selected_plots.some(
    (selected_plot: PlotDataProps) => selected_plot.name === plot_name
  );

export const getSelectedPlotsNames = (plotsNames: string | undefined) => {
  const plots = plotsNames ? plotsNames.split('/') : [];

  return plots;
};

export const getSelectedPlots = (plotsQuery: string | undefined) => {
  const plotsWithDirs = plotsQuery ? plotsQuery.split('&') : [];
  return plotsWithDirs.map((plotWithDir: string) => {
    const plotAndDir = plotWithDir.split('/');
    const name = plotAndDir.pop();
    const directories = plotAndDir.join('/');
    const plotObject: PlotDataProps = {
      name: name ? name : '',
      dir: directories,
      properties: '' as any,
    };
    return plotObject;
  });
};

export const getFolderPathToQuery = (previuosFolderPath: string | undefined, currentSelected: string) => {
  return previuosFolderPath ? `${previuosFolderPath}/${currentSelected}` : `/${currentSelected}`
}

export const doesPlotExists = (contents: (PlotInterface & DirectoryInterface)[]) =>
  contents.filter((one_item: PlotInterface | DirectoryInterface) =>
    one_item.hasOwnProperty('obj')
  );

// what is streamerinfo? (coming from api, we don't know what it is, so we filtered it out)
// getContent also sorting data that directories should be displayed firstly, just after them- plots images.
export const getContents = (data: any) =>
  data
    ? _.sortBy(
      data.contents.filter(
        (one_item: PlotInterface | DirectoryInterface) =>
          !one_item.hasOwnProperty('streamerinfo')
      ),
      ['subdir']
    )
    : [];

export const getDirectories = (contents: DirectoryInterface[]) => cleanDeep(
  contents.map((content: DirectoryInterface) => content.subdir)
);

export const getFormatedPlotsObject = (contents: PlotInterface[]) => (
  cleanDeep(
    contents.map((content: PlotInterface) => {
      return { name: content.obj, dir: content.dir && '/' + content.dir, properties: content.properties };
    })
  ).sort()
)