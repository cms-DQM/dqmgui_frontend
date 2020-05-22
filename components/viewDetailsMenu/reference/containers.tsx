import React, { useEffect } from 'react';

import {
  removeRun,
  change_value_in_reference_table,
} from '../../../reducers/reference';
import { Typography } from 'antd';

const { Text } = Typography;

interface FieldProps {
  dispatch: any;
  state: any;
  id: any;
  field_name: string;
  value: any;
  defaultValue?: string | number;
}

export const Container = ({
  state,
  dispatch,
  id,
  field_name,
  value,
  defaultValue,
}: FieldProps) => {
  const inputValue = value ? value : defaultValue;

  useEffect(() => {
    change_value_in_reference_table(
      inputValue,
      field_name,
      id
    )(state, dispatch);
    const cleanField = () => {
      removeRun(id)(state, dispatch);
    };
    return cleanField;
  }, []);

  return (
    <>
      <Text>{field_name}: </Text>
      <Text strong >{inputValue}</Text>
    </>
  );
};
