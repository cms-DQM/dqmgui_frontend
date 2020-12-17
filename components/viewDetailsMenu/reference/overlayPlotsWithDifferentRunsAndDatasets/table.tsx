import { Button, Input, Space } from 'antd';
import * as React from 'react'
import { TripleProps } from '../../../../containers/display/interfaces';
import { StyledSelectedPlotsTable } from '../overlayRunsWithDifferentPlotNames/overlayWithAnotherPlot/styledComponents';

interface TableProps {
  selectedRuns: TripleProps[]
  setSelectedRuns(triples: TripleProps[]): void;
}
export const Table = ({ selectedRuns, setSelectedRuns }: TableProps) => {

  const removeTriple = (triple: TripleProps) => {
    const copy = [...selectedRuns]
    const index = selectedRuns.findIndex((one_triple: TripleProps) =>
      one_triple.run_number === triple.run_number &&
      one_triple.dataset_name === triple.dataset_name)
    copy.splice(index, 1)
    setSelectedRuns(copy)
  }

  const setLabel = (triple: TripleProps, label: string) => {
    const copy = [...selectedRuns]
    const index = selectedRuns.findIndex((one_triple: TripleProps) =>
      one_triple.run_number === triple.run_number &&
      one_triple.dataset_name === triple.dataset_name)
    copy[index].label = label
    setSelectedRuns(copy)
  }

  const columns = [
    {
      title: 'Run number',
      dataIndex: 'run_number',
      key: 'run_number',
    },
    {
      title: 'Dataset',
      dataIndex: 'dataset_name',
      key: 'dataset_name',
    },
    {
      title: 'Label',
      render: (triple: TripleProps) => {
        const set_label = ({ target: { value } }: any) => {
          setLabel(triple, value)
        }
        return <Input 
          name={(triple.run_number + triple.dataset_name)}
          placeholder="label"
          value={triple.label}
          onChange={set_label}
        />
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (triple: TripleProps) => {
        return (
          <Space size="small">
            <Button
              type='link'
              onClick={() => {
                removeTriple(triple)
              }}
            >Delete</Button>
          </Space>
        )
      },
    }
  ];

  const dataSource = selectedRuns.map((triple) => {
    return {
      run_number: triple.run_number,
      dataset_name: triple.dataset_name,
      label: triple.label
    }
  })
  return (selectedRuns.length > 0 ?
    <StyledSelectedPlotsTable
      pagination={
        {
          defaultPageSize: 1,
          pageSizeOptions: ['1', '2', '3', '4', '5'],
          showSizeChanger: true,
        }}
      columns={columns} dataSource={dataSource} />
    : <></>
  )
}