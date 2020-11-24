import { Row } from 'antd';
import styled from 'styled-components';


export const PlotNameDiv = styled.div`
    padding: 4px;
    margin: 4px;
    cursor: pointer;
    display: block;
    white-space: pre-wrap;
    border: 1px solid;
    display: felx;
    justify-content: center;
    align-items: center;
    &:hover{
        color: #1890ff;
        font-weight: bold;
    }
`
export const ModalContent = styled.div`
    overflow: scroll;
    overflow-x: hidden;
    height: 50vh;
    width: 100%;
`

export const FoldersRow = styled(Row)`
    width: 100%; 
    flex: 1 1 auto;
`

export const SpinnerRow = styled(Row)`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

export const PlotsRow = styled(Row)`
    display: flex;
    justify-content: center;
`