import { PlotDataProps, TripleProps } from '../../../../containers/display/interfaces';
import cleanDeep from 'clean-deep';

export const removePlotFromSelectedPlots = (
  plotsQuery: string | undefined,
  plotName: PlotDataProps
) => {
  const plotsWithDirs = plotsQuery ? plotsQuery.split('&') : [];
  const fileterdPlotsAndDirs = plotsWithDirs.map((plotWithDir: string) => {
    const plotAndDir = plotWithDir.split('/');
    if (plotAndDir[plotAndDir.length - 1] !== plotName.name) {
      return plotWithDir;
    }
  });
  const cleanedFileterdPlotsAndDirs = cleanDeep(fileterdPlotsAndDirs);
  const plotsForQuery = cleanedFileterdPlotsAndDirs.join('&');
  return plotsForQuery;
};

export const addToSelectedPlots = (
  plotsQuery: string | undefined,
  plot: PlotDataProps
) => `${plotsQuery ? plotsQuery + '&' : ''}${plot.dir}/${plot.name}`;

export const addOverlayData = (triples: TripleProps[] | undefined) => {
  const params = triples && triples.map((triple: TripleProps) => `${triple.run_number}${triple.dataset_name}/${triple.label ? triple.label : triple.run_number}`)
  const query = params?.join('&')
  return query;
}
