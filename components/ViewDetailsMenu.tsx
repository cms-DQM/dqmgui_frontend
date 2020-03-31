
import { useState, ChangeEvent, FormEvent } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { field_name } from './constants'
import { TrinomialProps } from '../containers/display/interfaces';

interface ViewDetailsMenuProps {
  set_plot_to_overlay: any
}

export const ViewDetailsMenu = ({ set_plot_to_overlay }: ViewDetailsMenuProps) => {
  const id = uuidv4()

  const [trinomials, change_trinomial_values] = useState<TrinomialProps[]>(
    [{ id: id, dataset_name: '', run_number: NaN, label: '' }])


  const change_value = (value: string, key: string, id: string | number) => {
    const copy = [...trinomials]
    const current_line: TrinomialProps = copy.filter((line: TrinomialProps) => line.id === id)[0]
    const index_of_line: number = copy.indexOf(current_line)
    current_line[key] = value
    copy[index_of_line] = current_line
    change_trinomial_values(copy)
  };

  const addRun = () => {
    const copy: TrinomialProps[] = [...trinomials]
    const id = uuidv4()
    const newRun = { id: id, dataset_name: '', run_number: NaN, label: '' }
    copy.push(newRun)
    change_trinomial_values(copy)
  }

  const removeRun = (id: string | number) => {
    const copy: TrinomialProps[] = [...trinomials]
    const removed = copy.filter((run: TrinomialProps) => run.id !== id)
    change_trinomial_values(removed)
  }

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
        trinomials.map((trinomial: TrinomialProps) =>
          <div id={(trinomial.id).toString()}>
            {Object.keys(trinomial).map((field: string) => {
              if (field !== 'id') {
                return (
                  <p>
                    <label htmlFor={field}>{field_name[field]}</label>
                    <input
                      key={field}
                      type='text'
                      name={field}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        change_value(e.target.value, field, trinomial.id)
                      } />
                  </p>
                )
              }
            }
            )}
             <button onClick={() => {
              if (trinomials.length > 1) {
                removeRun(trinomial.id)
              }
            }}>Remove</button>
          </div>
        )
      }
      <button onClick={() => {
        if (trinomials.length < 4) {
          addRun()
        }
      }}>Add</button>
      <button type="submit">Submit</button>
    </form>
  )
}