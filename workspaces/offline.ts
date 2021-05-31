export interface WorskapacesProps {
  label: string;
  workspaces: any;
}

export interface WorkspaceProps {
  label: string;
  foldersPath: string[];
  quickCollections: string[];
}

export const summariesWorkspace: WorkspaceProps[] = [
  {
    label: 'Summary',
    foldersPath: ['Summary'],
    quickCollections: [],
  },
  {
    label: 'Shift',
    foldersPath: ['00 Shift'],
    quickCollections: [],
  },
  {
    label: 'Info',
    foldersPath: ['Info'],
    quickCollections: [],
  },
  {
    label: 'Everything',
    foldersPath: [],
    quickCollections: [],
  },
];

const triggerWorkspace: WorkspaceProps[] = [
  {
    label: 'L1T',
    foldersPath: ['L1T'],
    quickCollections: [],
  },
  {
    label: 'L1TEMU',
    foldersPath: ['L1TEMU'],
    quickCollections: [],
  },
  {
    label: 'HLT',
    foldersPath: ['HLT'],
    quickCollections: [],
  },
];

const trackerWorkspace: WorkspaceProps[] = [
  {
    label: 'PixelPhase1',
    foldersPath: ['PixelPhase1'],
    quickCollections: [
      'PixelPhase1/Layouts/000 - PixelPhase1 ReportSummary: Layer or Disk vs subdet',
      'PixelPhase1/Layouts/00a - PixelPhase1 FED Occupancy vs Lumi Block',
      'PixelPhase1/Layouts/00b - PixelPhase1_Error_Summary',
      'PixelPhase1/Layouts/01a - PixelPhase1_Event_Rate',
      'PixelPhase1/Layouts/01b - PixelPhase1 DeadROC Summary',
      'PixelPhase1/Layouts/01c - PixelPhase1 Cluster Size vs Cluster Eta',
      'PixelPhase1/Layouts/02 - PixelPhase1_Digi_ADC_Barrel',
      'PixelPhase1/Layouts/03 - PixelPhase1_Digi_ADC_Endcap',
      'PixelPhase1/Layouts/04 - PixelPhase1_Cluster_Number',
      'PixelPhase1/Layouts/21 - PixelPhase1 Digis: Ladder vs Module barrel summary',
      'PixelPhase1/Layouts/22 - PixelPhase1 Clusters: Ladder vs Module barrel summary',
      'PixelPhase1/Layouts/28 - PixelPhase1 Digis: BladePanel vs Disk endcap summary',
      'PixelPhase1/Layouts/29 - PixelPhase1 Clusters: BladePanel vs Disk endcap summary',
      'PixelPhase1/Layouts/31 - ntracks',
      'PixelPhase1/Layouts/32 - Charge and size',
      'PixelPhase1/Layouts/33a - Cluster on track charge per Inner Ladders',
      'PixelPhase1/Layouts/33b - Cluster on track charge per Outer Ladders',
      'PixelPhase1/Layouts/33c - Cluster charge (on-track) per Disk',
      'PixelPhase1/Layouts/34 -  Ontrack PXLayer',
      'PixelPhase1/Layouts/35 - Ontrack Disk',
      'PixelPhase1/Layouts/38 - PixelPhase1 Residuals',
      'PixelPhase1/Layouts/39a - ClusterSize Vs Eta (OnTrack) inner',
      'PixelPhase1/Layouts/39b - ClusterSize Vs Eta (OnTrack) outer',
      'PixelPhase1/Layouts/40a - Cluster size (on-track) per Ladders',
      'PixelPhase1/Layouts/40b - Cluster size (on-track) per Disk',
      'PixelPhase1/Layouts/41a - Dead Channels per ROC per Barrel Layer',
      'PixelPhase1/Layouts/41b - Dead Channels per ROC per Forward Ring',],
  },
  {
    label: 'Pixel',
    foldersPath: ['Pixel'],
    quickCollections: [
      'Pixel/Layouts/00b - Pixel_Error_Summary',
      'Pixel/Layouts/01 - Pixel_FEDOccupancy_Summary',
      'Pixel/Layouts/02 - Pixel_Cluster_Summary',
      'Pixel/Layouts/03 - Pixel_Track_Summary',
      'Pixel/Layouts/05 - Barrel OnTrack cluster positions',
      'Pixel/Layouts/06 - Endcap OnTrack cluster positions',
      'Pixel/Layouts/07 - Pixel_Digi_Summary',
      'Pixel/Layouts/08 - ROC occupancies',
      'Pixel/Layouts/09 - Pixel Clusters vs LS',
    ],
  },
  {
    label: 'SiStrip',
    foldersPath: ['SiStrip'],
    quickCollections: [
      'SiStrip/Layouts/00 - SiStrip ReportSummary',
      'SiStrip/Layouts/01 - FED-Detected Errors Summary',
      'SiStrip/Layouts/03 - # of Cluster Trend',
      'SiStrip/Layouts/04 - OnTrackCluster (StoN)',
      'SiStrip/Layouts/05 - OffTrackCluster (Total Number)',
      'SiStrip/Layouts/06a - FED Errors vs FED ID',
      'SiStrip/Layouts/29 - Cluster & Digi occupancy per FED',
    ],
  },
  {
    label: 'Alignment',
    foldersPath: null,
    quickCollections: [
      'OfflinePV/AlignmentValidation/00 - Vertex and vertex tracks quality',
      'OfflinePV/AlignmentValidation/01 - Impact parameters and errors',
      'OfflinePV/AlignmentValidation/02 - Impact parameters projections (pT>1 GeV)',
      'OfflinePV/AlignmentValidation/03 - Impact parameters projections (pT>10 GeV)',
      'PixelPhase1/Layouts/38 - PixelPhase1 Residuals',
      'PixelPhase1/Layouts/38aa - Residuals x per Layer',
      'PixelPhase1/Layouts/38ab - Residuals y per Layer',
      'PixelPhase1/Layouts/38ba - Profile Residuals x PXBarrel',
      'PixelPhase1/Layouts/38bb - Profile Residuals y PXBarrel',
      'PixelPhase1/Layouts/38ca - Mean Residuals x inner Modules per Layer',
      'PixelPhase1/Layouts/38cb - Mean Residuals x outer Modules per Layer',
      'PixelPhase1/Layouts/38cc - Mean Residuals y inner Modules per Layer',
      'PixelPhase1/Layouts/38cd - Mean Residuals y outer Modules per Layer',
      'PixelPhase1/Layouts/38da - Residuals x per Disk',
      'PixelPhase1/Layouts/38db - Residuals y per Disk',
      'PixelPhase1/Layouts/38e - Profile Residuals PXFoward',
      'PixelPhase1/Layouts/38fa - Mean Residuals InnerOuter Modules PXForward',
      'PixelPhase1/Layouts/38fb - Mean Residuals pos.neg. Side PXForward',
      'SiStrip/Layouts/21 - TIB Residuals',
      'SiStrip/Layouts/22 - TOB Residuals',
      'SiStrip/Layouts/23 - TID+ Residuals',
      'SiStrip/Layouts/24 - TID- Residuals',
      'SiStrip/Layouts/25 - TEC+ Residual',
      'SiStrip/Layouts/26 - TEC- Residual',
    ],
  }
];

