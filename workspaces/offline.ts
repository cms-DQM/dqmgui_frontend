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
    foldersPath: null,
    quickCollections: [
      '1 - High Voltage (HV) per LumiSection',
      '2 - Processed LumiSections',
      '3 - Run is completely processed',
      '4 - Version of CMSSW used',
      '5 - Global Tag used for filling',
      '6 - Global Tag used for harvesting',
    ],
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
      '000 - PixelPhase1 ReportSummary: Layer or Disk vs subdet',
      '00a - PixelPhase1 FED Occupancy vs Lumi Block',
      '00b - PixelPhase1_Error_Summary',
      '01a - PixelPhase1_Event_Rate',
      '01b - PixelPhase1 DeadROC Summary',
      '01c - PixelPhase1 Cluster Size vs Cluster Eta',
      '02 - PixelPhase1_Digi_ADC_Barrel',
      '03 - PixelPhase1_Digi_ADC_Endcap',
      '04 - PixelPhase1_Cluster_Number',
      '21 - PixelPhase1 Digis: Ladder vs Module barrel summary',
      '22 - PixelPhase1 Clusters: Ladder vs Module barrel summary',
      '28 - PixelPhase1 Digis: BladePanel vs Disk endcap summary',
      '29 - PixelPhase1 Clusters: BladePanel vs Disk endcap summary',
      '31 - ntracks',
      '32 - Charge and size',
      '33a - Cluster on track charge per Inner Ladders',
      '33b - Cluster on track charge per Outer Ladders',
      '33c - Cluster charge (on-track) per Disk',
      '34 -  Ontrack PXLayer',
      '35 - Ontrack Disk',
      '38 - PixelPhase1 Residuals',
      '39a - ClusterSize Vs Eta (OnTrack) inner',
      '39b - ClusterSize Vs Eta (OnTrack) outer',
      '40a - Cluster size (on-track) per Ladders',
      '40b - Cluster size (on-track) per Disk',
      '41a - Dead Channels per ROC per Barrel Layer',
      '41b - Dead Channels per ROC per Forward Ring',],
  },
  {
    label: 'Pixel',
    foldersPath: ['Pixel'],
    quickCollections: [
      '00b - Pixel_Error_Summary',
      '01 - Pixel_FEDOccupancy_Summary',
      '02 - Pixel_Cluster_Summary',
      '03 - Pixel_Track_Summary',
      '05 - Barrel OnTrack cluster positions',
      '06 - Endcap OnTrack cluster positions',
      '07 - Pixel_Digi_Summary',
      '08 - ROC occupancies',
      '09 - Pixel Clusters vs LS',
    ],
  },
  {
    label: 'SiStrip',
    foldersPath: ['SiStrip'],
    quickCollections: [
      '00 - SiStrip ReportSummary',
      '01 - FED-Detected Errors Summary',
      '03 - # of Cluster Trend',
      '04 - OnTrackCluster (StoN)',
      '05 - OffTrackCluster (Total Number)',
      '06a - FED Errors vs FED ID',
      '29 - Cluster & Digi occupancy per FED',
    ],
  },
  {
    label: 'Alignment',
    foldersPath: null,
    quickCollections: [
      '00 - Vertex and vertex tracks quality',
      '01 - Impact parameters and errors',
      '02 - Impact parameters projections (pT>1 GeV)',
      '03 - Impact parameters projections (pT>10 GeV)',
      '38 - PixelPhase1 Residuals',
      '38aa - Residuals x per Layer',
      '38ab - Residuals y per Layer',
      '38ba - Profile Residuals x PXBarrel',
      '38bb - Profile Residuals y PXBarrel',
      '38ca - Mean Residuals x inner Modules per Layer',
      '38cb - Mean Residuals x outer Modules per Layer',
      '38cc - Mean Residuals y inner Modules per Layer',
      '38cd - Mean Residuals y outer Modules per Layer',
      '38da - Residuals x per Disk',
      '38db - Residuals y per Disk',
      '38e - Profile Residuals PXFoward',
      '38fa - Mean Residuals InnerOuter Modules PXForward',
      '38fb - Mean Residuals pos.neg. Side PXForward',
      '21 - TIB Residuals',
      '22 - TOB Residuals',
      '23 - TID+ Residuals',
      '24 - TID- Residuals',
      '25 - TEC+ Residual',
      '26 - TEC- Residual',
    ],
  }
];

