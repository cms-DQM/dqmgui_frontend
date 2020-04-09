import React from 'react';
import { Tag, Tooltip } from 'antd';
import { QuestionOutlined } from '@ant-design/icons';

import { StyledQuestionTag, Icon } from './styles';

export const QuestionButton = () => (
  <Tooltip title="Search could be done by run number or by dataset name, or by both">
    <StyledQuestionTag>
      <Icon />
    </StyledQuestionTag>
  </Tooltip>
);