const calorimetersWorkspace: WorkspaceProps[] = [
  {
    label: 'Ecal',
    foldersPath: ['Ecal', 'EcalBarrel', 'EcalEndcap'],
    quickCollections: [
      'Ecal/Layouts/00 Summary',
      'Ecal/Layouts/01 Occupancy Summary',
    ],
  },
  {
    label: 'EcalPreshower',
    foldersPath: ['EcalPreshower'],
    quickCollections: [
      'EcalPreshower/Layouts/01-IntegritySummary-EcalPreshower',
      'EcalPreshower/Layouts/02-GoodRechitOccupancySummary-EcalPreshower',
      'EcalPreshower/Layouts/03-GoodRechitEnergySummary-EcalPreshower',
      'EcalPreshower/Layouts/04-ESTimingTaskSummary-EcalPreshower',
      'EcalPreshower/Layouts/05-ESGain-EcalPreshower',
    ],
  },
  {
    label: 'HCAL',
    foldersPath: ['Hcal', 'Hcal2'],
    quickCollections: [
      'Hcal/Layouts/00 Current Summary',
      'Hcal/Layouts/01 RAW Bad Quality',
      'Hcal/Layouts/02 RAW Bad Quality depth',
      'Hcal/Layouts/03 RAW Mismatches',
      'Hcal/Layouts/04 DIGI Missing 1LS',
      'Hcal/Layouts/05 DIGI Occupancy',
      'Hcal/Layouts/06 DIGI Occupancy Total',
      'Hcal/Layouts/07 DIGI Occupancy Cut',
      'Hcal/Layouts/08 DIGI Timing',
      'Hcal/Layouts/09 DIGI Total Charge',
      'Hcal/Layouts/10 DIGI Occupancy vs LS',
      'Hcal/Layouts/11 DIGI Amplitude vs LS',
      'Hcal/Layouts/12 RECO Energy',
      'Hcal/Layouts/13 RECO Occupancy',
      'Hcal/Layouts/14 RECO Occupancy Cut',
      'Hcal/Layouts/15 RECO Timing',
      'Hcal/Layouts/16 RECO HBHEabc Timing',
      'Hcal/Layouts/17 RECO Timing vs Energy',
      'Hcal/Layouts/18 TP Et Correlation',
      'Hcal/Layouts/19 TP Et Correlation Ratio',
      'Hcal/Layouts/20 TP Et Distribution',
      'Hcal/Layouts/21 TP Et Mismatches',
      'Hcal/Layouts/22 TP Et Missing',
      'Hcal/Layouts/23 TP Et Occupancy'],
  },
  {
    label: 'HCALcalib',
    foldersPath: ['HcalCalib'],
    quickCollections: [
      'HcalCalib/Layouts/00 Current Summary',
      'HcalCalib/Layouts/01 Pedestal Mean',
      'HcalCalib/Layouts/02 Pedestal Mean by FED',
      'HcalCalib/Layouts/03 Pedestal RMS',
      'HcalCalib/Layouts/04 Pedestal RMS by FED',
      'HcalCalib/Layouts/05 Pedestal Mean DB Ref',
      'HcalCalib/Layouts/06 Pedestal Mean DB Ref by FED',
      'HcalCalib/Layouts/07 Pedestal RMS DB Ref',
      'HcalCalib/Layouts/08 Pedestal RMS DB Ref by FED',
      'HcalCalib/Layouts/09 Pedestal Mean Bad',
      'HcalCalib/Layouts/10 Pedestal Mean Bad by FED',
      'HcalCalib/Layouts/11 Pedestal RMS Bad',
      'HcalCalib/Layouts/12 Pedestal RMS Bad by FED',
      'HcalCalib/Layouts/13 Pedestal Missing',
      'HcalCalib/Layouts/14 Pedestal Missing by FED',
      'HcalCalib/Layouts/15 Pedestal Occupancy vs LS',
      'HcalCalib/Layouts/16 Missing vs LS',
      'HcalCalib/Layouts/17 Number of Bad Mean vs LS',
      'HcalCalib/Layouts/18 Number of Bad RMS vs LS'
    ],
  },
  {
    label: 'Castor',
    foldersPath: ['Castor'],
    quickCollections: [
      'Castor/Layouts/01 - Map of frontend and readout errors',
      'Castor/Layouts/02 - Channel-wise timing',
      'Castor/Layouts/02b - Channel-wise timing (rms)',
      'Castor/Layouts/Digi/05 - DigiSize',
    ],
  },
];