const calorimetersWorkspace: WorkspaceProps[] = [
  {
    label: 'Ecal',
    foldersPath: ['Ecal', 'EcalBarrel', 'EcalEndcap'],
    quickCollections: [
      '00 Summary',
      '01 Occupancy Summary',
    ],
  },
  {
    label: 'EcalPreshower',
    foldersPath: ['EcalPreshower'],
    quickCollections: [
      '01-IntegritySummary-EcalPreshower',
      '02-GoodRechitOccupancySummary-EcalPreshower',
      '03-GoodRechitEnergySummary-EcalPreshower',
      '04-ESTimingTaskSummary-EcalPreshower',
      '05-ESGain-EcalPreshower',
    ],
  },
  {
    label: 'HCAL',
    foldersPath: ['Hcal', 'Hcal2'],
    quickCollections: [
      '00 Current Summary',
      '01 RAW Bad Quality',
      '02 RAW Bad Quality depth',
      '03 RAW Mismatches',
      '04 DIGI Missing 1LS',
      '05 DIGI Occupancy',
      '06 DIGI Occupancy Total',
      '07 DIGI Occupancy Cut',
      '08 DIGI Timing',
      '09 DIGI Total Charge',
      '10 DIGI Occupancy vs LS',
      '11 DIGI Amplitude vs LS',
      '12 RECO Energy',
      '13 RECO Occupancy',
      '14 RECO Occupancy Cut',
      '15 RECO Timing',
      '16 RECO HBHEabc Timing',
      '17 RECO Timing vs Energy',
      '18 TP Et Correlation',
      '19 TP Et Correlation Ratio',
      '20 TP Et Distribution',
      '21 TP Et Mismatches',
      '22 TP Et Missing',
      '23 TP Et Occupancy'],
  },
  {
    label: 'HCALcalib',
    foldersPath: ['HcalCalib'],
    quickCollections: [
      '00 Current Summary',
      '01 Pedestal Mean',
      '02 Pedestal Mean by FED',
      '03 Pedestal RMS',
      '04 Pedestal RMS by FED',
      '05 Pedestal Mean DB Ref',
      '06 Pedestal Mean DB Ref by FED',
      '07 Pedestal RMS DB Ref',
      '08 Pedestal RMS DB Ref by FED',
      '09 Pedestal Mean Bad',
      '10 Pedestal Mean Bad by FED',
      '11 Pedestal RMS Bad',
      '12 Pedestal RMS Bad by FED',
      '13 Pedestal Missing',
      '14 Pedestal Missing by FED',
      '15 Pedestal Occupancy vs LS',
      '16 Missing vs LS',
      '17 Number of Bad Mean vs LS',
      '18 Number of Bad RMS vs LS'
    ],
  },
  {
    label: 'Castor',
    foldersPath: ['Castor'],
    quickCollections: [
      '01 - Map of frontend and readout errors',
      '02 - Channel-wise timing',
      '02b - Channel-wise timing (rms)',
      'Digi/05 - DigiSize'
    ],
  },
];

const mounsWorkspace: WorkspaceProps[] = [
  {
    label: 'CSC',
    foldersPath: ['CSC'],
    quickCollections: [
      '00 Data Integrity/Physics Efficiency 01',
      '00 Data Integrity/Physics Efficiency 02',
      '00 Data Integrity/Physics Efficiency 04 - CSCs Reporting Data and Unpacked',
      '00 Data Integrity/Physics Efficiency 08 - CSCs Occupancy Overal',
      '00 Data Integrity/Physics Efficiency 07 - CSCs Occupancy 2D',
      '00 Data Integrity/Physics Efficiency 09 - RecHits Minus',
      '00 Data Integrity/Physics Efficiency 10 - RecHits Plus',
      '00 Data Integrity/Physics Efficiency 11 - Segments',
      '00 Data Integrity/Physics Efficiency 12 - Timing'
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
      "01 - Efficiency per Eta Partition",
      "02 - Efficiency vs Muon PT",
      "03 - Efficiency vs Muon Eta",
      "04 - Resolution Summary",
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
      '00 - Jet Property',
      '01 - Tracks in Jet',
      '02 - Vertex Property',
      '03 - Flight Distance Summary',
      '04 - Discriminator Summary',
      '05 - 2D-Impact Parameter',
      '06 - 3D-Impact Parameter',
      '07 - ROC Curves'],
  },
  {
    label: 'Tracking',
    foldersPath: ['Tracking', 'AlcaBeamMonitor', 'OfflinePV'],
    quickCollections: [
      '01 - Tracking ReportSummary',
      '02a - Tracks (pp collisions)',
      '02b - Total Hits Strip and Pixel (pp collisions)',
      '03 - Tracks (Cosmic Tracking)',
      '05 - Number of Seeds (pp collisions)',
      '06 - Tracks resolution',
      '06a - Tracks quality',
      '07 - Vertex reconstruction',
      '08 - Tracking Efficiency',
    ],
  },
  {
    label: 'Tau',
    foldersPath: ['RecoTauV'],
    quickCollections: [
      '00aa - Fake rate from muons vs pt',
      '00ab - Fake rate from muons vs pt',
      '01a - Muon rejection fake rate vs pt',
      '00aa - Fake rate from jets vs pt',
      '00ab - Fake rate from jets vs pt',
      '00aa - Fake rate from electrons vs pt',
      '00ab - Fake rate from electrons vs pt',
      '01a - Electron rejection fake rate vs pt',
      '00ba - Fake rate from muons vs pileup',
      '00bb - Fake rate from muons vs pileup',
      '00ba - Fake rate from jets vs pileup',
      '00bb - Fake rate from jets vs pileup',
      '01e - Distributions of size and sumPt for isolation PF Cands, QCD Jets faking taus',
      '01f - Distributions of Raw Quantities of Tau Cands, QCD Jets faking taus',
      '01g - Distributions of Tau Cands Multiplicity, QCD Jets faking taus',
      '01h - Distributions of Tau Cands pTRatio, QCD Jets faking taus',
      '00ba - Fake rate from electrons vs pileup',
      '00bb - Fake rate from electrons vs pileup',
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
