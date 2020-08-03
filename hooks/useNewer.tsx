import * as React from 'react';

interface ReturnNewer {
  data: any;
}

export const useNewer = (data1: any, data2: any) => {
  const [newsetData, setNewestData] = React.useState(data1);

  React.useEffect(() => {
    setNewestData(data1);
  }, [data1]);

  React.useEffect(() => {
    setNewestData(data2);
  }, [data2]);

  return newsetData;
};
