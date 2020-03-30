
import { useState, ChangeEvent, FormEvent } from 'react'

import { field_name } from '../components/constants'

export interface LineProps {
  [key: string]: string | number,
}

interface ViewDetailsMenuProps {
  set_plot_to_overlay: any
}

export const View_details_menu = ({ set_plot_to_overlay }: ViewDetailsMenuProps) => {

  const [lines, change_lines_values] = useState<LineProps[]>([{ id: 1, dataset_name: '', run_number: NaN, label: '' },
  { id: 2, dataset_name: '', run_number: NaN, label: '' },
  { id: 3, dataset_name: '', run_number: NaN, label: '' },
  { id: 4, dataset_name: '', run_number: NaN, label: '' }])


  const change_value = (value: string, key: string, id: string | number) => {
    const current_line: LineProps = lines.filter((line: LineProps) => line.id === id)[0]
    const index_of_line: number = lines.indexOf(current_line)
    current_line[key] = value
    lines[index_of_line] = current_line
    change_lines_values(lines)
  };

  const filter_valid_runs = (lines: LineProps[]) => lines.filter((line: LineProps) => {
    if (line.run_number) {
      return line
    }
  })

  return (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const filtered = (filter_valid_runs(lines))
      set_plot_to_overlay(filtered)
    }}>
      {
        lines.map((line: LineProps) =>
          <div id={(line.id).toString()}>
            {Object.keys(line).map((field: string) => {
              if (field != 'id') {
                return (
                  <p>
                    <label htmlFor={field}>{field_name[field]}</label>
                    <input
                      key={field}
                      type='text'
                      name={field}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        change_value(e.target.value, field, line.id)
                      } />
                  </p>
                )
              }
            }
            )}
          </div>
        )
      }
      <button type="submit">Submit</button>
    </form>
  )
}