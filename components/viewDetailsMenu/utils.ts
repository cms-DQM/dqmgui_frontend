import { TripleProps } from '../../containers/display/interfaces';

export const filter_valid_runs = (triples: TripleProps[]) =>
  triples.filter((triple: TripleProps) => {
    if (triple.run_number) {
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
