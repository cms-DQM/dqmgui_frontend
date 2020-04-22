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
    const folders = workspace.workspaces[workspaceName] && workspace.workspaces[workspaceName].foldersPath
    if (folders) {
      const matching = folders.filter((folder: string) => directories.includes(folder))
      return matching
    }
  })
  return(cleanDeep(filtered)[0])
}