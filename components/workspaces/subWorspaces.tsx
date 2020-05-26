import * as React from 'react';
import { TreeSelect } from 'antd';
const { TreeNode } = TreeSelect;

export interface CustomazeProps {
  [key: string]: { label: string; foldersPathPath: string[] }
}

interface SubWorkspacesProps {
  workspaces: CustomazeProps;
}

const SubWorkspaces = ({ workspaces }: SubWorkspacesProps) => {
  const labelOfSubWorkspaces = Object.keys(workspaces)
  return (
    <>
      {labelOfSubWorkspaces.map((subWorkspace: string) => (
        <TreeNode key={subWorkspace} value={subWorkspace} title={subWorkspace} />
      ))}
    </>
  )
}

export default SubWorkspaces