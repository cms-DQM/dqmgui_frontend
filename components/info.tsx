import * as React from 'react'
import { Popover } from 'antd'

interface InfoProps {
  content: any;
  title?: string;
  children: React.ReactElement
}

export const Info = ({ content, title, ...props }: InfoProps) => {
  console.log(props)
  return (
    <Popover
      content={content}
      title={title}
      trigger="hover"
    >
      {props.children}
    </Popover>
  )

}