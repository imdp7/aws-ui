// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { StatusIndicator } from '@cloudscape-design/components';

export default function ItemState({ state }) {
  if (state === 'deleting') {
    return <StatusIndicator type="pending">Deleting...</StatusIndicator>;
  } else if (state === 'Terminated') {
    return <StatusIndicator type="error">{state}</StatusIndicator>;
  } else if (state === 'Pending') {
    return <StatusIndicator type="pending">{state}</StatusIndicator>;
  }
  return (
    <StatusIndicator type={state === 'Stopped' ? 'stopped' : 'success'}>
      {state}
    </StatusIndicator>
  );
}
