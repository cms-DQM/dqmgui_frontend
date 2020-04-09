import { Form, Button, Input, Tag, Row } from 'antd';
import styled from 'styled-components';
import { QuestionOutlined } from '@ant-design/icons';

import { theme } from '../styles/theme';

export const StyledButton = styled(Button)`
  background-color: ${theme.colors.secondary.main} !important;
  border-style: none;
  border-radius: 5px;
  text-transform: uppercase;
  &:hover {
    background-color: ${theme.colors.secondary.light} !important;
    color: ${theme.colors.common.black} !important;
  };
  color: ${theme.colors.common.white} !important;
`;
export const StyledSecondaryButton = styled(Button)`
  background-color: ${theme.colors.primary.main};
  border-style: none;
  color: ${theme.colors.common.white};
  border-radius: 50px;
  &:hover {
    background-color: ${theme.colors.primary.light};
  }
`;
export const Icon = styled(QuestionOutlined)`
  color: ${theme.colors.common.white};
`;
export const StyledQuestionTag = styled(Tag)`
  background-color: ${theme.colors.primary.main};
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${theme.colors.secondary.light};
    color: ${theme.colors.common.black};
  }
  border-radius: 100px;
`;
export const StyledFormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    color: ${theme.colors.common.white};
    padding-right: ${theme.space.spaceBetween};
  }
`;

export const StyledInput = styled(Input)`
  border-radius: 12px;
  width: fit-content;
`;
export const StyledForm = styled(Form)`
  flex-direction: column;
  width: fit-content;
`;
export const StyledActionButtonRow = styled(Row)`
  display: flex;
  justify-content: flex-end;
  padding-top: calc(${theme.space.spaceBetween}*2);
  padding-bottom: calc(${theme.space.spaceBetween}*2);
`;

export const FormItem = styled(Form.Item)`
  margin: 0 !important;
`;
