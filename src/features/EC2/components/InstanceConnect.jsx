import React from 'react';
import { FormField, Input } from '@cloudscape-design/components';
import CopyText from '../commons/copy-text';

function InstanceConnect({ state, id }) {
  return (
    <>
      <FormField label="Instance ID">
        <CopyText
          copyText={id}
          copyButtonLabel="Copy Instance ID"
          successText="Instance ID copied"
          errorText="Instance ID failed to copy"
        />
      </FormField>
    </>
  );
}

export default InstanceConnect;
