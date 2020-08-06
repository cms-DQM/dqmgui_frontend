import { useEffect, useState } from 'react';
import cleanDeep from 'clean-deep';

import { PlotInterface } from '../containers/display/content';
import { getNameAndDirectoriesFromDir } from '../containers/display/utils';
import { PlotDataProps, QueryProps } from '../containers/display/interfaces';
import { useRouter } from 'next/router';

export const useDisplayedName = (contents: any, data: any) => {
  const [plotContent, setPlotContent] = useState<PlotDataProps[]>([]);
  const router = useRouter();
  const query: QueryProps = router.query;

  useEffect(() => {
    const plotsData: any = cleanDeep(
      contents.map((content: PlotInterface) => {
        if (content.path) {
          const { name, directories } = getNameAndDirectoriesFromDir(content);
          //displayedName is the name which is displayed as label of plot
          //name is a plot name with which need to make a req. to api.
          // displayedName and name could be different, because "Layouts" overwrite the plot name in their own way
          // but user visible plot name should be stay the same as was (not overwritten)
          return {
            displayedName: content.obj ? content.obj : content.name,
            name: name,
            path: content.path && '/' + directories,
            layout: content.layout,
          };
        }
      })
    );
    const result = plotsData ? plotsData : [];
    setPlotContent(result);
  }, [data, query.dataset_name, query.run_number]);

  return plotContent;
};