const mounsWorkspace: WorkspaceProps[] = [
  {
    label: 'CSC',
    foldersPath: ['CSC'],
    quickCollections: [
      'CSC/Layouts/00 Data Integrity/Physics Efficiency 01',
      'CSC/Layouts/00 Data Integrity/Physics Efficiency 02',
      'CSC/Layouts/00 Data Integrity/Physics Efficiency 04 - CSCs Reporting Data and Unpacked',
      'CSC/Layouts/00 Data Integrity/Physics Efficiency 08 - CSCs Occupancy Overal',
      'CSC/Layouts/00 Data Integrity/Physics Efficiency 07 - CSCs Occupancy 2D',
      'CSC/Layouts/00 Data Integrity/Physics Efficiency 09 - RecHits Minus',
      'CSC/Layouts/00 Data Integrity/Physics Efficiency 10 - RecHits Plus',
      'CSC/Layouts/00 Data Integrity/Physics Efficiency 11 - Segments',
      'CSC/Layouts/00 Data Integrity/Physics Efficiency 12 - Timing',
    ],
  },
  {
    label: 'DT',
    foldersPath: ['DT'],
    quickCollections: [],
  },
  {
    label: 'RPC',
    foldersPath: ['RPC'],
    quickCollections: [],
  }, {
    label: 'GEM',
    foldersPath: ['GEM'],
    quickCollections: [
      "GEM/Layouts/01 - Efficiency vs Chamber",
      "GEM/Layouts/02 - Efficiency vs Muon PT",
      "GEM/Layouts/03 - Efficiency vs Muon Eta",
      "GEM/Layouts/04 - Resolution Summary",
    ],
  }
];

