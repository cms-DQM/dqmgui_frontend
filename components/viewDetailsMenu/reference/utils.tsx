import { v4 as uuidv4 } from 'uuid';

export const getTriples = (params: string) => {
  if (params && params.length > 0) {
    const runs = params.split('&')
    const triples = runs.map((run) => {
      const id = uuidv4();
      const parts = params.split('/')
      const run_number = parts.shift()
      const label = parts.pop()
      const dataset_name ='/'+ parts.join('/')
      const checked = true
      return {
        id,
        run_number,
        dataset_name,
        label,
        checked,
      }
    })
    return triples
  }
  return []
}