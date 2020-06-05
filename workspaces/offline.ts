export interface WorskapacesProps{
  label: string;
  workspaces: any;
}

export const summariesWorkspace = [
  // {
  //   label: 'Summary',
  //   foldersPath: []
  // },
  // {
  //   label: 'Reports',
  //   foldersPath: []
  // },
  {
    label: 'Shift',
    foldersPath: ['00 Shift']
  },
  {
    label: 'Info',
    foldersPath: ['Info']
  },
  // {
  //   label: 'Certification',
  //   foldersPath: []
  // },
  {
    label: 'Everything',
    foldersPath: [ ]
  },
]

const triggerWorkspace = [
  {
    label: 'L1T',
    foldersPath: ['L1T']
  },
  {
    label: 'L1TEMU',
    foldersPath: ['L1TEMU']
  },
  {
    label: 'HLT',
    foldersPath: ['HLT']
  },
]

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
    foldersPath: ['SiStrip']
  },
]

const calorimetersWorkspace = [
  {
    label: 'Ecal',
    foldersPath: ['Ecal', 'EcalBarrel', 'EcalEndcap']
  },
  {
    label: 'EcalPreshower',
    foldersPath: ['EcalPreshower']
  },
  {
    label: 'HCAL',
    foldersPath: ['Hcal', 'Hcal2']
  },
  {
    label: 'HCALcalib',
    foldersPath: ['HcalCalib']
  },
  {
    label: 'Castor',
    foldersPath: ['Castor']
  },
]

const mounsWorkspace = [
  {
    label: 'CSC',
    foldersPath: ['CSC']
  },
  {
    label: 'DT',
    foldersPath: ['DT']
  },
  {
    label: 'RPC',
    foldersPath: ['RPC']
  },
]

const cttpsWorspace = [
  {
    label: 'TrackingStrip',
    foldersPath: ['CTPPS/TrackingStrip', 'CTPPS/common'],
  },
  {
    label: 'TrackingPixel',
    foldersPath: ['CTPPS/TrackingPixel', 'CTPPS/common']
  },
  {
    label: 'TimingDiamond',
    foldersPath: ['CTPPS/TimingDiamond', 'CTPPS/common']
  },
  {
    label: 'TimingFastSilicon',
    foldersPath: ['CTPPS/TimingFastSilicon', 'CTPPS/common']
  },
]

const pogWorkspace = [
  {
    label: 'Muons',
    foldersPath: ['Muons']
  },
  {
    label: 'JetMet',
    foldersPath: ['JetMet']
  },
  {
    label: 'EGamma',
    foldersPath: ['Egamma']
  },
  {
    label: 'Btag',
    foldersPath: ['Btag']
  },
  {
    label: 'Tracking',
    foldersPath: ['Tracking', 'AlcaBeamMonitor', 'OfflinePV']
  },
  {
    label: 'Tau',
    foldersPath: ['RecoTauV']
  }
]

export const workspaces = [
  {
    label: 'Summaries',
    workspaces: summariesWorkspace
  },
  {
    label: 'Trigger',
    workspaces: triggerWorkspace
  },
  {
    label: 'Tracker',
    workspaces: trackerWorkspace
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
    workspaces: cttpsWorspace
  },
  {
    label: 'POG',
    workspaces: pogWorkspace
  },
]