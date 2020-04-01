
import { useState, ChangeEvent, FormEvent, Dispatch, SetStateAction } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { field_name } from './constants'
import { TripleProps } from '../containers/display/interfaces';
import { setPlotToOverlay } from '../reducers/displayFolderOrPlot';

interface ReferenceProps {
  dispatch: any
}

export const Reference = ({
  dispatch,
}: ReferenceProps) => {

  const id = uuidv4()
  const [triples, change_triples_values] = useState<TripleProps[]>(
    [{ id: id, dataset_name: '', run_number: NaN, label: '' }])

  const change_value = (value: string, key: string, id: string | number | boolean) => {
    const copy = [...triples]
    const current_line: TripleProps = copy.filter((line: TripleProps) => line.id === id)[0]
    const index_of_line: number = copy.indexOf(current_line)
    current_line[key] = value
    copy[index_of_line] = current_line
    change_triples_values(copy)
  };

  const addRun = () => {
    const copy: TripleProps[] = [...triples]
    const id = uuidv4()
    const newRun = { id: id, dataset_name: '', run_number: NaN, label: '' }
    copy.push(newRun)
    change_triples_values(copy)
  }

  const removeRun = (id: string | number | boolean) => {
    const copy: TripleProps[] = [...triples]
    const removed = copy.filter((run: TripleProps) => run.id !== id)
    change_triples_values(removed)
  }

  const filter_valid_runs = (triples: TripleProps[]) => triples.filter((triple: TripleProps) => {
    if (triple.run_number) {
      return triple
    }
  })

  return (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const filtered: TripleProps[] = (filter_valid_runs(triples))
      setPlotToOverlay(filtered)(dispatch)
    }}>
      {
        triples.map((triple: TripleProps) =>
          <div style={{ display: 'flex' }} id={(triple.id).toString()}>
            {Object.keys(triple).map((field: string) => {
              if (field !== 'id') {
                return (
                  <p>
                    <label htmlFor={field}>{field_name[field]}</label>
                    <input
                      key={field}
                      type='text'
                      name={field}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        change_value(e.target.value, field, triple.id)
                      } />
                  </p>
                )
              }
            }
            )}
            <button onClick={() => {
              if (triples.length > 1) {
                removeRun(triple.id)
              }
            }}>Remove</button>
          </div>
        )
      }
      <button onClick={() => {
        if (triples.length < 4) {
          addRun()
        }
      }}>Add</button>
      <button type="submit">Submit</button>
    </form>
  )
}