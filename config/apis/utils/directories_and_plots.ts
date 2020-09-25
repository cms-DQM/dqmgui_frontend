import cleanDeep from "clean-deep";
import _ from 'lodash';

import { DirectoryInterface, PlotInterface } from "../../../containers/display/interfaces";

//what is streamerinfo? (coming from api, we don't know what it is, so we filtered it out)
// getContent also sorting data that directories should be displayed firstly, just after them- plots images.
export const getContents = (data: any, functions_config: any) => {
  if (functions_config.new_back_end) {
    return data ? _.sortBy(data.data ? data.data : [], ['subdir']) : [];
  }
  return data
    ? _.sortBy(
      data.contents
        ? data.contents
        : [].filter(
          (one_item: PlotInterface | DirectoryInterface) =>
            !one_item.hasOwnProperty('streamerinfo')
        ),
      ['subdir']
    )
    : [];
};

export const getDirectories: any = (contents: DirectoryInterface[], functions_config: any) => {
  return cleanDeep(
    contents.map((content: DirectoryInterface) => {
      if (functions_config?.new_back_end) {
        return { subdir: content.subdir, me_count: content.me_count };
      }
      return { subdir: content.subdir };
    })
  );
};