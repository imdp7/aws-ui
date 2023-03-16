/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import { AppHeader } from '../../common/TopNavigations';
import { AppFooter } from '../../common/AppFooter';
import '../../../App.css';
import {
  AppLayout,
  Grid,
  ContentLayout,
  BreadcrumbGroup,
  Flashbar,
  ColumnLayout,
  Header,
  Input,
  Link,
  SpaceBetween,
  FormField,
  Select,
  Box,
  Button,
  Tiles,
  Checkbox,
  Alert,
  AttributeEditor,
  Autosuggest,
  Tabs,
  Badge,
  Container,
  ExpandableSection,
} from '@cloudscape-design/components';
import { DashboardHeader, HelpPanels } from '../components/header';
import { appLayoutLabels } from '../../common/labels';
import {
  ec2navItems,
  Notifications,
  EC2Header,
} from '../commons/common-components';
import { Navigation } from '../commons/common-components';
import useNotifications from '../commons/use-notifications';
import { Spinner } from '@cloudscape-design/components';
import { InfoLink } from '../commons/common-components';
import { useNavigate } from 'react-router-dom';

function Breadcrumbs() {
  const breadcrumbItems = [
    {
      text: 'EC2',
      href: '/ec2_instance/dashboard',
    },
    {
      text: 'Instances',
      href: '/ec2_instance/instances',
    },
    {
      text: 'Launch an instance',
      href: '/',
    },
  ];

  return (
    <BreadcrumbGroup
      items={breadcrumbItems}
      expandAriaLabel="Show path"
      ariaLabel="Breadcrumbs"
    />
  );
}
const DATA = {
  image: 'Amazon Linux 2 Kernel 5.10 AMI',
  ami: 'ami-0b0dcb5067f052a63',
  instance: 't2.micro',
  firewall: 'New security group',
  vol: '1 volume(s) - 8 GiB',
  status: true,
};

