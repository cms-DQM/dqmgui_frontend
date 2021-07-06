
import { Modal, Button } from 'antd';
import styled from 'styled-components';
import { theme } from '../../../../../styles/theme';

export const Report_summary_modal = styled(Modal)`
.ant-modal-content{
    overlfow: scroll;
}
`
export const Report_summary_button = styled(Button)`
    height: 30px;
    color: ${theme.colors.common.white};
    background: ${theme.colors.primary.main};
    &:focus{
        color: ${theme.colors.common.white};
        background: ${theme.colors.primary.main};        
    };
    &:hover{
        color: ${theme.colors.common.white};
        background: ${theme.colors.secondary.main};  
    }

`