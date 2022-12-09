/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  ColumnLayout,
  Header,
  Input,
  Link,
  SpaceBetween,
  FormField,
  Select,
  Icon,
  Box,
  Button,
  Tiles,
  Checkbox,
  Alert,
  AttributeEditor,
  Autosuggest,
  Tabs,
  Cards,
  Badge,
  Container,
  ExpandableSection,
  RadioGroup,
} from '@cloudscape-design/components';
import { ExternalLinkItem, InfoLink } from '../commons/common-components';
import { HelpPanels } from '../components/header';

function Panel1({
  loadHelpPanelContent,
  readOnlyWithErrors = false,
}): JSX.Element {
  const [value, setValue] = useState('');
  const [AMI, setAMI] = useState('');
  const [activeTabId, setActiveTabId] = useState('second');

  const [tile, setTile] = useState('item1');
  const [selectedOption, setSelectedOption] = useState({
    label: 't2.micro',
    value: '1',
    iconName: 'settings',
    description: 'sub value',
    tags: ['CPU-v2', '2Gb RAM'],
    labelTag: '128Gb',
  });
  const [storage, setStorage] = useState({
    label: 'General Purpose SSD (gp2)',
  });
  const [ip, setIP] = useState({ label: '0.0.0.0', description: 'Anywhere' });
  const [visible, setVisible] = React.useState(true);
  const [items, setItems] = useState([{}]);
  const [checked, setChecked] = useState(true);

  const NETWORK = {
    network: 'vpc-070015eaa47ab026e',
    subnet: 'No preference (Default subnet in any availability zone)',
    PublicIP: 'Enable',
  };

  const definitions = [
    {
      label: <Badge color="blue">Added Volume's</Badge>,
      info: (
        <InfoLink
          variant="info"
          ariaLabel={'Added Volume.'}
          onFollow={() =>
            loadHelpPanelContent(
              <HelpPanels
                title="Added Volume"
                des="Volume that is required to add more storage."
                ul={[
                  {
                    h5: 'Key',
                    text: 'Up to 128 Unicode characters in UTF-8',
                  },
                  {
                    h5: 'Value',
                    text: 'Optional tag value up to 256 characters in UTF-8',
                  },
                  {
                    h5: 'Resource Type',
                    text: 'The resource type on which the tag will be created when an instance is launched from the launch template.',
                  },
                ]}
              />
            )
          }
        >
          Info
        </InfoLink>
      ),
      control: (item, index) => {
        return (
          <SpaceBetween size="xxs" direction="horizontal">
            <Box>1x</Box>
            <Input
              inputMode="numeric"
              type="number"
              onChange={({ detail }) => setValue(detail.value)}
              value={value}
              placeholder="1"
            />
            <div>GiB</div>
            <Select
              selectedOption={storage}
              onChange={({ detail }) => setStorage(detail.selectedOption)}
              options={[
                { label: 'General Purpose SSD (gp3)', value: '1' },
                { label: 'General Purpose SSD (gp2)', value: '2' },
                { label: 'Provisioned IOPS SSD (io1)', value: '3' },
                { label: 'Provisioned IOPS SSD (io2)', value: '4' },
                { label: 'Cold HDD (sc1)', value: '5' },
              ]}
              selectedAriaLabel="Selected"
            />

            <Box>EBS volume</Box>
            <Box>(Not encrypted)</Box>
          </SpaceBetween>
        );
      },
    },
  ];

  const Card = () => {
    const [selectedItems, setSelectedItems] = React.useState([
      { name: 'Amazon' },
    ]);
    const [architecture, setArchitecture] = React.useState({
      label: '64-bit (x86)',
    });

    return (
      <SpaceBetween size="m">
        <Cards
          onSelectionChange={({ detail }) =>
            setSelectedItems(detail.selectedItems)
          }
          selectedItems={selectedItems}
          ariaLabels={{
            itemSelectionLabel: (e, t) => `select ${t.name}`,
            selectionGroupLabel: 'Item selection',
          }}
          cardDefinition={{
            header: (e) => e.name,
            sections: [
              {
                id: 'image',
                content: (e) => e.image,
              },
            ],
          }}
          cardsPerRow={[{ cards: 1 }, { minWidth: 50, cards: 4 }]}
          items={[
            {
              name: 'Amazon',
              alt: 'First',
            },
            {
              name: 'macOS',
              alt: 'Second',
            },
            {
              name: 'Ubuntu',
              alt: 'Third',
            },
            {
              name: 'Windows',
              alt: 'Fourth',
            },
            {
              name: 'Red Hat',
              alt: 'Fifth',
            },
            {
              name: 'SUSE - Linux',
              alt: 'Sixth',
            },
            {
              name: 'Browse More',
              alt: 'Seventh',
            },
          ]}
          loadingText="Loading resources"
          selectionType="single"
          trackBy="name"
          visibleSections={['description', 'type', 'size']}
          empty={
            <Box textAlign="center" color="inherit">
              <b>No resources</b>
              <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                No resources to display.
              </Box>
              <Button>Create resource</Button>
            </Box>
          }
        />
        <Box display="block" variant="code" style={{ text: 'lg' }}>
          Amazon Machine Image (AMI)
        </Box>
        <Select
          selectedOption={selectedOption}
          onChange={({ detail }) => setSelectedOption(detail.selectedOption)}
          options={[
            {
              label: 'Option 1',
              value: '1',
              iconName: 'settings',
              description: 'sub value',
              tags: ['CPU-v2', '2Gb RAM'],
              labelTag: '128Gb',
            },
            {
              label: 'Option 2',
              value: '2',
              iconName: 'settings',
              description: 'sub value',
              tags: ['CPU-v2', '2Gb RAM'],
              labelTag: '128Gb',
            },
            {
              label: 'Option 3',
              value: '3',
              iconName: 'settings',
              description: 'sub value',
              tags: ['CPU-v2', '2Gb RAM'],
              labelTag: '128Gb',
            },
          ]}
          selectedAriaLabel="Selected"
          triggerVariant="option"
        />
        <Box display="block" variant="code">
          Description
        </Box>
        <Box display="block" variant="awsui-key-label">
          Amazon Linux 2 Kernel 5.10 AMI 2.0.20221103.3 x86_64 HVM gp2
        </Box>

        <ColumnLayout columns={3}>
          <Box>
            <SpaceBetween size={'m'}>
              <Box display="block" variant="code">
                Architecture
              </Box>
              <Select
                empty
                onChange={({ detail }) =>
                  setArchitecture(detail.selectedOption)
                }
                selectedOption={architecture}
                loadingText="loading"
                options={[{ label: '64-bit (x86)' }, { label: '64-bit (ARM)' }]}
              />
            </SpaceBetween>
          </Box>
          <Box>
            <SpaceBetween size={'m'}>
              <Box display="block" variant="code">
                AMI
              </Box>
              <Box>ami-0b0dcb5067f052a63</Box>
            </SpaceBetween>
          </Box>
          <Box>
            <SpaceBetween size={'m'}>
              <div></div>
              <Badge color="green">Verified Provider</Badge>
            </SpaceBetween>
          </Box>
        </ColumnLayout>
      </SpaceBetween>
    );
  };

  const onAddHeaderButtonClickHandler = () => {
    !readOnlyWithErrors && setItems([...items, {}]);
  };

  const onRemoveHeaderButtonClickHandler = ({ detail: { itemIndex } }) => {
    if (readOnlyWithErrors) {
      return;
    }

    const itemsCopy = items.slice();
    itemsCopy.splice(itemIndex, 1);
    setItems(itemsCopy);
  };
  const getOnChangeHandler = (key, item, index) => {
    if (readOnlyWithErrors) {
      return () => {
        /*noop*/
      };
    }

    return ({ detail }) => {
      const itemsCopy = items.slice();
      const updatedItem = assign({}, item);
      updatedItem[key] = detail.value;
      itemsCopy.splice(index, 1, updatedItem);
      setItems(itemsCopy);
    };
  };

  return (
    <div>
      <SpaceBetween size="xl" direction="vertical">
        <Container
          id="distribution-panel"
          header={
            <Header
              variant="h2"
              info={
                <InfoLink
                  id="certificate-method-info-link"
                  onFollow={() =>
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Resource tags"
                        des="A tag is a label that you assign to an AWS resource. Each tag consists of a key and an optional value, both of which you define."
                        ul={[
                          {
                            h5: 'Key',
                            text: 'Up to 128 Unicode characters in UTF-8',
                          },
                          {
                            h5: 'Value',
                            text: 'Optional tag value up to 256 characters in UTF-8',
                          },
                          {
                            h5: 'Resource Type',
                            text: 'The resource type on which the tag will be created when an instance is launched from the launch template.',
                          },
                        ]}
                      />
                    )
                  }
                  ariaLabel={'Information about SSL/TLS certificate.'}
                />
              }
            >
              Name and Tags
            </Header>
          }
        >
          <SpaceBetween size="l">
            <FormField label="Name" stretch={true}>
              <Input
                value={value}
                ariaRequired={true}
                placeholder="Eg.Web Server"
                onChange={({ detail }) => setValue(detail.value)}
              />
            </FormField>
          </SpaceBetween>
        </Container>
        {/* <Container
          variant="stacked"
          header={
            <Header
              variant="h2"
              info={
                <InfoLink
                  onFollow={() =>
                    props.loadHelpPanelContent(
                      <HelpPanels
                        title="Resource tags"
                        des="A tag is a label that you assign to an AWS resource. Each tag consists of a key and an optional value, both of which you define."
                        ul={[
                          {
                            h5: 'Key',
                            text: 'Up to 128 Unicode characters in UTF-8',
                          },
                          {
                            h5: 'Value',
                            text: 'Optional tag value up to 256 characters in UTF-8',
                          },
                          {
                            h5: 'Resource Type',
                            text: 'The resource type on which the tag will be created when an instance is launched from the launch template.',
                          },
                        ]}
                      />
                    )
                  }
                  ariaLabel={'Information about service health.'}
                />
              }
            >
              Name and tags
            </Header>
          }
        >
          <FormField
            //     description="This is a description."
            label="Name"
          >
            <ColumnLayout columns={2} variant="text-grid">
              <Input
                onChange={({ detail }) => setValue(detail.value)}
                value={value}
                ariaRequired
                autoComplete={false}
                disableBrowserAutocorrect
                placeholder="e.g. My Web Server"
                step={1}
              />
              <Link>Add Additional tags</Link>
            </ColumnLayout>
          </FormField>
        </Container> */}

        {/* Section */}

        <ExpandableSection
          headerAriaLabel="AMI"
          variant="container"
          headerText="Application and OS Images (Amazon Machine Image)"
          defaultExpanded
          headerDescription="An AMI is a template that contains the software configuration (operating system, application server, and applications) required to launch your instance. Search or Browse for AMIs if you don’t see what you are looking for below"
        >
          <Container>
            <SpaceBetween size="m">
              <Autosuggest
                onChange={({ detail }) => setAMI(detail.value)}
                value={AMI}
                options={[
                  { value: 'Suggestion 1' },
                  { value: 'Suggestion 2' },
                  { value: 'Suggestion 3' },
                  { value: 'Suggestion 4' },
                ]}
                enteredTextLabel={(value) => `Use: "${value}"`}
                ariaLabel="Autosuggest example with suggestions"
                placeholder="Search our catalog of 1000s of application and OS image"
                empty="No matches found"
              />
              <Tabs
                onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
                activeTabId={activeTabId}
                tabs={[
                  {
                    label: 'Recent',
                    id: 'first',
                    content: 'First tab content area',
                  },
                  {
                    label: 'Quick Start',
                    id: 'second',
                    content: <Card />,
                  },
                ]}
              />
            </SpaceBetween>
          </Container>
        </ExpandableSection>

        {/* Section */}

        <ExpandableSection
          variant="container"
          headerText="Instance Type"
          defaultExpanded
          //     headerDescription="here"
        >
          <Select
            selectedOption={selectedOption}
            onChange={({ detail }) => setSelectedOption(detail.selectedOption)}
            options={[{}]}
            ariaRequired
            expandToViewport
            filteringType="auto"
            loadingText="loading"
            selectedAriaLabel="Selected"
            triggerVariant="option"
            virtualScroll
            //statusType="loading"
          />
        </ExpandableSection>

        {/* Section */}

        <ExpandableSection
          variant="container"
          headerText="Key Pair (login)"
          headerDescription="You can use a key pair to securely connect to your instance. Ensure that you have access to the selected key pair before you launch the instance."
          defaultExpanded
        >
          <ColumnLayout columns={2} variant="text-grid">
            <Select
              //selectedOption={selectedOption}
              onChange={({ detail }) =>
                setSelectedOption(detail.selectedOption)
              }
              options={[]}
              loadingText="Loading instances"
              placeholder="Choose an option"
              selectedAriaLabel="Selected"
              statusType="loading"
              selectedOption={null}
            />
            <div>
              <SpaceBetween size={'xxl'} direction="horizontal">
                <Icon name="refresh" />
                <Link>Add new Key Value Pair</Link>
              </SpaceBetween>
            </div>
          </ColumnLayout>
        </ExpandableSection>

        <ExpandableSection
          variant="container"
          headerText="Network Settings"
          defaultExpanded
        >
          <SpaceBetween size="m" direction="vertical">
            <Box>
              <Box variant="awsui-key-label" color="text-body-secondary">
                Network
              </Box>
              {NETWORK.network}
            </Box>
            <Box>
              <Box variant="awsui-key-label" color="text-body-secondary">
                Subnet
              </Box>
              {NETWORK.subnet}
            </Box>
            <Box>
              <Box variant="awsui-key-label" color="text-body-secondary">
                Auto-assign public IP
              </Box>
              {NETWORK.PublicIP}
            </Box>
            <Box>
              <Header
                variant="h3"
                info={<Link>Info</Link>}
                description="A security group is a set of firewall rules that control the traffic for your instance. Add rules to allow specific traffic to reach your instance."
              >
                Firewall (security groups)
              </Header>
              <Tiles
                onChange={({ detail }) => {
                  setTile(detail.value);
                }}
                value={tile}
                items={[
                  { label: 'Create Security Group', value: 'item1' },
                  { label: 'Select Existing security group', value: 'item2' },
                ]}
              />
            </Box>
            <div>
              <SpaceBetween size="m">
                <Box>
                  We'll create a new security group called 'launch-wizard-1'
                  with the following rules:
                </Box>
                <ColumnLayout columns={2}>
                  <Box>
                    <Checkbox
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                      key={1}
                      description="Helps you connect to your instance"
                    >
                      Allow SSH traffic from
                    </Checkbox>
                    <Checkbox
                      key={2}
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                      description="To set up an endpoint, for example when creating a web server"
                    >
                      Allow HTTPS traffic from the internet
                    </Checkbox>
                    <Checkbox
                      key={3}
                      description="To set up an endpoint, for example when creating a web server"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    >
                      Allow HTTP traffic from the internet
                    </Checkbox>
                  </Box>
                  <Box>
                    <Select
                      selectedOption={ip}
                      onChange={({ detail }) => setIP(detail.selectedOption)}
                      options={[
                        { label: '0.0.0.0', description: 'Anywhere' },
                        { label: 'Custom', value: '' },
                        { label: 'My IP', description: '52.201.134.131/32' },
                      ]}
                      selectedAriaLabel="Selected"
                    />
                  </Box>
                </ColumnLayout>
                <Alert
                  onDismiss={() => setVisible(false)}
                  visible={visible}
                  dismissAriaLabel="Close alert"
                  type="warning"
                  dismissible
                >
                  Rules with source of 0.0.0.0/0 allow all IP addresses to
                  access your instance. We recommend setting security group
                  rules to allow access from known IP addresses only.
                </Alert>
              </SpaceBetween>
            </div>
          </SpaceBetween>
        </ExpandableSection>

        <ExpandableSection
          variant="container"
          headerText="Configure Storage"
          defaultExpanded
          className="header-panel"
        >
          <Container
            footer={
              <SpaceBetween
                size="m"
                direction="horizontal"
                className="footer_panel"
              >
                <>0 X File Systems</>
                <Link>Edit</Link>
              </SpaceBetween>
            }
          >
            <SpaceBetween size="m" direction="vertical">
              <ColumnLayout>
                <SpaceBetween size="xs" direction="horizontal">
                  <Box>1x</Box>
                  <Input
                    inputMode="numeric"
                    type="number"
                    onChange={({ detail }) => setValue(detail.value)}
                    value={value}
                    placeholder="1"
                  />
                  <Box>GiB</Box>
                  <Select
                    selectedOption={storage}
                    onChange={({ detail }) => setStorage(detail.selectedOption)}
                    options={[
                      { label: 'General Purpose SSD (gp3)', value: '1' },
                      { label: 'General Purpose SSD (gp2)', value: '2' },
                      { label: 'Provisioned IOPS SSD (io1)', value: '3' },
                      { label: 'Provisioned IOPS SSD (io2)', value: '4' },
                      { label: 'Cold HDD (sc1)', value: '5' },
                    ]}
                    selectedAriaLabel="Selected"
                  />
                  <Box>Root volume</Box>
                  <Box>(Not encrypted)</Box>
                </SpaceBetween>
                <AttributeEditor
                  removeButtonText="Remove"
                  addButtonText="Add new Volume"
                  empty="Need new volumes"
                  definition={definitions}
                  onAddButtonClick={onAddHeaderButtonClickHandler}
                  onRemoveButtonClick={onRemoveHeaderButtonClickHandler}
                  items={items}
                />
              </ColumnLayout>
              <Alert
                onDismiss={() => setVisible(false)}
                visible={visible}
                dismissAriaLabel="Close alert"
                dismissible
              >
                Free tier eligible customers can get up to 30 GB of EBS General
                Purpose (SSD) or Magnetic storage
              </Alert>
            </SpaceBetween>
          </Container>
        </ExpandableSection>

        <ExpandableSection variant="container" headerText="Advanced Settings">
          Content Goes here
        </ExpandableSection>
      </SpaceBetween>
    </div>
  );
}

export default Panel1;
function setChecked(arg0: boolean): void {
  throw new Error('Function not implemented.');
}
