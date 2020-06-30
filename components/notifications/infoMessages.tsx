import * as React from 'react'
import { Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons';

export const info = (disabled: boolean) => {
    if (disabled) {
        return (<Tooltip title="At least on plot must be selected">
            <InfoCircleOutlined />
        </Tooltip>)
    } return <></>
}
