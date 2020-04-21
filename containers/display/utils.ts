import { worspaces } from "../../workspaces/offline";
import cleanDeep from "clean-deep";

export const getFolderPath = (folders: string[], clickedFolder: string) => {
  const folderIndex = folders.indexOf(clickedFolder);
  const restFolders: string[] = folders.slice(0, folderIndex + 1);
  const foldersString = restFolders.join('/');
  return foldersString;
};

export const isPlotSelected = (selected_plots: string[], plot: string) => {
  return selected_plots.includes(plot);
};

export const filterDirestoriesByWorkspace = (directories: any, workspaceName: string) => {
  const filtered = worspaces.map((workspace: any) => {
    const subworkspaces = workspace.workspaces

    const folders = subworkspaces.map((subworkspace: any) => {
      if (subworkspace.label === workspaceName) {
        const folder = subworkspace.foldersPath
        return folder
      }
    })
    return cleanDeep(folders)
  })
  const cleaned = cleanDeep(filtered)[0]
  console.log(cleaned)
  return filtered
}