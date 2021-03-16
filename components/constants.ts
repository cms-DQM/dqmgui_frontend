import { theme } from "../styles/theme";

export const sizes = {
  tiny: {
    label: 'Tiny',
    size: {
      w: 67,
      h: 50,
    },
  },
  small: {
    label: 'Small',
    size: {
      w: 133,
      h: 100,
    },
  },
  medium: {
    label: 'Medium',
    size: {
      w: 266,
      h: 200,
    },
  },
  large: {
    label: 'Large',
    size: {
      w: 532,
      h: 400,
    },
  },
  fill: {
    label: 'Fill',
    size: {
      w: 720,
      h: 541,
    },
  },
};

export const field_name: any = {
  dataset_name: 'Dataset name',
  run_number: 'Run number',
  label: 'label',
};

export const FOLDERS_OR_PLOTS_REDUCER = {
  SET_PLOT_TO_OVERLAY: 'SET_PLOT_TO_OVERLAY',
  SET_WIDTH: 'SET_WIDTH',
  SET_HEIGHT: 'SET_HEIGHT',
  SET_ZOOMED_PLOT_SIZE: 'SET_ZOOMED_PLOT_SIZE',
  SET_NORMALIZE: 'SET_NORMALIZE',
  SET_STATS: 'SET_STATS',
  SET_ERR_BARS: 'SET_ERR_BARS',
  SHOW: 'SHOW',
  JSROOT_MODE: 'JSROOT_MODE',
  SET_PARAMS_FOR_CUSTOMIZE: 'SET_PARAMS_FOR_CUSTOMIZE',
};

export const NAV_REDUCER = {
  SET_SEARCH_BY_DATASET_NAME: 'SET_SEARCH_BY_DATASET_NAME',
  SET_SEARCH_BY_RUN_NUMBER: 'SET_SEARCH_BY_RUN_NUMBER',
};

export const REFERENCE_REDCER = {
  CHANGE_TRIPLES_VALUES: 'CHANGE_TRIPLES_VALUES',
  OPEN_MODAL: 'OPEN_MODAL',
};

export const overlayOptions = [
  { label: 'Overlay', value: 'overlay' },
  { label: 'On side', value: 'onSide' },
  { label: 'Overlay+ratio', value: 'ratiooverlay' },
  { label: 'Stacked', value: 'stacked' },
];

export const xyzTypes = [
  { label: 'Default', value: '' },
  { label: 'Linear', value: 'lin' },
  { label: 'Log', value: 'log' },
];

export const withReference = [
  { label: 'Default', value: '' },
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

export const dataSetSelections = [
  {
    label: 'Dataset Select',
    value: 'datasetSelect',
  },
  {
    label: 'Dataset Builder',
    value: 'datasetBuilder',
  },
];

export const viewPositions = [
  { label: 'Horizontal', value: 'horizontal' },
  { label: 'Vertical', value: 'vertical' },
];

export const plotsProportionsOptions = [
  { label: '50% : 50%', value: '50%' },
  { label: '25% : 75%', value: '25%' },
];

export const additional_run_info = [
  { value: 'CMSSW_Version', label: 'CMSSW version: ' },
  { value: 'CertificationSummary', label: 'CertificationSummary: ' },
  { value: 'hostName', label: 'Host name: ' },
  { value: 'iEvent', label: 'Event #: ' },
  { value: 'processID', label: 'Process ID: ' },
  { value: 'processLatency', label: 'Process Latency: ' },
  { value: 'processName', label: 'Process Name: ' },
  {
    value: 'processStartTimeStamp',
    label: 'Process Start Time, UTC time: ',
    type: 'time',
  },
  {
    value: 'processTimeStamp',
    label: 'Process Time, UTC time: ',
    type: 'time',
  },
  { value: 'processedEvents', label: 'Processed Events: ' },
  { value: 'reportSummary', label: 'Report Summary: ' },
  {
    value: 'runStartTimeStamp',
    label: 'Run started, UTC time: ',
    type: 'time',
  },
  { value: 'workingDir', label: 'Working directory: ' },
];

export const main_run_info = [
  { value: 'iRun', label: 'Run: ' },
  { value: 'iLumiSection', label: 'LS #: ' },
  { value: 'iEvent', label: 'Event #: ' },
  { value: 'runStartTimeStamp', label: 'Run started, UTC time: ', type: 'time' },
];

export const run_info = main_run_info.concat(additional_run_info);


const OTHER = `< Anything but 'ok','warning' or 'error'.`
const DISABLED = `< Test has been disabled.`
const INVALID = `< Problem preventing test from running.`
const INSUF_STAT = `< Insufficient statistics.`
const DID_NOT_RUN = `< Algorithm did not run.`
const STATUS_OK = `< Test was successful.`
const WARNING = `< Test had some problems.`
const ERROR = `< Test has failed.`

export const qualityTestStatus = {
  30: {
    description: OTHER,
    color: '#000000'	
  },  //< Anything but 'ok','warning' or 'error'.
  50: {
    description: DISABLED,
    color: '#808080'	
  }, //< Test has been disabled.
  60:  {
    description: INVALID,
    color: '#c63939'	
  }, //< Problem preventing test from running. 	
  70: {
    description: INSUF_STAT,
    color: '#f96706'	
  }, //< Insufficient statistics.
  90:  {
    description: DID_NOT_RUN,
    color: '#3838fa'	
  },  //< Algorithm did not run.
  100:  {
    description: STATUS_OK,
    color: theme.colors.notification.success	
  }, //< Test was successful.
  200: {
    description: WARNING,
    color: theme.colors.notification.warning	
  }, //< Test had some problems.
  300:{
    description: ERROR,
    color: theme.colors.notification.error	
  }, //< Test has failed.
}
