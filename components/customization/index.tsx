import * as React from 'react'
import { Modal } from 'antd'
import { CostumizeTable } from './table'

interface CustomizationProps {
  plot_name: string;
  open: boolean
}

export const Customization = ({ plot_name, open }: CustomizationProps) => {
  const [openCustomizationMenu, toggleCustomizationMenu] = React.useState(open)

  return (
    <Modal
      title={`${plot_name} plot customization`}
      visible={openCustomizationMenu}
      onCancel={() => toggleCustomizationMenu(false)}
    // onOk={()=>{}}
    >
      <CostumizeTable />
    </Modal>
  )
}
