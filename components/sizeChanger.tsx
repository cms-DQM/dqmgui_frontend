import { Menu, Dropdown, Button, message, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import { sizes } from './constants'

interface SizeChangerProps {
    set_width(width: number): void;
    set_height(height: number): void;
}
export const SizeChanger = ({ set_width, set_height }: SizeChangerProps) => {
    return (
      <>
      <button onClick={() => {
            set_height(sizes.large.size.h)
            set_width(sizes.large.size.w)
        }}>
            {sizes.large.label
            }
        </button>
         <button onClick={() => {
            set_height(sizes.fill.size.h)
            set_width(sizes.fill.size.w)
        }}>
            {sizes.fill.label
            }
        </button>
         <button onClick={() => {
            set_height(sizes.small.size.h)
            set_width(sizes.small.size.w)
        }}>
            {sizes.small.label
            }
        </button></>
    )
}