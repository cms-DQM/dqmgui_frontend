import * as React from 'react';

import { navigationHandler } from '../../utils';
import { RunInfo } from '../../components/runInfo';
import { ComposedSearch } from '../../components/navigation/composedSearch';
import Nav from '../../components/Nav';
import { QueryProps } from './interfaces';
import { Col } from 'antd';


interface HeaderProps {
  isDatasetAndRunNumberSelected: boolean;
  query: QueryProps;
}

export const Header = ({
  isDatasetAndRunNumberSelected,
  query,
}: HeaderProps) => {
  return (
    <Col style={{width: '100%'}}>
      {
        //if all full set is selected: dataset name and run number, then regular search field is not visible.
        //Instead, run and dataset browser is is displayed.
        //Regular search fields are displayed just in the main page.
        isDatasetAndRunNumberSelected ? (
          <Col style={{display: 'flex', alignItems: 'center', width: '100%'}}>
          <Col style={{ display: 'flex', alignItems: 'center',float: 'left', padding: 8 }}>
            <RunInfo query={query} />
            <ComposedSearch />
          </Col>
         </Col>
        ) : (
            <>
              <Nav
                initial_search_run_number={query.search_run_number}
                initial_search_dataset_name={query.search_dataset_name}
                handler={navigationHandler}
                type="top"
              />
            </>
          )
      }
    </Col>
  );
};
