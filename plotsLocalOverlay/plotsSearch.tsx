import * as React from 'react';
import Form from 'antd/lib/form/Form';

import { useRouter } from 'next/router';
import { StyledSearch, StyledFormItem } from '../components/styledComponents';
import { SearchPlot } from './routerChangers';
import { ParametersForApi } from './interfaces';


interface PlotSearchProps {
parameters: ParametersForApi,
setParameters: React.Dispatch<React.SetStateAction<ParametersForApi | undefined>>
}

export const PlotSearch = ({ parameters , setParameters}: PlotSearchProps) => {
  const router = useRouter();
  const query = router.query;
  const [plotName, setPlotName] = React.useState<string>(
    query.plot_search as string
  );

  React.useEffect(() => {
      const name =  plotName ? plotName : undefined
      SearchPlot(name as any, router, parameters);
  }, [plotName]);

  React.useEffect(() => {
    const copy ={...parameters}
    copy.search = query.search as string
    setParameters(copy)
}, [query.search]);

  return React.useMemo(() => {
    return (
      <Form onChange={(e: any) => setPlotName(e.target.value)}> 
        <StyledFormItem>
          <StyledSearch
            defaultValue={query.search}
            id="plot_search"
            placeholder="Enter plot name"
          />
        </StyledFormItem>
      </Form>
    );
  }, [plotName]);
};
