import React, { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { root_url } from '../config/config';

interface ReturnRequest {
  data: any;
  error: any;
  isLoading: boolean;
}

export const useRequest = (
  url: string,
  options: AxiosRequestConfig = {},
  watchers: any[] = [],
  should_we_fetch: boolean = true
): ReturnRequest => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response: AxiosResponse = await axios.request({
          url: `${root_url}/${url}`,
          method: options.method || 'get',
          ...options,
        });
        const { data, status } = response;
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    if (should_we_fetch) {
      fetchData();
    }
  }, watchers);
  return { data, error, isLoading };
};
