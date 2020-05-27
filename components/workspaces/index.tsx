import * as React from 'react';
import { Tabs, Button } from 'antd';

import { workspaces } from '../../workspaces/offline'
import { StyledModal } from '../viewDetailsMenu/styledComponents';
import Form from 'antd/lib/form/Form';
import { StyledFormItem } from '../styledComponents';
import { useRouter } from 'next/router';
import { setWorkspaceToQuery } from './utils';
import { QueryProps } from '../../containers/display/interfaces';
import { useFilterFoldersByWorkspaces } from '../../hooks/useFolderLayers';

const { TabPane } = Tabs;

interface WorspaceProps {
  label: string;
  workspaces: any;
}
const Workspaces = () => {
  const [openWorkspaces, toggleWorkspaces] = React.useState(false)

  const router = useRouter();
  const query: QueryProps = router.query;

  const [workspace, setWorkspace] = React.useState(query.workspace)

  useFilterFoldersByWorkspaces(query)

  React.useEffect(() => {
    const workspaceValue = query.workspace ? query.workspace : workspaces[0].workspaces[2].label //Everything by default
    setWorkspaceToQuery(query, workspaceValue)
    setWorkspace(query.workspace)
    if (!query.workspace) {
      setWorkspace(workspaces[0].workspaces[2].label)//Everything by default
    }
  }, [])


  return (
    <Form>
      <StyledFormItem
        labelcolor="white"
        label="Worskpaces"
      >
        <Button onClick={() => { toggleWorkspaces(!openWorkspaces) }} type="link">{workspace}</Button>
        <StyledModal
          title="Worspaces"
          visible={openWorkspaces}
          onCancel={() => toggleWorkspaces(false)}
          footer={[
            <Button
              key="Close"
              onClick={() => {
                toggleWorkspaces(false)
              }}
            >
              Close
            </Button>,
          ]}
        >
          <Tabs defaultActiveKey="1" type="card"
          >
            {workspaces.map((workspace: WorspaceProps) => (
              <TabPane
                key={workspace.label}
                tab={workspace.label}
              >
                {workspace.workspaces.map((subWorkspace: any) => (
                  <Button key={subWorkspace.label} type="link" onClick={async () => {
                    setWorkspace(subWorkspace.label)
                    toggleWorkspaces(!openWorkspaces)
                    //if workspace is selected, folder_path in query is set to ''. Then we can regonize
                    //that workspace is selected, and wee need to filter the forst layer of folders.
                    await setWorkspaceToQuery(query, subWorkspace.label)
                  }}>{subWorkspace.label}</Button>
                ))}
              </TabPane>
            ))}

          </Tabs>
        </StyledModal>
      </StyledFormItem>
    </Form>
  )
}

export default Workspaces