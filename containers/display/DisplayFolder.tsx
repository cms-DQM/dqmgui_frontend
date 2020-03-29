import { FC } from 'react';
import { useRequest } from '../../hooks/useRequest';

interface FolderProps {
  folder_path?: string;
  run_number: number;
  dataset_name: string;
}

const DiplayFolder: FC<FolderProps> = ({
  folder_path,
  run_number,
  dataset_name
}) => {
  const { data, error, isLoading } = useRequest(
    `/api/data/json/archive/${run_number}${dataset_name}${folder_path}`
  );
  return (
    <div>
      folder path: {folder_path}, {run_number}, {dataset_name}
    </div>
  );
};

export default DiplayFolder;
