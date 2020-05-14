import { UpOutlined, DownOutlined } from '@ant-design/icons';

interface OpenCloseIconsProps{
    open: boolean
}

export const OpenCloseIcons = ({ open }: OpenCloseIconsProps) =>
    open ? <UpOutlined /> : <DownOutlined />

