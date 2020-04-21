import React from 'react';
import { Tabs, Typography, Button } from 'antd';
import { CustomModal } from '../modal';

import { worspaces } from '../../workspaces/offline'
import { toggleWorkspaceMenu, setWorkspace } from '../../reducers/displayFolderOrPlot';
import { StyledButton } from '../styledComponents';

const { TabPane } = Tabs;
const { Title } = Typography

interface WorkspacesProps {
  visible: boolean;
  dispatch: any
}

export const Workspaces = ({ visible, dispatch }: WorkspacesProps) => {
  const worspacesNames = worspaces.map((workspace: any) => workspace.label)

  return (
    <CustomModal
      title="Workspaces"
      onClosing={() => toggleWorkspaceMenu(!visible)(dispatch)}
      visible={visible}>
      <Tabs defaultActiveKey="0">
        {
          worspacesNames.map((name: string, index: number) => {
            const subWorkspaces = worspaces[index].workspaces
            return (<TabPane tab={`${name}`} key={`${index}`}>
              <div>
                {
                  //@ts-ignore
                  subWorkspaces.map((subWorkspace: any) =>
                    <div style={{ display: 'flex', justifyContent: "center", cursor: 'pointer' }}>
                      <div style={{ fontWeight: 'bold' }} onClick={()=> setWorkspace(subWorkspace)(dispatch)}>
                        {subWorkspace.label}
                      </div >
                    </div>)
                }
              </div>
            </TabPane>)
          }
          )
        }
      </Tabs>
    </CustomModal>)
}