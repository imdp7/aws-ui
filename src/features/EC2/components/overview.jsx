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
import INSTANCES from '../../resources/ec2-instances';

const sg = INSTANCES.filter((x) => x.numOfvCpu >= 5).length;
const lb = INSTANCES.filter((x) => x.volume >= 5).length;
const volume = INSTANCES.filter((x) => x.numOfvCpu >= 7).length;
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
          <CounterLink link={'instances'}>{INSTANCES.length}</CounterLink>
        </div>
        <div>
          <Box variant="awsui-key-label">Volumes</Box>
          <CounterLink link={'volumes'}>{volume}</CounterLink>
        </div>
        <div>
          <Box variant="awsui-key-label">Security groups</Box>
          <CounterLink link={'security-groups'}>{sg}</CounterLink>
        </div>
        <div>
          <Box variant="awsui-key-label">Load balancers</Box>
          <CounterLink link={'lb'}>{lb}</CounterLink>
        </div>
      </ColumnLayout>
    </Container>
  );
}
