
import { Modal, Button } from 'antd';
import styled from 'styled-components';
import { theme } from '../../../../../styles/theme';

export const Report_summary_modal = styled(Modal)`
.ant-modal-body{
    height: 80vh;
    overflow: scroll;
};
.ant-list ant-list-split{
    height: 100%;
    
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