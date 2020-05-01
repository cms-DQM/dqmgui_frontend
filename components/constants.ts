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
    value: 'datasetSelect'
  },
  {
    label: 'Dataset Builder',
    value: 'datasetBuilder'
  }
]