const cttpsWorspace: WorkspaceProps[] = [
  {
    label: 'TrackingStrip',
    foldersPath: ['CTPPS/TrackingStrip', 'CTPPS/common', 'CTPPS/TrackingStrip/Layouts'],
    quickCollections: [],
  },
  {
    label: 'TrackingPixel',
    foldersPath: ['CTPPS/TrackingPixel', 'CTPPS/common', 'CTPPS/TrackingPixel/Layouts'],
    quickCollections: [],
  },
  {
    label: 'TimingDiamond',
    foldersPath: ['CTPPS/TimingDiamond', 'CTPPS/common', 'CTPPS/TimingDiamond/Layouts'],
    quickCollections: [],
  },
  {
    label: 'TimingFastSilicon',
    foldersPath: ['CTPPS/TimingFastSilicon', 'CTPPS/common', 'CTPPS/TimingFastSilicon/Layouts'],
    quickCollections: [],
  },
];

const pogWorkspace: WorkspaceProps[] = [
  {
    label: 'Muons',
    foldersPath: ['Muons'],
    quickCollections: [],
  },
  {
    label: 'JetMet',
    foldersPath: ['JetMet'],
    quickCollections: [],
  },
  {
    label: 'EGamma',
    foldersPath: ['Egamma'],
    quickCollections: [],
  },
  {
    label: 'Btag',
    foldersPath: ['Btag'],
    quickCollections: [
      'Btag/Layouts/00 - Jet Property',
      'Btag/Layouts/01 - Tracks in Jet',
      'Btag/Layouts/02 - Vertex Property',
      'Btag/Layouts/03 - Flight Distance Summary',
      'Btag/Layouts/04 - Discriminator Summary',
      'Btag/Layouts/05 - 2D-Impact Parameter',
      'Btag/Layouts/06 - 3D-Impact Parameter',
      'Btag/Layouts/07 - ROC Curves',],
  },
  {
    label: 'Tracking',
    foldersPath: ['Tracking', 'AlcaBeamMonitor', 'OfflinePV'],
    quickCollections: [
      'Tracking/Layouts/01 - Tracking ReportSummary',
      'Tracking/Layouts/02a - Tracks (pp collisions)',
      'Tracking/Layouts/02b - Total Hits Strip and Pixel (pp collisions)',
      'Tracking/Layouts/03 - Tracks (Cosmic Tracking)',
      'Tracking/Layouts/05 - Number of Seeds (pp collisions)',
      'Tracking/Layouts/06 - Tracks resolution',
      'Tracking/Layouts/06a - Tracks quality',
      'Tracking/Layouts/07 - Vertex reconstruction',
      'Tracking/Layouts/08 - Tracking Efficiency',
    ],
  },
  {
    label: 'Tau',
    foldersPath: ['RecoTauV'],
    quickCollections: [
      'RecoTauV/Layouts/SingleMu/00aa - Fake rate from muons vs pt',
      'RecoTauV/Layouts/SingleMu/00ab - Fake rate from muons vs pt',
      'RecoTauV/Layouts/SingleMu/01a - Muon rejection fake rate vs pt',
      'RecoTauV/Layouts/Jet/00aa - Fake rate from jets vs pt',
      'RecoTauV/Layouts/Jet/00ab - Fake rate from jets vs pt',
      'RecoTauV/Layouts/DoubleElectron_OR_TauPlusX/00aa - Fake rate from electrons vs pt',
      'RecoTauV/Layouts/DoubleElectron_OR_TauPlusX/00ab - Fake rate from electrons vs pt',
      'RecoTauV/Layouts/DoubleElectron_OR_TauPlusX/01a - Electron rejection fake rate vs pt',
      'RecoTauV/Layouts/SingleMu/00ba - Fake rate from muons vs pileup',
      'RecoTauV/Layouts/SingleMu/00bb - Fake rate from muons vs pileup',
      'RecoTauV/Layouts/Jet/00ba - Fake rate from jets vs pileup',
      'RecoTauV/Layouts/Jet/00bb - Fake rate from jets vs pileup',
      'RecoTauV/Layouts/Jet/01e - Distributions of size and sumPt for isolation PF Cands, QCD Jets faking taus',
      'RecoTauV/Layouts/Jet/01f - Distributions of Raw Quantities of Tau Cands, QCD Jets faking taus',
      'RecoTauV/Layouts/Jet/01g - Distributions of Tau Cands Multiplicity, QCD Jets faking taus',
      'RecoTauV/Layouts/Jet/01h - Distributions of Tau Cands pTRatio, QCD Jets faking taus',
      'RecoTauV/Layouts/DoubleElectron_OR_TauPlusX/00ba - Fake rate from electrons vs pileup',
      'RecoTauV/Layouts/DoubleElectron_OR_TauPlusX/00bb - Fake rate from electrons vs pileup',
    ],
  },
];

export const workspaces: WorskapacesProps[] = [
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
  {
    label: 'POG',
    workspaces: pogWorkspace,
  },
];
