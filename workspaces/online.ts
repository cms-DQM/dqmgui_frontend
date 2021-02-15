export interface WorskapacesProps {
  label: string;
  workspaces: any;
}

export const summariesWorkspace = [
  {
    label: 'Summary',
    foldersPath: ['Summary'],
  },
  {
    label: 'Shift',
    foldersPath: ['00 Shift'],
  },
  {
    label: 'Info',
    foldersPath: ['Info'],
  },
  {
    label: 'Everything',
    foldersPath: [],
  },
];

const triggerWorkspace = [
  {
    label: 'L1T',
    foldersPath: ['L1T'],
  },
  {
    label: 'L1T2016EMU',
    foldersPath: ['L1T2016EMU'],
  },
  {
    label: 'L1T2016',
    foldersPath: ['L1T2016'],
  },
  {
    label: 'L1TEMU',
    foldersPath: ['L1TEMU'],
  },
  {
    label: 'HLT',
    foldersPath: ['HLT'],
  },
];

const trackerWorkspace = [
  {
    label: 'PixelPhase1',
    foldersPath: ['PixelPhase1'],
  },
  {
    label: 'Pixel',
    foldersPath: ['Pixel'],
  },
  {
    label: 'SiStrip',
    foldersPath: ['SiStrip', 'Tracking'],
  },
];

const calorimetersWorkspace = [
  {
    label: 'Ecal',
    foldersPath: ['Ecal', 'EcalBarrel', 'EcalEndcap', 'EcalCalibration'],
  },
  {
    label: 'EcalPreshower',
    foldersPath: ['EcalPreshower'],
  },
  {
    label: 'HCAL',
    foldersPath: ['Hcal', 'Hcal2'],
  },
  {
    label: 'HCALcalib',
    foldersPath: ['HcalCalib'],
  },
  {
    label: 'Castor',
    foldersPath: ['Castor'],
  },
];

const mounsWorkspace = [
  {
    label: 'CSC',
    foldersPath: ['CSC'],
  },
  {
    label: 'DT',
    foldersPath: ['DT'],
  },
  {
    label: 'RPC',
    foldersPath: ['RPC'],
  },
];

const cttpsWorspace = [
  {
    label: 'TrackingStrip',
    foldersPath: [
      'CTPPS/TrackingStrip',
      'CTPPS/common',
      'CTPPS/TrackingStrip/Layouts',
    ],
  },
  {
    label: 'TrackingPixel',
    foldersPath: [
      'CTPPS/TrackingPixel',
      'CTPPS/common',
      'CTPPS/TrackingPixel/Layouts',
    ],
  },
  {
    label: 'TimingDiamond',
    foldersPath: [
      'CTPPS/TimingDiamond',
      'CTPPS/common',
      'CTPPS/TimingDiamond/Layouts',
    ],
  },
  {
    label: 'TimingFastSilicon',
    foldersPath: [
      'CTPPS/TimingFastSilicon',
      'CTPPS/common',
      'CTPPS/TimingFastSilicon/Layouts',
    ],
  },
];

export const workspaces = [
  {
    label: 'Summaries',
    workspaces: summariesWorkspace,
  },
  {
    label: 'Trigger',
    workspaces: triggerWorkspace,
  },
  {
    label: 'Tracker',
    workspaces: trackerWorkspace,
  },
  {
    label: 'Calorimeters',
    workspaces: calorimetersWorkspace,
  },
  {
    label: 'Muons',
    workspaces: mounsWorkspace,
  },
  {
    label: 'CTPPS',
    workspaces: cttpsWorspace,
  },
];
