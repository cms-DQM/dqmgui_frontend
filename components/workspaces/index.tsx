import * as React from 'react';
import { Tabs, Button } from 'antd';

import { workspaces as offlineWorskpace } from '../../workspaces/offline';
import { workspaces as onlineWorkspace } from '../../workspaces/online';
import { StyledModal } from '../viewDetailsMenu/styledComponents';
import Form from 'antd/lib/form/Form';
import { StyledFormItem, StyledButton } from '../styledComponents';
import { useRouter } from 'next/router';
import { setWorkspaceToQuery } from './utils';
import { QueryProps } from '../../containers/display/interfaces';
import { theme } from '../../styles/theme';
import { functions_config } from '../../config/config';
import { store } from '../../contexts/leftSideContext';

const { TabPane } = Tabs;

interface WorspaceProps {
  label: string;
  workspaces: any;
}
const Workspaces = () => {
  const { workspace, setWorkspace } = React.useContext(store)

  const workspaces =
    functions_config.mode === 'ONLINE' ? onlineWorkspace : offlineWorskpace;
    
  const initialWorkspace = functions_config.mode === 'ONLINE' ? workspaces[0].workspaces[1].label : workspaces[0].workspaces[3].label

  React.useEffect(() => {
    setWorkspace(initialWorkspace)
    return () => setWorkspace(initialWorkspace)
  }, [])

  const router = useRouter();
  const query: QueryProps = router.query;

  const [openWorkspaces, toggleWorkspaces] = React.useState(false);

  // make a workspace set from context
  return (
    <Form>
      <StyledFormItem labelcolor="white" label="Workspace">
        <Button
          onClick={() => {
            toggleWorkspaces(!openWorkspaces);
          }}
          type="link"
        >
          {workspace}
        </Button>
        <StyledModal
          title="Workspaces"
          visible={openWorkspaces}
          onCancel={() => toggleWorkspaces(false)}
          footer={[
            <StyledButton
              color={theme.colors.secondary.main}
              background="white"
              key="Close"
              onClick={() => toggleWorkspaces(false)}
            >
              Close
            </StyledButton>,
          ]}
        >
          <Tabs defaultActiveKey="1" type="card">
            {workspaces.map((workspace: WorspaceProps) => (
              <TabPane key={workspace.label} tab={workspace.label}>
                {workspace.workspaces.map((subWorkspace: any) => (
                  <Button
                    key={subWorkspace.label}
                    type="link"
                    onClick={async () => {
                      setWorkspace(subWorkspace.label);
                      toggleWorkspaces(!openWorkspaces);
                      //if workspace is selected, folder_path in query is set to ''. Then we can regonize
                      //that workspace is selected, and wee need to filter the forst layer of folders.
                      await setWorkspaceToQuery(query, subWorkspace.label);
                    }}
                  >
                    {subWorkspace.label}
                  </Button>
                ))}
              </TabPane>
            ))}
          </Tabs>
        </StyledModal>
      </StyledFormItem>
    </Form>
  );
};

export default Workspaces;
