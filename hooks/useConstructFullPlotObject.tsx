import { useEffect, useState } from 'react';

import { PlotInterface } from '../containers/display/content/folders_and_plots_content';
import { getNameAndDirectoriesFromDir } from '../containers/display/utils';
import { PlotDataProps, QueryProps } from '../containers/display/interfaces';
import { useRouter } from 'next/router';
import { functions_config } from '../config/config';

export const useConstructFullPlotObject = (contents: any, data: any) => {
  const [plotContent, setPlotContent] = useState<PlotDataProps[]>([]);
  const router = useRouter();
  const query: QueryProps = router.query;

  useEffect(() => {
    const plotsData: any = contents.map((content: PlotInterface) => {
      if (content.path) {
        const { name, directories } = getNameAndDirectoriesFromDir(content as any);
        return {
          name: name,
          path: content.path && '/' + directories,
          layout: content.layout,
          qresults: functions_config.new_back_end.new_back_end
            ? content.qtstatuses
            : content.qresults,
        };
      }
    });

    const result = plotsData ? plotsData : [];
    setPlotContent(result);
  }, [data, query.dataset_name, query.run_number]);

  return plotContent;
};
