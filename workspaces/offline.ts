export const summariesWorkspace = {
    Summary:{
      label: 'Summary',
      foldersPathPath: []
    },
    Reports:{
      label: 'Reports',
      foldersPath: []
    },
    Shift: {
      label: 'Shift',
      foldersPath: ['00 Shift']
    },
    Info:{
      label: 'Info',
      foldersPath: ['Info']
    },
    Certification:{
      label: 'Certification',
      foldersPath: []
    },
    Everything: {
      label: 'Everything',
      foldersPath: [
        'Info',
        '00 Shift',
        'AlcaBeamMonitor',
        'AlCaReco',
        'Btag',
        'CSC',
        'CTPPS',
        'Castor',
        'Collisions',
        'DT',
        'Ecal',
        'EcalBarrel',
        'EcalEndcap',
        'EcalPreshower',
        'Egamma',
        'HLT',
        'Hcal',
        'Hcal2',
        'HcalCalib',
        'JetMet',
        'L1T',
        'L1TEMU',
        'Muons',
        'OfflinePV',
        'Pixel',
        'PixelPhase1',
        'RPC',
        'RecoTauV',
        'SiStrip',
        'Tau',
        'Tracking'
      ]
    },
  }
  
  const triggerWorkspace = {
    L1T: {
      label: 'L1T',
      foldersPath: ['L1T']
    },
    L1TEMU: {
      label: 'L1TEMU',
      foldersPath: ['L1TEMU']
    },
    HLT: {
      label: 'HLT',
      foldersPath: ['HLT']
    },
  }
  
  const trackerWorkspace = {
    PixelPhase1: {
      label: 'PixelPhase1',
      foldersPath: ['PixelPhase1'],
    },
    Pixel: {
      label: 'Pixel',
      foldersPath: ['Pixel'],
    },
    SiStrip: {
      label: 'SiStrip',
      foldersPath: ['SiStrip']
    }
  }
  
  const calorimetersWorkspace = {
    Ecal: {
      label: 'Ecal',
      foldersPath: ['Ecal', 'EcalBarrel', 'EcalEndcap']
    },
    EcalPreshower: {
      label: 'EcalPreshower',
      foldersPath: ['EcalPreshower']
    },
    HCAL: {
      label: 'HCAL',
      foldersPath: ['Hcal', 'Hcal2']
    },
    HCALcalib: {
      label: 'HCALcalib',
      foldersPath: ['HcalCalib']
    },
    Castor: {
      label: 'Castor',
      foldersPath: ['Castor']
    },
  }
  
  const mounsWorkspace = {
    CSC: {
      label: 'CSC',
      foldersPath: ['CSC']
    },
    DT: {
      label: 'DT',
      foldersPath: ['DT']
    },
    RPC: {
      label: 'RPC',
      foldersPath: ['RPC']
    },
  }
  
  const cttpsWorspace = {
    TrackingStrip: {
      label: 'TrackingStrip',
      foldersPath: ['CTPPS/TrackingStrip', 'CTPPS/common'],
    },
    TrackingPixel: {
      label: 'TrackingPixel',
      foldersPath: ['CTPPS/TrackingPixel', 'CTPPS/common']
    },
    TimingDiamond: {
      label: 'TimingDiamond',
      foldersPath: ['CTPPS/TimingDiamond', 'CTPPS/common']
    },
    TimingFastSilicon: {
      label: 'TimingFastSilicon',
      foldersPath: ['CTPPS/TimingFastSilicon', 'CTPPS/common']
    },
  }
  
  const pogWorkspace = {
    Muons: {
      label: 'Muons',
      foldersPath: ['Muons']
    },
    JetMet: {
      label: 'JetMet',
      foldersPath: ['JetMet']
    },
    EGamma: {
      label: 'EGamma',
      foldersPath: ['Egamma']
    },
    Btag: {
      label: 'Btag',
      foldersPath: ['Btag']
    },
    Tracking: {
      label: 'Tracking',
      foldersPath: ['Tracking', 'AlcaBeamMonitor', 'OfflinePV']
    },
    Tau: {
      label: 'Tau',
      foldersPath: ['RecoTauV']
    }
  }
  
  export const worspaces = [
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