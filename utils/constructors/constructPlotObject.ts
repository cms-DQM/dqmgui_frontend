import cleanDeep from 'clean-deep';
import { functions_config } from '../../config/config';
import { PlotInterface } from '../../containers/display/content/folders_and_plots_content';
import { getNameAndDirectoriesFromDir } from '../../containers/display/utils';

export const construct_full_plot_object = (contents: any, data: any) => {
  const plotsData: any = contents.map((content: PlotInterface) => {
    if (content.path) {
      const { name, directories } = getNameAndDirectoriesFromDir(content as any);
      return {
        ...content,
        name: name,
        path: content.path && directories,
        layout: content.layout,
        qteststatuses: functions_config.new_back_end.new_back_end
          ? content.qteststatuses
          : content.qresults,
      };
    } else {
      return undefined
    }
  });
  return cleanDeep(plotsData)
}
