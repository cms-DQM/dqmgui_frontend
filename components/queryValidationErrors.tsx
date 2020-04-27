import React, { ReactElement } from 'react';
import { Alert } from 'antd';

interface QuerValidationErrrorsProps {
  validation_errors: string[];
}

export const QueryValidationErrors = ({
  validation_errors,
}: QuerValidationErrrorsProps): ReactElement => (
    <>
      {validation_errors.map((error) => (
        <Alert
          key={error}
          message="Error in the URL query"
          description={error}
          type="error"
          showIcon
        />
      ))}
    </>
  );
