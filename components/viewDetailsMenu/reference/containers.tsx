import React, { useEffect } from 'react';

import { removeRun } from '../../../reducers/reference';
import { Typography } from 'antd';

const { Text } = Typography;

interface FieldProps {
  dispatch: any;
  state: any;
  id: any;
  field_name: string;
  value: any
  defaultValue?: string | number
}

export const Container = ({ state, dispatch, id, field_name, value, defaultValue }: FieldProps) => {

  useEffect(() => {
    const cleanField = () => {
      removeRun(id)(state, dispatch);
    }
    return cleanField
  }, [])
  const inputValue = value ? value : defaultValue

  return (
    <div>
      <Text>{field_name}: </Text>
      <Text strong>
        {inputValue}
      </Text>
    </div>
  );
};
