import React from 'react'
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { FolderFilled  } from '@ant-design/icons';

export const Icon = styled(FolderFilled )`
    font-size: 2rem;
    cursor: pointer;
    padding-right: calc(${theme.space.spaceBetween}*2)
`
export const DirecotryWrapper = styled.div`
    padding: ${theme.space.spaceBetween};
    display: flex;
    align-items: center;
`

export const StyledA = styled.a`
    word-break:break-all;
`
