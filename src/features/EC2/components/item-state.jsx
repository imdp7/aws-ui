// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { StatusIndicator } from '@cloudscape-design/components';

export default function ItemState({ state, statusCheck }) {
  if (state === 'deleting') {
    return <StatusIndicator type="pending">Deleting...</StatusIndicator>;
  } else if (state === 'Terminated') {
    return <StatusIndicator type="error">{state}</StatusIndicator>;
  } else if (state === 'Pending') {
    return (
      <StatusIndicator type={'pending' || '0'}>
        {state || statusCheck}
      </StatusIndicator>
    );
  } else if (statusCheck === '1/2 checks passed') {
    return <StatusIndicator type="warning">{statusCheck}</StatusIndicator>;
  }
  return (
    <StatusIndicator
      type={
        state === 'Stopped' || statusCheck === '0/2 checks passed'
          ? 'stopped'
          : 'success'
      }
    >
      {state || statusCheck}
    </StatusIndicator>
  );
}
