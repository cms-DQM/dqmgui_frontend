import * as React from 'react';
import { Tabs, Button } from 'antd';

import { workspaces as offlineWorskpace } from '../../workspaces/offline';
import { workspaces as onlineWorkspace } from '../../workspaces/online';
import { StyledModal } from '../viewDetailsMenu/styledComponents';
import Form from 'antd/lib/form/Form';
import { StyledFormItem } from '../styledComponents';
import { useRouter } from 'next/router';
import { setWorkspaceToQuery } from './utils';
import { QueryProps } from '../../containers/display/interfaces';
import { functions_config } from '../../config/config';
import { store } from '../../contexts/globalStateContext';

const { TabPane } = Tabs;

interface WorspaceProps {
  label: string;
  workspaces: any;
}

const Workspaces = () => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const { workspace, setWorkspace } = React.useContext(store)

  const workspaces =
    functions_config.mode === 'ONLINE' ? onlineWorkspace : offlineWorskpace;

  React.useEffect(() => {
    const initialWorkspace = query.workspaces ? query.workspaces : workspaces[0].workspaces[3].label

    setWorkspace(initialWorkspace)
    return () => setWorkspace(initialWorkspace)
  }, [])

  const [openWorkspaces, toggleWorkspaces] = React.useState(false);

  // make a workspace set from context
  return (
    <Form>
      <StyledFormItem label="Workspace">
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
          footer={null}
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
                      if (subWorkspace.label === workspaces[0].workspaces[0].label) {
                        await setWorkspaceToQuery(query, subWorkspace.label, 'Summary');
                      } else {
                        await setWorkspaceToQuery(query, subWorkspace.label);
                      }
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