const Content = ({ loadHelpPanelContent }) => {
  const navigate = useNavigate();
  const [instanceNo, setInstanceNo] = useState(1);
  const [btn, setBtn] = useState(true);
  const [name, setName] = useState('');
  const [AMI, setAMI] = useState('');
  const [activeTabId, setActiveTabId] = useState('second');
  const [tiles, setTiles] = useState('Amazon');
  const [tile, setTile] = useState('item1');
  const [storageNo, setStorageNo] = useState(1);
  const [value, setValue] = useState(1);

  const [selectedOption, setSelectedOption] = useState({
    label: 't2.micro',
    value: '1',
    iconName: 'settings',
    description: 'sub value',
    tags: ['CPU-v2', '2Gb RAM'],
    labelTag: '128Gb',
  });

  const [keyPair, setKeyPair] = useState('');
  const [storage, setStorage] = useState({
    label: 'General Purpose SSD (gp2)',
    value: '2',
  });
  const [ip, setIP] = useState({ label: '0.0.0.0', description: 'Anywhere' });
  const [visible, setVisible] = React.useState(true);
  const [items, setItems] = useState([]);
  const [checked, setChecked] = useState(true);
  const [loadings, setLoadings] = useState(false);

  const NETWORK = {
    network: 'vpc-070015eaa47ab026e',
    subnet: 'No preference (Default subnet in any availability zone)',
    PublicIP: 'Enable',
  };
  const [errorMessage, setErrorMessage] = useState('');
  const createInstance = async () => {
    setLoadings(true);
    const timer = setTimeout(async () => {
      if (!name) {
        setErrorMessage('The launch template name is required');
        setLoadings(false);
        return;
      }

      if (!keyPair) {
        setErrorMessage(
          'Please choose a key pair or choose the option to proceed with a key pair'
        );
        setLoadings(false);
        return;
      }

      if (storageNo <= 0) {
        setErrorMessage('Number of storage volume cannot be less 1');
        setLoadings(false);
        return;
      }

      if (instanceNo <= 0) {
        setErrorMessage('Number of instances cannot be less 1');
        setLoadings(false);
        return;
      }
      setErrorMessage('');
      setLoadings(false);
      return;
    }, 1500);
    return () => clearTimeout(timer);
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
      control: (item) => {
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
      value: '1',
    });

    return (
      <SpaceBetween size="m">
        <Tiles
          onChange={({ detail }) => setTiles(detail.value)}
          value={tiles}
          columns={4}
          items={[
            {
              label: 'macOS',
              image: (
                <img
                  src="https://www.freepnglogos.com/uploads/apple-logo-png/file-apple-logo-black-svg-wikimedia-commons-1.png"
                  height="50"
                  width="50"
                  alt="placeholder"
                />
              ),
              value: 'macOS',
            },
            {
              label: 'Amazon',
              image: (
                <img
                  src="https://pngimg.com/uploads/amazon/amazon_PNG5.png"
                  height="50"
                  width="50"
                  alt="placeholder"
                />
              ),
              value: 'Amazon',
            },
            {
              label: 'Ubuntu',
              image: (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/888/888879.png"
                  height="50"
                  width="50"
                  alt="placeholder"
                />
              ),
              value: 'Ubuntu',
            },
            {
              label: 'Windows',
              image: (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Unofficial_Windows_logo_variant_-_2002%E2%80%932012_%28Multicolored%29.svg/1161px-Unofficial_Windows_logo_variant_-_2002%E2%80%932012_%28Multicolored%29.svg.png"
                  height="50"
                  width="50"
                  alt="placeholder"
                />
              ),
              value: 'Windows',
            },
            {
              label: 'Red Hat',
              image: (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Red_Hat_logo.svg/2560px-Red_Hat_logo.svg.png"
                  height="50"
                  width="50"
                  alt="placeholder"
                />
              ),
              value: 'Red-Hat',
            },
            {
              label: 'SUSE-Linux',
              image: (
                <img
                  src="https://en.opensuse.org/images/c/cd/Button-colour.png"
                  height="50"
                  width="50"
                  alt="placeholder"
                />
              ),
              value: 'SUSE-Linux',
            },
            {
              label: 'Browse',
              image: (
                <img
                  src="https://www.freepnglogos.com/uploads/search-png/search-png-design-web-design-4.png"
                  height="50"
                  width="50"
                  alt="placeholder"
                />
              ),
              value: 'Browse',
            },
          ]}
        />
        <Box display="block" variant="code">
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
                // empty
                onChange={({ detail }) =>
                  setArchitecture(detail.selectedOption)
                }
                selectedOption={architecture}
                loadingText="loading"
                options={[
                  { label: '64-bit (x86)', value: '1' },
                  { label: '64-bit (ARM)', value: '2' },
                ]}
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
  const readOnlyWithErrors = false;
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

  const [loading, setLoading] = useState('finished');

  const handleRefresh = () => {
    setLoading('loading');
    setTimeout(() => {
      setLoading('finished');
    }, 1500);
  };
  return (
    <SpaceBetween size="s" direction="horizontal">
      <Grid
        gridDefinition={[
          { colspan: { l: 12, m: 12, default: 12 } },
          { colspan: { l: 8, m: 8, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
        ]}
      >
        {errorMessage && <Alert type="error">{errorMessage}</Alert>}

        {/* Main Panel */}
        <div>
          <SpaceBetween size="xl" direction="vertical">
            <Container
              id="distribution-panel"
              header={
                <Header
                  variant="h3"
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
                <FormField
                  label="Name"
                  stretch={true}
                  errorText={
                    errorMessage &&
                    errorMessage.includes(
                      'The launch template name is required'
                    ) &&
                    errorMessage
                  }
                >
                  <Input
                    value={name}
                    ariaRequired={true}
                    placeholder="Eg.Web Server"
                    onChange={(event) => setName(event.detail.value)}
                  />
                </FormField>
              </SpaceBetween>
            </Container>

            {/* Section */}

            <ExpandableSection
              headerAriaLabel="AMI"
              variant="container"
              headerText="Application and OS Images (Amazon Machine Image)"
              defaultExpanded
              headingTagOverride="h3"
              headerDescription="An AMI is a template that contains the software configuration (operating system, application server, and applications) required to launch your instance. Search or Browse for AMIs if you don’t see what you are looking for below"
              header={
                <Header
                  variant="h3"
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
                />
              }
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
                    onChange={({ detail }) =>
                      setActiveTabId(detail.activeTabId)
                    }
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
              headingTagOverride="h3"
              //     headerDescription="here"
            >
              <Select
                selectedOption={selectedOption}
                onChange={({ detail }) =>
                  setSelectedOption(detail.selectedOption)
                }
                options={[
                  { label: 't2.micro', value: '1', description: 't2.micro' },
                ]}
                ariaRequired
                expandToViewport
                filteringType="auto"
                loadingText="loading Instance"
                selectedAriaLabel="Selected"
                triggerVariant="option"
                statusType={loading}
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
                <FormField
                  label="key pair name- required"
                  errorText={
                    errorMessage.includes(
                      'Please choose a key pair or choose the option to proceed with a key pair'
                    ) && errorMessage
                  }
                >
                  <Select
                    selectedOption={keyPair}
                    onChange={({ detail }) => setKeyPair(detail.selectedOption)}
                    statusType={loading}
                    loadingText="Loading key pair"
                    options={[
                      {
                        label: 'Proceed without a key pair (Not Recommended',
                        value: '1',
                      },
                      {
                        label: 'test-key-pair-1',
                        value: '2',
                      },
                    ]}
                    empty="No key pair"
                    placeholder="Select"
                    filteringType="auto"
                    recoveryText="Retry"
                    selectedAriaLabel="Selected"
                  />
                </FormField>
                <div>
                  <SpaceBetween size={'xl'} direction="horizontal">
                    <Button iconName="refresh" onClick={handleRefresh} />
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
                <FormField
                  label="Network"
                  info={
                    <InfoLink
                      id="certificate-method-info-link"
                      onFollow={() =>
                        loadHelpPanelContent(
                          <HelpPanels
                            title="Network"
                            des="The VPC that you want to launch your instance into."
                          />
                        )
                      }
                      ariaLabel={'Information about SSL/TLS certificate.'}
                    />
                  }
                >
                  <Box>{NETWORK.network}</Box>
                </FormField>
                <FormField
                  label="Subnet"
                  info={
                    <InfoLink
                      id="certificate-method-info-link"
                      onFollow={() =>
                        loadHelpPanelContent(
                          <HelpPanels
                            title="Subnet"
                            des="The subnet in which the network interface is located."
                          />
                        )
                      }
                      ariaLabel={'Information about SSL/TLS certificate.'}
                    />
                  }
                >
                  <Box>{NETWORK.subnet}</Box>
                </FormField>
                <FormField
                  label="Auto-assign public IP"
                  info={
                    <InfoLink
                      id="certificate-method-info-link"
                      onFollow={() =>
                        loadHelpPanelContent(
                          <HelpPanels
                            title="Auto-assign public IP"
                            des="Whether a public IP address is automatically assigned to the primary network interface of the instance"
                          />
                        )
                      }
                      ariaLabel={'Information about SSL/TLS certificate.'}
                    />
                  }
                >
                  <Box>{NETWORK.PublicIP}</Box>
                </FormField>
                <Box>
                  <Header
                    variant="h3"
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
                      {
                        label: 'Select Existing security group',
                        value: 'item2',
                      },
                    ]}
                  />
                </Box>
                {tile == 'item1' && (
                  <div>
                    <SpaceBetween size="m">
                      <Box>
                        We'll create a new security group called '
                        <strong>launch-wizard-1</strong>' with the following
                        rules:
                      </Box>
                      <ColumnLayout columns={2}>
                        <Box>
                          <Checkbox
                            checked={checked}
                            onChange={({ detail }) =>
                              setChecked(detail.checked)
                            }
                            key={1}
                            description="Helps you connect to your instance"
                          >
                            Allow SSH traffic from
                          </Checkbox>
                          <Checkbox
                            key={2}
                            checked={checked}
                            onChange={({ detail }) =>
                              setChecked(detail.checked)
                            }
                            description="To set up an endpoint, for example when creating a web server"
                          >
                            Allow HTTPS traffic from the internet
                          </Checkbox>
                          <Checkbox
                            key={3}
                            description="To set up an endpoint, for example when creating a web server"
                            checked={checked}
                            onChange={({ detail }) =>
                              setChecked(detail.checked)
                            }
                          >
                            Allow HTTP traffic from the internet
                          </Checkbox>
                        </Box>
                        <Box>
                          <Select
                            selectedOption={ip}
                            onChange={({ detail }) =>
                              setIP(detail.selectedOption)
                            }
                            options={[
                              { label: '0.0.0.0', description: 'Anywhere' },
                              { label: 'Custom', value: '' },
                              {
                                label: 'My IP',
                                description: '52.201.134.131/32',
                              },
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
                        access your instance. We recommend setting security
                        group rules to allow access from known IP addresses
                        only.
                      </Alert>
                    </SpaceBetween>
                  </div>
                )}

                {tile == 'item2' && (
                  <FormField
                    label="Security groups"
                    stretch={true}
                    info={
                      <InfoLink
                        id="certificate-method-info-link"
                        onFollow={() =>
                          loadHelpPanelContent(
                            <HelpPanels
                              title="Security groups"
                              des="A security group is a set of firewall rules that controls the traffic to and from your instance. Inbound rules control the incoming traffic to your instance, and outbound rules control the outgoing traffic from your instance. You can assign one or more security groups to your instance. If you assign multiple security groups, all the rules are evaluated to control inbound and outbound traffic. If no value is specified the value of the source template will still be used. If the template value is not specified then the default API value will be used."
                            />
                          )
                        }
                        ariaLabel={'Information about SSL/TLS certificate.'}
                      />
                    }
                  >
                    <Select
                      selectedOption={selectedOption}
                      onChange={({ detail }) =>
                        setSelectedOption(detail.selectedOption)
                      }
                      options={[
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                        { label: 'Option 3', value: '3' },
                        { label: 'Option 4', value: '4' },
                        { label: 'Option 5', value: '5' },
                      ]}
                      selectedAriaLabel="Selected"
                      statusType={loading}
                      loadingText="Loading Resources"
                    />
                  </FormField>
                )}
              </SpaceBetween>
            </ExpandableSection>

            <ExpandableSection
              variant="container"
              headerText="Configure Storage"
              defaultExpanded
              className="header-panel"
            >
              <SpaceBetween size="xs" direction="vertical">
                <SpaceBetween size="xs" direction="horizontal">
                  <ColumnLayout columns={6}>
                    <Box>1x</Box>
                    <Input
                      inputMode="numeric"
                      type="number"
                      onChange={({ detail }) => setStorageNo(detail.value)}
                      value={storageNo}
                      placeholder="1"
                    />
                    <Box>GiB</Box>
                    <Select
                      selectedOption={storage}
                      onChange={({ detail }) =>
                        setStorage(detail.selectedOption)
                      }
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
                  </ColumnLayout>
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
                <Alert
                  onDismiss={() => setVisible(false)}
                  visible={visible}
                  dismissAriaLabel="Close alert"
                  dismissible
                >
                  Free tier eligible customers can get up to 30 GB of EBS
                  General Purpose (SSD) or Magnetic storage
                </Alert>
              </SpaceBetween>
            </ExpandableSection>

            <ExpandableSection
              variant="container"
              headerText="Advanced Settings"
            >
              Content Goes here
            </ExpandableSection>
          </SpaceBetween>
        </div>
        <div style={{ position: 'sticky', top: '70px' }}>
          {/* Summary Panel */}

          <div className="summary-panel">
            <SpaceBetween size="l" direction="vertical">
              <ExpandableSection
                variant="container"
                headerText="Summary"
                defaultExpanded
              >
                <ColumnLayout borders="horizontal">
                  <FormField
                    description="Number of instances to be launched."
                    label="Number of Instances"
                    errorText={
                      errorMessage &&
                      errorMessage.includes(
                        'Number of instances cannot be less 1'
                      ) &&
                      errorMessage
                    }
                  >
                    <Input
                      onChange={({ detail }) => setInstanceNo(detail.value)}
                      value={instanceNo}
                      inputMode="numeric"
                      type="number"
                    />
                  </FormField>
                  <SpaceBetween size={'xs'}>
                    {/* <ColumnLayout borders="horizontal" variant="text-grid"> */}
                    <Box variant="div">
                      <Link>Software Image (AMI)</Link>
                    </Box>
                    <Box variant="awsui-key-label">
                      {DATA.image ? DATA.image : '-'}
                    </Box>
                    <Box display="block" variant="code">
                      {DATA.ami ? DATA.ami : '-'}
                    </Box>
                    <Box variant="div">
                      <Link>Virtual server type (instance type)</Link>
                    </Box>
                    <Box variant="awsui-key-label">
                      {DATA.instance ? DATA.instance : '-'}
                    </Box>
                    <Box variant="div">
                      <Link>Firewall (Security Group)</Link>
                    </Box>
                    <Box variant="awsui-key-label">
                      {DATA.firewall ? DATA.firewall : '-'}
                    </Box>
                    <Box variant="div">
                      <Link>Storage (Volumes)</Link>
                    </Box>
                    <Box variant="awsui-key-label">
                      {DATA.vol ? DATA.vol : '-'}
                    </Box>
                    {/* </ColumnLayout> */}
                    <Alert
                      onDismiss={() => setVisible(false)}
                      visible={visible}
                      dismissAriaLabel="Close alert"
                      dismissible
                      header="Free tier:"
                    >
                      In your first year includes 750 hours of t2.micro (or
                      t3.micro in the Regions in which t2.micro is unavailable)
                      instance usage on free tier AMIs per month, 30 GiB of EBS
                      storage, 2 million IOs, 1 GB of snapshots, and 100 GB of
                      bandwidth to the internet.
                    </Alert>
                  </SpaceBetween>
                </ColumnLayout>
              </ExpandableSection>

              <SpaceBetween size="l" direction="vertical">
                <SpaceBetween size="xs" direction="horizontal">
                  <Button
                    ariaExpanded
                    variant="link"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>

                  <Button
                    ariaExpanded
                    onClick={createInstance}
                    iconName="add-plus"
                    loadingText="loading"
                    loading={loadings}
                  >
                    Launch Instance
                  </Button>
                </SpaceBetween>
              </SpaceBetween>
            </SpaceBetween>
          </div>
        </div>
      </Grid>
    </SpaceBetween>
  );
};

function LaunchEC2(props): JSX.Element {
  const appLayout = useRef();

  const [openNavigation, setOpenNavigation] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const { notifications, notifyInProgress } = useNotifications({
    resourceName: 'instance',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title="Launch an instance"
      info="Welcome to the new and improved launch experience - a quicker and easier way to launch an instance. We’d appreciate your feedback on this early release. We’ll use your feedback to continue improving the experience over the next few months."
      des="Amazon EC2 allows you to create virtual machines, or instances, that run on the AWS Cloud. Quickly get started by following the simple steps below."
      ul={[
        {
          text: 'Single page layout with summary side panel. Quickly get up and running with our new one-page design. See all your settings in one location. No need to navigate back and forth between steps to ensure your configuration is correct. Use the Summary panel for an overview and to easily navigate the page.',
        },
        {
          text: 'Improved AMI selector. New users: use the Quick Start AMI selector to select an operating system so that you can quickly launch an instance. Experienced users: the AMI selector displays your recently used AMIs and the AMIs that you own so that you can select the AMIs that you care about quickly and easily. You can still browse the full catalog to find new AMIs.',
        },
      ]}
      h5="Current improvements"
    />
  );
  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };

  useEffect(() => {
    document.title = 'Launch an EC2';
  }, []);

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        ref={appLayout}
        content={
          <>
            {!loading ? (
              <SpaceBetween size="l">
                <ContentLayout
                  header={
                    <DashboardHeader
                      loadHelpPanelContent={loadHelpPanelContent}
                      title="Launch an instance"
                      info="Welcome to the new and improved launch experience - a quicker and easier way to launch an instance. We’d appreciate your feedback on this early release. We’ll use your feedback to continue improving the experience over the next few months."
                      des="Amazon EC2 allows you to create virtual machines, or instances, that run on the AWS Cloud. Quickly get started by following the simple steps below."
                      ul={[
                        {
                          text: 'Single page layout with summary side panel. Quickly get up and running with our new one-page design. See all your settings in one location. No need to navigate back and forth between steps to ensure your configuration is correct. Use the Summary panel for an overview and to easily navigate the page.',
                        },
                        {
                          text: 'Improved AMI selector. New users: use the Quick Start AMI selector to select an operating system so that you can quickly launch an instance. Experienced users: the AMI selector displays your recently used AMIs and the AMIs that you own so that you can select the AMIs that you care about quickly and easily. You can still browse the full catalog to find new AMIs.',
                        },
                      ]}
                      h5="Current improvements"
                    />
                  }
                />
                <Content loadHelpPanelContent={loadHelpPanelContent} />
              </SpaceBetween>
            ) : (
              <Spinner size="large" className="spinner" />
            )}
          </>
        }
        breadcrumbs={<Breadcrumbs />}
        navigation={
          <Navigation
            activeHref="LaunchInstances"
            header={EC2Header}
            items={ec2navItems}
          />
        }
        toolsOpen={toolsOpen}
        tools={toolsContent}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        notifications={<Flashbar items={notifications} />}
        contentType="wizard"
        headerSelector="#h"
      />
      <AppFooter />
    </>
  );
}

export default LaunchEC2;
