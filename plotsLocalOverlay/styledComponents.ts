import { Row, Table } from 'antd';
import { parseInt } from 'lodash';
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

export const StyledSelectedPlotsTable = styled(Table)`
    width: 100% !important;
    .ant-table-wrapper {
        width: 100% !important;
    };
    .ant-table-tbody {
        word-break: break-word;
    }
`

export const Wrapper = styled.div<{ direction: string }>`
    display: flex;
    flex-direction: ${(props) => props.direction};
`

export const Grid = styled.div<{ space: string }>`
    padding: ${props => `calc(${props.space}px * 2)`};
`

export const Side = styled.div<{ proportion: string }>`
    width: ${props => props.proportion};
    margin: 32px;
    overflow: scroll;
`