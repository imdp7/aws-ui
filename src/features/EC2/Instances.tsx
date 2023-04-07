/* eslint-disable react/react-in-jsx-scope */
import { appLayoutLabels } from '../common/labels';
import {
  densityStorage,
  densityLocalStorageKey,
  updateDensity,
} from '../common/apply-mode';
import * as localStorage from '../common/localStorage';

import { DashboardHeader, EC2Info } from './components/header';
import {
  FeaturesSpotlight,
  AccountAttributes,
} from './components/related-resources';
import ServiceOverview from './components/overview';
import ServiceHealth from './components/service-health';
import ZoneStatus from './components/zone-status';
import Alarms from './components/alarms';
import InstancesLimits from './components/instance-limits';
import Events from './components/events';
import CPUUtilisation from './components/cpu-utilisation';
import NetworkTraffic from './components/network-traffic';
import { navHeader, Notifications } from './commons/common-components';
import { AppHeader } from '../common/TopNavigations';
import {
  Box,
  ColumnLayout,
  Container,
  Header,
  HelpPanel,
  Icon,
  Link,
  SpaceBetween,
} from '@cloudscape-design/components';
import { useOutletContext } from 'react-router';
import { InfoLink, ValueWithLabel } from '../common/common';

export const Feature1HelpPanel = (): JSX.Element => {
  return (
    <HelpPanel
      footer={
        <div>
          <h3>
            Learn more <Icon name="external" />
          </h3>
          <ul>
            <li>
              <Link external href="https://docs.example.com/feature1">
                Feature 1 docs
              </Link>
            </li>
          </ul>
        </div>
      }
      header={<h2>Feature 1</h2>}
    >
      <Box variant="p">
        Paragraph containing informative help info about Feature 1
      </Box>
    </HelpPanel>
  );
};

interface Feature1Data {
  name: string;
  active: boolean;
  description?: string;
}
const Feature1Details = (): JSX.Element => {
  const updateTools = useOutletContext<(element: JSX.Element) => void>();

  const data: Feature1Data = {
    name: 'Data Name',
    active: true,
  };

  return (
    <Container
      header={
        <Header
          variant="h2"
          info={
            <InfoLink onFollow={() => updateTools(<Feature1HelpPanel />)} />
          }
        >
          Feature 1 Details
        </Header>
      }
    >
      <ColumnLayout columns={2} variant="text-grid">
        <SpaceBetween size="l">
          <ValueWithLabel label="Name">{data.name}</ValueWithLabel>

          <ValueWithLabel label="Description">
            {data.description || '-'}
          </ValueWithLabel>
        </SpaceBetween>
        <SpaceBetween size="l">
          <ValueWithLabel label="Active">
            {new Boolean(data.active).toString()}
          </ValueWithLabel>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
};

export const Instances = (): JSX.Element => {
  return (
    <SpaceBetween size="l">
      <Header variant="h1">EC2 Instance</Header>

      <Feature1Details />
    </SpaceBetween>
  );
};
