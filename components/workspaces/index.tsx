import * as React from 'react';
import { Tabs, Button } from 'antd';

import { workspaces } from '../../workspaces/offline'
import { StyledModal } from '../viewDetailsMenu/styledComponents';
import Form from 'antd/lib/form/Form';
import { StyledFormItem } from '../styledComponents';
import { store } from '../../contexts/leftSideContext';
import { useRouter } from 'next/router';
import { setWorkspaceToQuery } from './utils';
import { QueryProps } from '../../containers/display/interfaces';

const { TabPane } = Tabs;

interface WorspaceProps {
  label: string;
  workspaces: any;
}
const Workspaces = () => {
  const [openWorkspaces, toggleWorkspaces] = React.useState(false)
  //@ts-ignore

  const globalState = React.useContext(store)
  const { workspaceFolders, setWorkspaceFolders } = globalState

  const router = useRouter();
  const query: QueryProps = router.query;
  const [workspace, setWorkspace] = React.useState(query.workspace)

  React.useEffect(() => {
    setWorkspaceToQuery(query, workspaces[0].workspaces[0].label)
    if(query.workspace){
      setWorkspace(query.workspace)
    }else{
      setWorkspace(workspaces[0].workspaces[0].label)
    }
    // if (query.workspace) {
    //   setWorkspace(query.workspace)
    // }
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

        >
          <Tabs defaultActiveKey="1" type="card"
          >
            {workspaces.map((workspace: WorspaceProps) => (
              <TabPane
                key={workspace.label}
                tab={workspace.label}
              >
                {workspace.workspaces.map((subWorkspace: any) => (
                  <Button type="link" onClick={() => {
                    setWorkspace(subWorkspace.label)
                    toggleWorkspaces(!openWorkspaces)
                    setWorkspaceFolders(subWorkspace.foldersPath)
                    //if workspace is selected, folder_path in query is set to ''. Then we can regonize
                    //that workspace is selected, and wee need to filter the forst layer of folders.
                    setWorkspaceToQuery(query, subWorkspace.label)
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