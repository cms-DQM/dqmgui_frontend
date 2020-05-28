import * as React from 'react'
import Form from 'antd/lib/form/Form'
import { Input } from 'antd';
import { StyledFormItem } from '../../styledComponents';
import { usePlotSearch } from '../../../hooks/usePlotSearch';
import { store } from '../../../contexts/leftSideContext';
import { QueryProps } from '../../../containers/display/interfaces';
import { useRouter } from 'next/router';

const { Search } = Input;

interface PlotSearchProps {

}

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

export const PlotSearch = () => {
  const [plotName, setPlotName] = React.useState<string>('')

  const router = useRouter();
  const query: QueryProps = router.query;
  const run_number = query.run_number
  const dataset_name = query.dataset_name
const folder_path = query.folder_path
  const { directories, isLoading, errors } = usePlotSearch(plotName, run_number, dataset_name, folder_path)

  const globalState = React.useContext(store)
  const { setWorkspaceFolders } = globalState

  React.useEffect(() => {
    //if directories folder lenght won't be cheked and empty array will be set to setWorkspaceFolders
    // will be returned all folders (it means Everything workspace). We don't want that, because 
    //different workspace could be selected
    if (directories.length > 0) {
      setWorkspaceFolders(directories)
    }
  }, [isLoading])

  return (
    <Form
      onChange={(e: any) => setPlotName(e.target.value)}
    >
      <StyledFormItem>
        <Search
          id="plot_search"
          placeholder="Enter plot name"
          loading={isLoading}
        />
      </StyledFormItem>
    </Form>
  )
}