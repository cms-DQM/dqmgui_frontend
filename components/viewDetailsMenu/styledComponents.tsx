import styled from 'styled-components';
import { Collapse } from 'antd';

import { theme } from '../../styles/theme';
import { Modal, Row, Select } from 'antd';

export const CheckboxesWrapper = styled.div`
  padding: calc(${theme.space.spaceBetween}*2);
`;

export const StyledDiv = styled.div`
  display: flex;
`;

export const ResultsWrapper = styled.div`
  overflow-x: hidden;
  height: 60vh;
  width: fit-content;
  padding-top: calc(${theme.space.padding}*2);
  width: auto;
`;
export const NavWrapper = styled.div`
  width: 25vw;
`;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    width: fit-content;
  }
`;

export const FullWidthRow = styled(Row)`
  width: 100%;
  padding: ${theme.space.spaceBetween};
`;
export const StyledSelect = styled(Select) <{ selected?: string, width?: number | undefined }>`
  .ant-select-selector {
    border-radius: 12px !important;
    width: ${(props) => props.width ? `${props.width}px` : ''} !important;
    font-weight: ${(props) =>
    props.selected === 'selected' ? 'bold' : 'inherit'} !important;
  }
`;

export const StyledCollapse = styled(Collapse)`
  width: 100%;
  .ant-collapse-content > .ant-collapse-content-box {
    padding: ${theme.space.spaceBetween};
  }
`;

export const OptionParagraph = styled.p`
display: flex;
align-items: center;
justify-content: center;
width: 100%; 
`

export const OptionsRow = styled(Row) <{ zoomedPlots?: string }>`
  position: fixed;
  z-index: 3;
  background: #f0f2f5;
  opacity: 0.93;
  width: ${(props) => props.zoomedPlots === "true" ? '50%' : ''}
`

export const ViewDetailsRow = styled(Row) <{ visible?: string }>`
  width: 100%;
  background-color: ${theme.colors.secondary.dark};
  margin: ${theme.space.padding};
  display: ${(props) => props.visible === "true" ? '' : 'none'};
  opacity: 1;
  padding: calc(${theme.space.padding}*2);
`

export const ViewDetailsMenuWrapper = styled.div`
  background-color: ${theme.colors.secondary.dark};
  padding: ${theme.space.padding};
  border-top: 1px solid;
`
