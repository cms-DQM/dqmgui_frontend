import React, { useState } from 'react';
import { DropdownMenu } from '../../menu';
import { StyledFormItem, StyledInput } from '../../styledComponents';
import { xyzTypes } from '../../constants';
import { OptionProps } from '../../../containers/display/interfaces';
import { Select } from 'antd';
import { StyledSelect } from '../styledComponents';

const { Option } = Select;

interface TypesProps {
  type: string;
}

export const Type = ({ type }: TypesProps) => {
  const [selectedOption, setSelectedOption] = useState<OptionProps>(
    xyzTypes[0]
  );

  const copy: OptionProps[] = [...xyzTypes];
  const withAction: OptionProps[] = copy.map((option: OptionProps) => {
    const copy = { ...option };
    copy.action = setSelectedOption;
    return copy;
  });

  return (
    <tr>
      <td>
        <StyledFormItem name={`${type}type`} label={`${type} type`}>
          <StyledSelect allowClear defaultValue={xyzTypes[0].value}>
            {xyzTypes.map((option: OptionProps) => (
              <Option value={option.value}>{option.label}</Option>
            ))}
          </StyledSelect>
          {/* <DropdownMenu title="Reference" options={referenceCopy} /> */}
        </StyledFormItem>
      </td>
      <td>
        <StyledFormItem label="min" name={`${type}min`}>
          <StyledInput />
        </StyledFormItem>
      </td>
      <td>
        <StyledFormItem label="max" name={`${type}max`}>
          <StyledInput />
        </StyledFormItem>
      </td>
    </tr>
  );
};
