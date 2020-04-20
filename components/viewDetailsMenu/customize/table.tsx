import React, { useState } from 'react';
import { ParamsForApiProps, OptionProps, CustomizeProps } from '../../../containers/display/interfaces';
import { Form, Col } from 'antd';

import { DropdownMenu } from '../../menu'
import { withReference } from '../../constants';
import { StyledInput, StyledFormItem, StyledButton } from '../../styledComponents';
import { Type } from './type';
import { FullWidthRow } from '../styledComponents';
import { setParamsForCustomize } from '../../../reducers/displayFolderOrPlot';

interface CostumizeTableProps {
  params?: ParamsForApiProps
  dispatch: any;
}

export const CostumizeTable = ({ dispatch }: CostumizeTableProps) => {

  const [reference, setReference] = useState<OptionProps>(withReference[0])

  const referenceCopy: OptionProps[] = [...withReference]
  referenceCopy.map((option: OptionProps) => option.action = setReference)

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const types = ['x', 'y', 'z']

  return (
    <Form
      layout={'inline'}
      {...layout}
      name="search_form"
      className="fieldLabel"
      initialValues={{ remember: true }}
      onFinish={(params) => {}
        // setParamsForCustomize(params as CustomizeProps)(dispatch)
       }
    >
      <FullWidthRow>
        <Col span={24}>
          <table>
            <tbody>
              {
                types.map((type) =>
                  <Type type={type} />
                )
              }
              <tr>
                <td style={{ paddingTop: '16px' }}>
                  <DropdownMenu title="Reference" options={referenceCopy} />
                </td>
                <td style={{ paddingTop: '16px', paddingRight: '16px' }}>{reference?.label}</td>
                <td style={{ paddingTop: '16px' }}>
                  <StyledFormItem
                    label="Draw options"
                    name="drawOptions"
                  >
                    <StyledInput />
                  </StyledFormItem>
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
      </FullWidthRow>
      <FullWidthRow justify="end">
        <Col>
          <StyledButton
            htmlType="submit">
            Submit
            </StyledButton>
        </Col>
      </FullWidthRow>
    </Form>
  );
};
