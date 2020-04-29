import cleanDeep from 'clean-deep';
import { v4 as uuidv4 } from 'uuid';

import { TripleProps } from '../../containers/display/interfaces';

export const filter_valid_runs = (triples: TripleProps[]) =>
  triples.filter((triple: TripleProps) => {
    if (triple.run_number && triple.checked) {
      return triple;
    }
  });

export const filter_plots = (triples: TripleProps[], id: any) => {
  return triples.filter((triple: TripleProps) => {
    if (triple.id !== id && triple.run_number) {
      return triple;
    }
  });
};

export const formTriples = (overlay_data: string | undefined) => {
  const data = overlay_data?.split('&')
  return data?.map((oneRun: string) => {
    const id = uuidv4();

    const splitedParams = oneRun ? cleanDeep(oneRun.split('/')) : undefined
    const label = splitedParams ? splitedParams.pop() : ''
    const run_number = splitedParams ? splitedParams.shift() : ''
    const dataset_name = splitedParams ? '/' + splitedParams?.join('/') : ''
    const triple_object = { id: id, run_number: run_number, dataset_name: dataset_name, label: label }
    return triple_object
  })

}