import React from 'react';
import { Tooltip } from 'antd';

import { StyledQuestionTag, Icon } from './styledComponents';

export const QuestionButton = () => (
  <Tooltip title="Search could be done by run number or by dataset name, or by both">
    <StyledQuestionTag>
      <Icon />
    </StyledQuestionTag>
  </Tooltip>
);
