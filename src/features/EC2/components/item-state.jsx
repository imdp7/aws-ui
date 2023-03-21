// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { StatusIndicator, Box } from '@awsui/components-react';

export function ItemState({ state }) {
  if (state === 'deleting') {
    return <StatusIndicator type="pending">Deleting...</StatusIndicator>;
  } else if (state === 'Terminated') {
    return <StatusIndicator type="error">{state}</StatusIndicator>;
  } else if (state === 'Pending') {
    return <StatusIndicator type={'pending'}>{state}</StatusIndicator>;
  }
  return (
    <StatusIndicator type={state === 'Running' ? 'success' : 'stopped'}>
      {state}
    </StatusIndicator>
  );
}

export function StatusCheck({ statusCheck, state }) {
  if (statusCheck === '0/2 checks passed' && state === 'Running') {
    return <StatusIndicator type="error">{statusCheck}</StatusIndicator>;
  }
  if (statusCheck === '1/2 checks passed' && state === 'Running') {
    return <StatusIndicator type="pending">{statusCheck}</StatusIndicator>;
  }
  if (statusCheck === '2/2 checks passed' && state === 'Running') {
    return <StatusIndicator type="success">{statusCheck}</StatusIndicator>;
  }

  return <Box>{'-'}</Box>;
}

// ItemState.propTypes = {
//   state: PropTypes.string.isRequired,
// };

// StatusCheck.propTypes = {
//   state: PropTypes.string.isRequired,
//   statusCheck: PropTypes.string.isRequired,
// };
