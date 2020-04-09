import React from 'react';
import styled from 'styled-components';
import { Collapse } from 'antd';

import { theme } from '../../styles/theme';

const { Panel } = Collapse;

export const CheckboxesWrapper = styled.div`
  padding: calc(${theme.space.spaceBetween}*2);
`;
