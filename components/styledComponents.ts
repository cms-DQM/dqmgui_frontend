import {
  Form,
  Button,
  Input,
  Tag,
  Row,
  AutoComplete,
  Checkbox,
  Radio,
  Col,
} from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { QuestionOutlined } from '@ant-design/icons';

const { Search } = Input;

import { theme } from '../styles/theme';

export const StyledButton = styled(Button)`
  background-color: ${theme.colors.secondary.main} !important;
  border-style: none;
  border-radius: 5px;
  text-transform: uppercase;
  &:hover {
    background-color: ${theme.colors.secondary.light} !important;
    color: ${theme.colors.common.black} !important;
  }
  color: ${theme.colors.common.white} !important;
`;

export const StyledSecondaryButton = styled(Button)`
  background-color: ${theme.colors.primary.main} !important;
  border-style: none !important;
  color: ${theme.colors.common.white} !important;
  border-radius: 50px;
  &:hover {
    background-color: ${theme.colors.primary.light} !important;
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

export const StyledFormItem = styled(Form.Item) <{ labelcolor?: string }>`
  .ant-form-item-label > label {
    color: ${(props) =>
    props.labelcolor ? props.labelcolor : theme.colors.common.black};
    padding-right: ${theme.space.spaceBetween};
    width: fit-content;
    padding: ${theme.space.spaceBetween};
  }
  ,
  .ant-form-item {
    margin-bottom: 0px !important;
  }
`;

export const StyledInput = styled(Input) <{ fullWidth?: boolean }>`
  border-radius: 12px;
  width: fit-content;
  width: ${(props) => (props.fullWidth ? '100%' : '')};
`;

export const StyledSearch = styled(Search) <{ fullWidth?: boolean }>`
  border-radius: 12px;
  width: fit-content;
  width: ${(props) => (props.fullWidth ? '100%' : '')};
`;

export const StyledAutocomplete = styled(AutoComplete)`
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: 12px;
    width: fit-content;
  }
`;

export const StyledForm = styled.div`
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

export const FieldsWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const StyledDiv = styled.div`
  margin: calc(${theme.space.spaceBetween}*2);
`;

export const ZoomedPlotsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding: calc(${theme.space.spaceBetween}*2);
`;

export const DisplayOptionsWrapper = styled.div`
  background: ${theme.colors.common.white};
  padding: calc(${theme.space.padding}*2);
`;

export const StyledOptionContent = styled.p<{ availability?: string }>`
  color: ${(props) =>
    props.availability === 'available'
      ? theme.colors.notification.success
      : theme.colors.notification.error};
`;
export const StyledErrorIcon = styled(CloseCircleFilled)`
  font-size: 25px;
  padding-left: 8px;
  color: ${theme.colors.notification.error};
`;
export const StyledSuccessIcon = styled(CheckCircleFilled)`
  font-size: 25px;
  padding-left: 8px;
  color: ${theme.colors.notification.success};
`;
export const StyledRadio = styled(Radio) <{ color?: string }>`
  color: ${(props) => (props.color ? props.color : theme.colors.common.black)};
`;
export const CutomFormItem = styled(FormItem) <{ color?: string }>`
  .ant-form-item-label > label {
    color: ${(props) =>
    props.color ? props.color : theme.colors.common.black};
  }
`;

export const CustomCheckbox = styled(Checkbox) <{ color?: string }>`
  color: ${(props) => (props.color ? props.color : theme.colors.common.black)};
`;
export const CustomParagraph = styled.p<{ color?: string }>`
  color: ${(props) => (props.color ? props.color : theme.colors.common.black)};
`;
export const CustomRow = styled(Row) <{
  width?: string;
  display?: string;
  justifycontent?: string;
  space?: string;
  alignitems?: string;
}>`
  display: ${(props) => (props.display ? props.display : '')};
  justify-content: ${(props) =>
    props.justifycontent ? props.justifycontent : ''};
  padding: ${(props) => (props.space ? theme.space.padding : '')};
  align-items: ${(props) => (props.alignitems ? props.alignitems : '')};
  width: ${(props) => (props.width ? props.width : '')};
`;

export const CustomCol = styled(Col) <{
  display?: string;
  justifycontent?: string;
  space?: string;
  alignitems?: string;
}>`
  display: ${(props) => (props.display ? props.display : '')};
  justify-content: ${(props) =>
    props.justifycontent ? props.justifycontent : ''};
  padding-right: ${(props) =>
    props.space ? `calc(${theme.space.padding}*${props.space})` : ''};
  align-items: ${(props) => (props.alignitems ? props.alignitems : '')};
  height: fit-content;
`;
export const CustomDiv = styled(Col) <{
  display?: string;
  justifycontent?: string;
  space?: string;
  alignitems?: string;
  fullwidth?: string;
  width?: string;
  height?: string;
  hover?: string;
}>`
  display: ${(props) => (props.display ? props.display : '')};
  justify-content: ${(props) =>
    props.justifycontent ? props.justifycontent : ''};
  padding-right: ${(props) =>
    props.space ? `calc(${theme.space.padding}*${props.space})` : ''};
  align-items: ${(props) => (props.alignitems ? props.alignitems : '')};
  height: fit-content;
  width: ${(props) => (props.fullwidth === 'true' ? '100vw' : 'fit-content')};
  width: ${(props) => (props.width ? props.width : '')};
  height: ${(props) => (props.height ? props.height : '')};
  &:hover {
    color:${(props) => (props.hover ? theme.colors.primary.main : '')}!important;
  }`;
