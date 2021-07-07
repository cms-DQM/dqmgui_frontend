import * as React from 'react';
import { Typography } from 'antd';
import { Plot } from '../plot';
import { Progress } from 'antd';

import { getReportInfo } from './getReportInfo';
import { store } from '../../../../../contexts/leftSideContext';
import { form_header } from './form_header';
import { QueryProps } from '../../../../../containers/display/interfaces';
import { ParentWrapper, LayoutName, LayoutWrapper } from '../styledComponents'
import { Report_summary_button } from './styledComponents'

const { Text } = Typography;

interface SummaryPlotProps {
  plot: any
  selected_plots: any
  query: QueryProps;
  subsystem: string;
  lumi: string;
  run_number: string;
  dataset_name: string;
  toggle_modal(open: boolean): void;
  set_report_info(info: any): void;
  open: boolean;
  modal_id: string;
  set_modal_id(modal_id: string): void;
}

export const SummaryPlot = ({ subsystem, dataset_name, run_number, lumi, plot, query, selected_plots, set_report_info, toggle_modal, open, modal_id, set_modal_id }: SummaryPlotProps) => {
  const [header, setHeader] = React.useState<any>({})

  const imageRef = React.useRef(null);
  const plots_names = ['reportSummary', 'processTimeStamp']

  React.useEffect(() => {
    getReportInfo({ run_number, dataset_name, lumi, subsystem, plots_names })
      .then(response => {
        const formed = form_header({ header_data: response, subsystem })
        setHeader(formed)
      })
  }, [])


  const { size } = React.useContext(store)
  const strokeColor = { '0%': 'red', '100%': 'red' }
  return (
    <ParentWrapper
      size={{ w: size.w + 10, h: size.h + 60 }} //+ 40 to fit a button
      plotsAmount={1}>
      <LayoutName style={{display: 'block'}} >
        <div>
         <Text strong>{header.subsystem}</Text>  <Text>{header.processTimeStamp}</Text>
        </div>
          <Progress
           percent={parseFloat(header.reportSummary)}
            strokeColor={header.reportSummary < 95 && strokeColor}
          />
      </LayoutName>
      <LayoutWrapper
        auto={'1'}>
        <Plot
          query={query}
          plot={plot}
          onePlotHeight={size.h}
          onePlotWidth={size.w}
          selected_plots={selected_plots}
          imageRef={imageRef} />
      </LayoutWrapper >
      <Report_summary_button onClick={() => {
        set_modal_id(subsystem)
        toggle_modal(!open)
      }}>REPORT</Report_summary_button>

    </ParentWrapper >

  )
}