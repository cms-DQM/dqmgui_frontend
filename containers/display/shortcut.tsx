import React from 'react';
import Link from 'next/link';

import { StyledDiv, WrapperDiv, StyledAForPath } from './styledComponents';

interface ShortcutProps {
  dataset_name: string;
  run_number: number;
}

export const Shortcut = ({
  run_number,
  dataset_name,
}: ShortcutProps) => {

  return (
    <StyledDiv>
      <div>
        <WrapperDiv>
          <Link
            href={{
              pathname: '/',
              query: {
                search_run_number: run_number,
                search_dataset_name: '',
              },
            }}
            replace
          >
            <WrapperDiv>
              <p>Run number:</p>
              <StyledAForPath>{run_number}</StyledAForPath>
            </WrapperDiv>
          </Link>
          <Link
            href={{
              pathname: '/',
              query: {
                search_run_number: '',
                search_dataset_name: dataset_name,
              },
            }}
            replace
          >
            <WrapperDiv>
              <p>Dataset Name:</p>
              <StyledAForPath> {dataset_name}</StyledAForPath>
            </WrapperDiv>
          </Link>
        </WrapperDiv>
      </div>
    </StyledDiv>
  );
};
