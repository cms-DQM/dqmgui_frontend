export const getFolderPath = (folders: string[], clickedFolder: string) => {
    const folderIndex = folders.indexOf(clickedFolder)
    const restFolders: string[] = folders.slice(0, folderIndex+1)
    const foldersString = restFolders.join("/")
    console.log(folders, clickedFolder, folderIndex)
    return foldersString
}