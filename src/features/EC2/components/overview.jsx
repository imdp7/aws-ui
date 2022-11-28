// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import {
  Box,
  Container,
  Header,
  ColumnLayout,
} from '@cloudscape-design/components';
import { CounterLink } from '../commons/common-components';

export default function ServiceOverview() {
  return (
    <Container
      className="custom-dashboard-container"
      header={
        <Header variant="h2" description="Viewing data from N. Virginia region">
          Service overview
        </Header>
      }
    >
      <ColumnLayout columns="4" variant="text-grid">
        <div>
          <Box variant="awsui-key-label">Running instances</Box>
          <CounterLink>0</CounterLink>
        </div>
        <div>
          <Box variant="awsui-key-label">Volumes</Box>
          <CounterLink>0</CounterLink>
        </div>
        <div>
          <Box variant="awsui-key-label">Security groups</Box>
          <CounterLink>0</CounterLink>
        </div>
        <div>
          <Box variant="awsui-key-label">Load balancers</Box>
          <CounterLink>0</CounterLink>
        </div>
      </ColumnLayout>
    </Container>
  );
}
