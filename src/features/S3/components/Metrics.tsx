import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  SpaceBetween,
  Box,
  ColumnLayout,
  Link,
  Button,
  Table,
  Alert,
  PieChart,
  MixedLineBarChart,
  BarChart,
  LineChart,
} from '@cloudscape-design/components';

const data = [
  {
    title: 'Running',
    value: 60,
    lastUpdate: 'Dec 7, 2020',
  },
  {
    title: 'Failed',
    value: 30,
    lastUpdate: 'Dec 6, 2020',
  },
  {
    title: 'In-progress',
    value: 10,
    lastUpdate: 'Dec 6, 2020',
  },
  {
    title: 'Pending',
    value: 0,
    lastUpdate: 'Dec 7, 2020',
  },
];

const BucketMetrics = () => {
  const [loading, setLoading] = useState('finished');

  const fakeDataFetch = (delay) =>
    new Promise<void>((resolve) => setTimeout(() => resolve(), delay));

  useEffect(async () => {
    setLoading('loading');
    await fakeDataFetch(1500);
    setLoading('finished');
  }, []);

  return (
    <Container
      header={
        <Header variant="h2" info={<Link>Info</Link>}>
          Bucket Metrics
        </Header>
      }
    >
      <SpaceBetween size="s">
        <ColumnLayout columns={2}>
          <PieChart
            data={data}
            detailPopoverContent={(datum, sum) => [
              { key: 'Resource count', value: datum.value },
              {
                key: 'Percentage',
                value: `${((datum.value / sum) * 100).toFixed(0)}%`,
              },
              { key: 'Last update on', value: datum.lastUpdate },
            ]}
            segmentDescription={(datum, sum) =>
              `${datum.value} units, ${((datum.value / sum) * 100).toFixed(0)}%`
            }
            i18nStrings={{
              detailsValue: 'Value',
              detailsPercentage: 'Percentage',
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              filterSelectedAriaLabel: 'selected',
              detailPopoverDismissAriaLabel: 'Dismiss',
              legendAriaLabel: 'Legend',
              chartAriaRoleDescription: 'pie chart',
              segmentAriaRoleDescription: 'segment',
            }}
            ariaDescription="Pie chart showing how many resources are currently in which state."
            ariaLabel="Pie chart"
            legendTitle="Total bucket size"
            errorText="Error loading data."
            loadingText="Loading chart"
            statusType={loading}
            recoveryText="Retry"
            empty={
              <Box textAlign="center" color="inherit">
                <b>No data available</b>
                <Box variant="p" color="inherit">
                  There is no data available
                </Box>
              </Box>
            }
            noMatch={
              <Box textAlign="center" color="inherit">
                <b>No matching data</b>
                <Box variant="p" color="inherit">
                  There is no matching data to display
                </Box>
                <Button>Clear filter</Button>
              </Box>
            }
          />

          {/*second PieChart*/}
          <MixedLineBarChart
            series={[
              {
                title: 'Costs',
                type: 'bar',
                data: [
                  { x: 'Jun 2019', y: 6562 },
                  { x: 'Jul 2019', y: 8768 },
                  { x: 'Aug 2019', y: 9742 },
                  { x: 'Sep 2019', y: 10464 },
                  { x: 'Oct 2019', y: 16777 },
                  { x: 'Nov 2019', y: 9956 },
                  { x: 'Dec 2019', y: 5876 },
                ],
                valueFormatter: (e) => '$' + e.toLocaleString('en-US'),
              },
              {
                title: 'Costs last year',
                type: 'line',
                data: [
                  { x: 'Jun 2019', y: 5373 },
                  { x: 'Jul 2019', y: 7563 },
                  { x: 'Aug 2019', y: 7900 },
                  { x: 'Sep 2019', y: 12342 },
                  { x: 'Oct 2019', y: 14311 },
                  { x: 'Nov 2019', y: 11830 },
                  { x: 'Dec 2019', y: 8505 },
                ],
                valueFormatter: (e) => '$' + e.toLocaleString('en-US'),
              },
              {
                title: 'Budget',
                type: 'threshold',
                y: 12000,
                valueFormatter: (e) => '$' + e.toLocaleString('en-US'),
              },
              {
                title: 'Peak cost',
                type: 'threshold',
                x: 'Sep 2019',
              },
            ]}
            xDomain={[
              'Jun 2019',
              'Jul 2019',
              'Aug 2019',
              'Sep 2019',
              'Oct 2019',
              'Nov 2019',
              'Dec 2019',
            ]}
            yDomain={[0, 20000]}
            i18nStrings={{
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              filterSelectedAriaLabel: 'selected',
              detailPopoverDismissAriaLabel: 'Dismiss',
              legendAriaLabel: 'Legend',
              chartAriaRoleDescription: 'line chart',
              yTickFormatter: function l(e) {
                return Math.abs(e) >= 1e9
                  ? (e / 1e9).toFixed(1).replace(/\.0$/, '') + 'G'
                  : Math.abs(e) >= 1e6
                  ? (e / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
                  : Math.abs(e) >= 1e3
                  ? (e / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
                  : e.toFixed(2);
              },
            }}
            ariaLabel="Mixed bar chart"
            errorText="Error loading data."
            height={300}
            legendTitle="Total number of objects"
            loadingText="Loading chart"
            statusType={loading}
            recoveryText="Retry"
            xScaleType="categorical"
            xTitle="Budget month"
            yTitle="Costs (USD)"
            empty={
              <Box textAlign="center" color="inherit">
                <b>No data available</b>
                <Box variant="p" color="inherit">
                  There is no data available
                </Box>
              </Box>
            }
            noMatch={
              <Box textAlign="center" color="inherit">
                <b>No matching data</b>
                <Box variant="p" color="inherit">
                  There is no matching data to display
                </Box>
                <Button>Clear filter</Button>
              </Box>
            }
          />

          {/*Third BarChart*/}
          <BarChart
            series={[
              {
                title: 'Site 1',
                type: 'bar',
                data: [
                  { x: new Date(1601092800000), y: 34503 },
                  { x: new Date(1601100000000), y: 25832 },
                  { x: new Date(1601107200000), y: 4012 },
                  { x: new Date(1601114400000), y: -5602 },
                  { x: new Date(1601121600000), y: 17839 },
                ],
                valueFormatter: (e) => '$' + e.toLocaleString('en-US'),
              },
              {
                title: 'Average revenue',
                type: 'threshold',
                y: 19104,
                valueFormatter: (e) => '$' + e.toLocaleString('en-US'),
              },
            ]}
            xDomain={[
              new Date(1601092800000),
              new Date(1601100000000),
              new Date(1601107200000),
              new Date(1601114400000),
              new Date(1601121600000),
            ]}
            yDomain={[-10000, 40000]}
            i18nStrings={{
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              filterSelectedAriaLabel: 'selected',
              detailPopoverDismissAriaLabel: 'Dismiss',
              legendAriaLabel: 'Legend',
              chartAriaRoleDescription: 'line chart',
              xTickFormatter: (e) =>
                e
                  .toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: !1,
                  })
                  .split(',')
                  .join('\n'),
              yTickFormatter: function l(e) {
                return Math.abs(e) >= 1e9
                  ? (e / 1e9).toFixed(1).replace(/\.0$/, '') + 'G'
                  : Math.abs(e) >= 1e6
                  ? (e / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
                  : Math.abs(e) >= 1e3
                  ? (e / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
                  : e.toFixed(2);
              },
            }}
            ariaLabel="Single data series line chart"
            errorText="Error loading data."
            height={300}
            loadingText="Loading chart"
            statusType={loading}
            recoveryText="Retry"
            xScaleType="categorical"
            xTitle="Time (UTC)"
            yTitle="Revenue (USD)"
            empty={
              <Box textAlign="center" color="inherit">
                <b>No data available</b>
                <Box variant="p" color="inherit">
                  There is no data available
                </Box>
              </Box>
            }
            noMatch={
              <Box textAlign="center" color="inherit">
                <b>No matching data</b>
                <Box variant="p" color="inherit">
                  There is no matching data to display
                </Box>
                <Button>Clear filter</Button>
              </Box>
            }
          />

          {/*Fourth LineChart*/}
          <LineChart
            series={[
              {
                title: 'Site 1',
                type: 'line',
                data: [
                  { x: new Date(1601006400000), y: 58020 },
                  { x: new Date(1601007300000), y: 102402 },
                  { x: new Date(1601008200000), y: 104920 },
                  { x: new Date(1601009100000), y: 94031 },
                  { x: new Date(1601010000000), y: 125021 },
                  { x: new Date(1601010900000), y: 159219 },
                  { x: new Date(1601011800000), y: 193082 },
                  { x: new Date(1601012700000), y: 162592 },
                  { x: new Date(1601013600000), y: 274021 },
                  { x: new Date(1601014500000), y: 264286 },
                  { x: new Date(1601015400000), y: 289210 },
                  { x: new Date(1601016300000), y: 256362 },
                  { x: new Date(1601017200000), y: 257306 },
                  { x: new Date(1601018100000), y: 186776 },
                  { x: new Date(1601019000000), y: 294020 },
                  { x: new Date(1601019900000), y: 385975 },
                  { x: new Date(1601020800000), y: 486039 },
                  { x: new Date(1601021700000), y: 490447 },
                  { x: new Date(1601022600000), y: 361845 },
                  { x: new Date(1601023500000), y: 339058 },
                  { x: new Date(1601024400000), y: 298028 },
                  { x: new Date(1601025300000), y: 231902 },
                  { x: new Date(1601026200000), y: 224558 },
                  { x: new Date(1601027100000), y: 253901 },
                  { x: new Date(1601028000000), y: 102839 },
                  { x: new Date(1601028900000), y: 234943 },
                  { x: new Date(1601029800000), y: 204405 },
                  { x: new Date(1601030700000), y: 190391 },
                  { x: new Date(1601031600000), y: 183570 },
                  { x: new Date(1601032500000), y: 162592 },
                  { x: new Date(1601033400000), y: 148910 },
                  { x: new Date(1601034300000), y: 229492 },
                  { x: new Date(1601035200000), y: 293910 },
                ],
                valueFormatter: function l(e) {
                  return Math.abs(e) >= 1e9
                    ? (e / 1e9).toFixed(1).replace(/\.0$/, '') + 'G'
                    : Math.abs(e) >= 1e6
                    ? (e / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
                    : Math.abs(e) >= 1e3
                    ? (e / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
                    : e.toFixed(2);
                },
              },
              {
                title: 'Peak hours',
                type: 'threshold',
                x: new Date(1601025000000),
              },
            ]}
            xDomain={[new Date(1601006400000), new Date(1601035200000)]}
            yDomain={[0, 500000]}
            i18nStrings={{
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              filterSelectedAriaLabel: 'selected',
              detailPopoverDismissAriaLabel: 'Dismiss',
              legendAriaLabel: 'Legend',
              chartAriaRoleDescription: 'line chart',
              xTickFormatter: (e) =>
                e
                  .toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: !1,
                  })
                  .split(',')
                  .join('\n'),
              yTickFormatter: function l(e) {
                return Math.abs(e) >= 1e9
                  ? (e / 1e9).toFixed(1).replace(/\.0$/, '') + 'G'
                  : Math.abs(e) >= 1e6
                  ? (e / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
                  : Math.abs(e) >= 1e3
                  ? (e / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
                  : e.toFixed(2);
              },
            }}
            ariaLabel="Single data series line chart"
            errorText="Error loading data."
            height={300}
            hideFilter
            hideLegend
            loadingText="Loading chart"
            recoveryText="Retry"
            statusType={loading}
            xScaleType="time"
            xTitle="Time (UTC)"
            yTitle="Bytes transferred"
            empty={
              <Box textAlign="center" color="inherit">
                <b>No data available</b>
                <Box variant="p" color="inherit">
                  There is no data available
                </Box>
              </Box>
            }
            noMatch={
              <Box textAlign="center" color="inherit">
                <b>No matching data</b>
                <Box variant="p" color="inherit">
                  There is no matching data to display
                </Box>
                <Button>Clear filter</Button>
              </Box>
            }
          />
        </ColumnLayout>
      </SpaceBetween>
    </Container>
  );
};

const Analysis = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const columnDefinitions = [
    {
      id: 'name',
      header: 'Name',
      cell: (e) => e.name,
      sortingField: 'name',
    },
    {
      id: 'filter',
      header: 'Filter',
      cell: (e) => e.filter,
      sortingField: 'filter',
    },
    {
      id: 'destination',
      header: 'Destination',
      cell: (e) => e.destination,
      sortingField: 'destination',
    },
  ];

  return (

        <Table
          items={[]}
          onSelectionChange={({ detail }) =>
            setSelectedItems(detail.selectedItems)
          }
          selectedItems={selectedItems}
          columnDefinitions={columnDefinitions}
          loadingText="Loading resources"

          selectionType="single"
          trackBy="name"
          visibleColumns={['name', 'filter', 'destination']}
          empty={
            <Box textAlign="center" color="inherit">
              <b>There are no analytics configurations</b>
              <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                No configurations to display.
              </Box>
              <Button>Create Configuration</Button>
            </Box>
          }
           header={
        <Header
          variant="h2"
          info={<Link>Info</Link>}
          counter="(0)"
          description={
            <>
              Analyze storage access patterns to help you decide when to
              transition objects to the appropriate storage class.{' '}
              <Link external>Learn More</Link>
            </>
          }
          actions={
            <SpaceBetween size="s" direction="horizontal">
              <Button disabled>Edit</Button>
              <Button disabled>Delete</Button>
              <Button>Create Analysis configuration</Button>
            </SpaceBetween>
          }
        >
          Storage Class Analysis
        </Header>
      }
        />
  );
};

const Replication = () => {
  return (
    <Container
      header={
        <Header
          variant="h2"
          info={<Link>Info</Link>}
          counter="(0)"
          description={
            <>
              Monitor the total number and size of objects that are pending
              replication, and the maximum replication time to the destination
              Region. <Link external>Learn More</Link>
            </>
          }
        >
          Replication metrics
        </Header>
      }
    >
      <Alert
        statusIconAriaLabel="info"
        header="Replication Time Control not enabled for any replication rules"
        action={<Button>Go to Replication</Button>}
      >
        <>
          To receive replication metrics, choose Go to Replication. When you
          create replication rules, enable Replication Time Control.
          <Link external>Learn more </Link>
        </>
      </Alert>
    </Container>
  );
};

const Metrics = () => {
  return (
    <SpaceBetween size="m">
      <BucketMetrics />
      <Analysis />
      <Replication />
    </SpaceBetween>
  );
};

export default Metrics;
