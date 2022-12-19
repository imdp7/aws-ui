import React, { useState } from 'react';
import {
  Box,
  Header,
  HelpPanel,
  Icon,
  Link,
  SpaceBetween,
  Table,
} from '@awsui/components-react';
import { useOutletContext } from 'react-router';
import { InfoLink } from '../common/common';
import { getHeaderCounterText } from '../../app/util';
import { Feature2Data, selectFeature2Data } from './feature2DataSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const Feature2HelpPanel = (): JSX.Element => {
  return (
    <HelpPanel
      footer={
        <div>
          <h3>
            Learn more <Icon name="external" />
          </h3>
          <ul>
            <li>
              <Link external href="https://docs.example.com/Feature2">
                S3 docs
              </Link>
            </li>
          </ul>
        </div>
      }
      header={<h2>S3</h2>}
    >
      <Box variant="p">Paragraph containing informative help info about S3</Box>
    </HelpPanel>
  );
};

const Feature2DetailsTable = (): JSX.Element => {
  const updateTools = useOutletContext<(element: JSX.Element) => void>();
  const feature2Data = useAppSelector(selectFeature2Data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [items, setItems] = useState<Feature2Data[]>(feature2Data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();

  return (
    <Table
      columnDefinitions={[
        {
          header: 'Name',
          cell: (item) => item.name,
        },
        {
          header: 'Description',
          cell: (item) => item.description || '-',
        },
        {
          header: 'Active',
          cell: (item) => new Boolean(item.active).toString(),
        },
      ]}
      items={items}
      header={
        <Header
          counter={getHeaderCounterText(items as [])}
          description="Short phrase about Feature 2 items"
          info={
            <InfoLink onFollow={() => updateTools(<Feature2HelpPanel />)} />
          }
        >
          Items
        </Header>
      }
    />
  );
};

export const S3 = (): JSX.Element => {
  return (
    <SpaceBetween size="l">
      <Header variant="h1">S3</Header>

      <Feature2DetailsTable />
    </SpaceBetween>
  );
};
