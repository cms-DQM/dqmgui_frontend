import styled from 'styled-components';

import { theme } from '../../styles/theme';
import { Modal } from 'antd';


export const CheckboxesWrapper = styled.div`
  padding: calc(${theme.space.spaceBetween}*2);
`;

export const StyledDiv = styled.div`
  display: flex;
`

export const ResultsWrapper = styled.div`
  overflow-x: hidden;
  height: 60vh;
  width: fit-content;
  padding-top: calc(${theme.space.padding}*2) ;
  width: auto;
`
export const NavWrapper = styled.div`
  width: 25vw
`

export const StyledModal = styled(Modal)`
.ant-modal-content{
  width: fit-content;
}`

export const FirstSectionWrapper = styled.div`
  display: flex;
  width: '50%';  
`