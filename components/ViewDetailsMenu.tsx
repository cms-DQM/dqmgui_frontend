
import { useState, ChangeEvent, FormEvent } from 'react'

import { field_name } from './constants'

export interface TrinomialProps {
  [key: string]: string | number,
}

interface ViewDetailsMenuProps {
  set_plot_to_overlay: any
}

export const ViewDetailsMenu = ({ set_plot_to_overlay }: ViewDetailsMenuProps) => {

  const [trinomials, change_trinomial_values] = useState<TrinomialProps[]>(
    [{ id: 1, dataset_name: '', run_number: NaN, label: '' },
    { id: 2, dataset_name: '', run_number: NaN, label: '' },
    { id: 3, dataset_name: '', run_number: NaN, label: '' },
    { id: 4, dataset_name: '', run_number: NaN, label: '' }])


  const change_value = (value: string, key: string, id: string | number) => {
    const copy = [...trinomials]
    const current_line: TrinomialProps = copy.filter((line: TrinomialProps) => line.id === id)[0]
    const index_of_line: number = copy.indexOf(current_line)
    current_line[key] = value
    copy[index_of_line] = current_line
    change_trinomial_values(copy)
  };

  const filter_valid_runs = (trinomials: TrinomialProps[]) => trinomials.filter((trinomial: TrinomialProps) => {
    if (trinomial.run_number) {
      return trinomial
    }
  })

  return (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const filtered = (filter_valid_runs(trinomials))
      set_plot_to_overlay(filtered)
    }}>
      {
        trinomials.map((line: TrinomialProps) =>
          <div id={(line.id).toString()}>
            {Object.keys(line).map((field: string) => {
              if (field !== 'id') {
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