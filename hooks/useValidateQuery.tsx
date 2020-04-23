import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from 'class-validator';
import { ParsedUrlQuery } from 'querystring';

export class Query {
  @IsInt()
  @Min(0)
  run_number?: number;

  dataset_name?: string;

  @IsInt()
  @Min(0)
  search_run_number?: number;

  search_dataset_name?: string;

  folder_path?: string;
}

export function useValidateQuery(query: any) {
  const {
    run_number,
    dataset_name,
    search_run_number,
    search_dataset_name,
    folder_path,
  } = query;
  const validated_query = new Query();
  validated_query.run_number = +run_number;
  validated_query.dataset_name = dataset_name;
  validated_query.search_run_number = +search_run_number;
  validated_query.search_dataset_name = search_dataset_name;
  validated_query.folder_path = folder_path;
  validateOrReject(query).catch((errors) => {
    // TODO: Do something in UI to show ERRORS HERE
  });
  return validated_query;
}
