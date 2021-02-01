import React, { useEffect } from 'react';

import { Typography } from 'antd';

const { Text } = Typography;

interface FieldProps {
  removeRun(id: string | number | boolean): void;
  id: any;
  field_name: string;
  value: any;
  defaultValue?: string | number;
  change_value_in_reference_table(
    value: string | number,
    key: string,
    id: string | number | boolean
  ): void;
}

export const Container = ({
  removeRun,
  change_value_in_reference_table,
  id,
  field_name,
  value,
  defaultValue,
}: FieldProps) => {
  const inputValue = value ? value : defaultValue;

  useEffect(() => {
    change_value_in_reference_table(inputValue, field_name, id);
    const cleanField = () => {
      removeRun(id);
    };
    return cleanField;
  }, []);

  return (
    <>
      <Text>{field_name}: </Text>
      <Text strong>{inputValue}</Text>
    </>
  );
};
