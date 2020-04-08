import { Form, Button } from 'antd';
import styled from 'styled-components';

import { theme } from '../styles/theme'

export const StyledButton = styled(Button)`
    background-color: ${theme.colors.secondary.main};
    border-style: none;
    &:hover{
      background-color: ${theme.colors.secondary.light};
      color: ${theme.colors.common.black}
    }
`
export const StyledFormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    color: ${theme.colors.common.white};
    padding-right: ${theme.space.spaceBetween}
}`