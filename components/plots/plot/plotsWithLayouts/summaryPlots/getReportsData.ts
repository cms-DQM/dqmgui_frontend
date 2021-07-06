import { get_all_plots_and_folders } from '../../../../../containers/display/content/quickCollectionPlotsAndFoldersHandling/get_all_plots_and_folders';
import { getReportInfo } from './getReportInfo';

interface getReportsDataProps {
    subsystem: string;
    run_number: string;
    lumi: string;
    dataset_name: string;
    notOlderThan?: number;
}

export const getReportsData = async (props: getReportsDataProps) => {
    const { subsystem, run_number, lumi, dataset_name, notOlderThan } = props

    const folder_path = `${subsystem}/EventInfo`
    const parameters = { folder_path, run_number, dataset_name, notOlderThan }
    const response = await get_all_plots_and_folders(parameters)
    const { plots } = response
    const plots_names = plots.map((plot) => plot.name)
    const data = await getReportInfo({ run_number, dataset_name, lumi, subsystem, plots_names })
    return data
}