import { v4 as uuidv4 } from 'uuid';

import { TripleProps } from "../containers/display/interfaces";
import { REFERENCE_REDCER } from '../components/constants';

const id = uuidv4()

interface StateInterface {
  triples: TripleProps[]
}
export const initialState: StateInterface =
{
  triples:
    [{ id: id, dataset_name: '', run_number: NaN, label: '' }]
}

export const change_triples_values = (triple: TripleProps[]) => (dispatch: any) => (
  dispatch({
    type: REFERENCE_REDCER.CHANGE_TRIPLES_VALUES,
    payload: triple
  })
)

export const change_value = (value: string, key: string, id: string | number | boolean) => (state: StateInterface, dispatch: any) => {
  const copy = [...state.triples]
  const current_line: TripleProps = copy.filter((line: TripleProps) => line.id === id)[0]
  const index_of_line: number = copy.indexOf(current_line)
  current_line[key] = value
  copy[index_of_line] = current_line
  change_triples_values(copy)(dispatch)
};

export const addRun = () => (state: StateInterface, dispatch: any) => {
  const copy: TripleProps[] = [...state.triples]
  const id = uuidv4()
  const newRun = { id: id, dataset_name: '', run_number: NaN, label: '' }
  copy.push(newRun)
  change_triples_values(copy)(dispatch)
}

export const removeRun = (id: string | number | boolean) => (state: StateInterface, dispatch: any) => {
  const copy: TripleProps[] = [...state.triples]
  const removed = copy.filter((run: TripleProps) => run.id !== id)
  change_triples_values(removed)(dispatch)
}

export function referenceReducer(state = initialState, action: any) {
  switch (action.type) {
    case REFERENCE_REDCER.CHANGE_TRIPLES_VALUES:
      return { ...state, triples: action.payload };
    default:
      throw new Error();
  }
}