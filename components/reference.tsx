
import { useState, ChangeEvent, FormEvent, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { field_name } from './constants'
import { TripleProps } from '../containers/display/interfaces';
import { setPlotToOverlay } from '../reducers/displayFolderOrPlot';
import { referenceReducer, initialState, change_value, removeRun, addRun } from '../reducers/reference'

interface ReferenceProps {
  dispatch_gloabl: any
}

export const Reference = ({
  dispatch_gloabl,
}: ReferenceProps) => {

  const [state, dispatch] = useReducer(referenceReducer, initialState);
  const { triples } = state

  const filter_valid_runs = (triples: TripleProps[]) => triples.filter((triple: TripleProps) => {
    if (triple.run_number) {
      return triple
    }
  })

  return (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const filtered: TripleProps[] = (filter_valid_runs(triples))
      setPlotToOverlay(filtered)(dispatch_gloabl)
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
                        change_value(e.target.value, field, triple.id)(state, dispatch)
                      } />
                  </p>
                )
              }
            }
            )}
            <button onClick={() => {
              if (triples.length > 1) {
                removeRun(triple.id)(state, dispatch)
              }
            }}>Remove</button>
          </div>
        )
      }
      <button onClick={() => {
        if (triples.length < 4) {
          addRun()(state, dispatch)
        }
      }}>Add</button>
      <button type="submit">Submit</button>
    </form>
  )
}