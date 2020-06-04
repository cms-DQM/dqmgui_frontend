import { useState, useEffect, useRef } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';

import { root_url } from '../config/config';

interface ReturnRequest {
  data: any;
  errors: any;
  isLoading: boolean;
  cancelSource: any;
}


//for traching, which req. should be canceled

export const useRequest = (
  url: string,
  options: AxiosRequestConfig = {},
  watchers: any[] = [],
  should_we_fetch: boolean = true
): ReturnRequest => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cancelSource = useRef<CancelTokenSource | null>(null)
  const [errors, setEerrors] = useState<string[]>([])

useEffect(()=>{
  if (cancelSource) {
    cancelSource.current?.cancel()
  }
},[])

  useEffect(() => {
    const CancelToken = axios.CancelToken
    cancelSource.current = CancelToken.source()

    const fetchData = async () => {
      setIsLoading(true);
      try {
        setTimeout(cancelSource.current?.cancel, 180000)
        const response: AxiosResponse = await axios.request({
          url: `${root_url}${url}`,
          method: options.method || 'get',
          cancelToken: cancelSource.current?.token,
          ...options,
        });
        const { data } = response;
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false)
        setEerrors([error.toString()])
        if (axios.isCancel(error)) {
          setIsLoading(false)
          setEerrors(['Request Timeout'])
        }
        cancelSource.current?.cancel()
      }
    };
    if (should_we_fetch) {
      fetchData();
    }
  }, watchers);
  return { data, isLoading, errors, cancelSource };
};
