import { Row, Table } from 'antd';
import styled from 'styled-components';
import { Layout } from 'antd';
import { theme } from '../styles/theme';

const {  Content } = Layout;

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
    height: 100%;
    flex-direction: ${(props) => props.direction};
`

export const Grid = styled.div<{ space: string }>`
    padding: ${props => `calc(${props.space}px * 2)`};
`

export const Side = styled.div<{ proportion: string, border?:string }>`
    width: ${props => props.proportion};
    margin: 32px;
    border-right: ${props => props.border === 'true'? `1px solid ${theme.colors.primary.main}` : '' };
`

export const SyledContent= styled(Content)`
    height: calc(100vh - 64px);
`
export const SearchContentWrapper = styled.div<{smaller: string}>`
    height: ${(props) => `calc(100% - ${props.smaller}px)`};
    overflow: scroll;
    overflow-x: hidden;
    width: 100%;
`

export const StyledRow = styled(Row)<{smaller: string}>`
    height: ${(props) => `calc(100% - ${props.smaller}px)`}
`

export const TagWrapper = styled.p`
    padding: 4;
`
export const TagsWrapper = styled.p`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`