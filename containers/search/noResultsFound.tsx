import * as React from 'react'

import { NotFoundDivWrapper, NotFoundDiv, Icon } from './styledComponents'

export const NoResultsFound = () => (
    <NotFoundDivWrapper>
        <NotFoundDiv>
            <Icon />
            <div>No Results Found</div>
        </NotFoundDiv>
    </NotFoundDivWrapper>
)