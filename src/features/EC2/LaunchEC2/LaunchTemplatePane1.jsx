import React, { useState } from 'react';
import {
  Container,
  SpaceBetween,
  Header,
  FormField,
  Input,
  Checkbox,
  Tabs,
  ColumnLayout,
  Autosuggest,
  Link,
  Button,
  Select,
  Box,
  Tiles,
  ExpandableSection,
} from '@awsui/components-react';
import { InfoLink } from '../commons/common-components';
import { HelpPanels } from '../components/header';

const Name = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ASG, setASG] = useState(false);

  return (
    <Container
      header={
        <Header variant="h2">Launch template name and description</Header>
      }
    >
      <SpaceBetween size="s">
        <FormField
          label="Launch template name - required"
          constraintText="Must be unique to this account. Max 128 chars. No spaces or special characters like '&', '*', '@'."
        >
          <Input
            value={name}
            onChange={({ detail }) => setName(detail.value)}
            placeholder="My Template"
          />
        </FormField>
        <FormField
          label="Template version description"
          constraintText="Max 255 chars"
        >
          <Input
            value={description}
            onChange={({ detail }) => setDescription(detail.value)}
            placeholder="A prod webserver for MyApp"
          />
        </FormField>
        <FormField
          label="Auto Scaling guidance"
          description="Select this if you intend to use this template with EC2 Auto Scaling"
          info={<Link>Info</Link>}
        >
          <Checkbox
            checked={ASG}
            onChange={({ detail }) => setASG(detail.checked)}
          >
            Select this if you intend to use this template with EC2 Auto Scaling
          </Checkbox>
        </FormField>
      </SpaceBetween>
    </Container>
  );
};

const Contents = () => {
  const [AMI, setAMI] = useState('');
  const [activeTabId, setActiveTabId] = useState('second');
  const [tiles, setTiles] = useState('Amazon');
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
      </SpaceBetween>
    );
  };
  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Specify the details of your launch template below. Leaving a field blank will result in the field not being included in the launch template."
        >
          Launch template contents
        </Header>
      }
    >
      <ExpandableSection
        defaultExpanded
        headerText="Application and OS Images (Amazon Machine Image)"
        headingTagOverride="h4"
        variant="footer"
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
    </Container>
  );
};

const Instances = () => {
  const [selectedOption, setSelectedOption] = useState({
    value: `Don't include in launch template`,
  });
  const [loading, setLoading] = useState('finished');

  const handleRefresh = () => {
    setLoading('loading');
    setTimeout(() => {
      setLoading('finished');
    }, 1500);
    return () => clearTimeout();
  };
  return (
    <Container header={<Header variant="h2">Instance type</Header>}>
      <ColumnLayout columns={2} variant="text-grid">
        <FormField label="Instance type">
          <Select
            selectedOption={selectedOption}
            empty="No instances"
            onChange={({ detail }) => setSelectedOption(detail.selectedOption)}
            options={[
              {
                value: `Don't include in launch template`,
                label: `Don't include in launch template`,
              },
              {
                value: 't1.micro',
                label: 't1.micro',
                description: 't1.micro',
              },
              {
                value: 't2.nano',
                label: 't2.nano',
              },
              {
                value: 't2.micro',
                label: 't2.micro',
              },
            ]}
          />
        </FormField>
        <SpaceBetween size={'xl'} direction="horizontal">
          <Button iconName="refresh" onClick={handleRefresh} />
          <Link>Compare instance type</Link>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
};

const KeyPair = ({ loadHelpPanelContent }) => {
  const [KeyValue, setKeyValue] = useState('');
  const [loading, setLoading] = useState('finished');

  const handleRefresh = () => {
    setLoading('loading');
    setTimeout(() => {
      setLoading('finished');
    }, 1500);
  };

  return (
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
          Key pair (login)
        </Header>
      }
    >
      <ColumnLayout columns={2} variant="text-grid">
        <Select
          selectedOption={KeyValue}
          onChange={({ detail }) => setKeyValue(detail.selectedOption)}
          statusType={loading}
          loadingText="Loading Resources"
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
            { label: 'Option 4', value: '4' },
            { label: 'Option 5', value: '5' },
          ]}
          empty="No options"
          placeholder="Choose an option"
          selectedAriaLabel="Selected"
        />
        <div>
          <SpaceBetween size={'xl'} direction="horizontal">
            <Button iconName="refresh" onClick={handleRefresh} />
            <Link>Add new Key Value Pair</Link>
          </SpaceBetween>
        </div>
      </ColumnLayout>
    </Container>
  );
};
function LaunchTemplatePane1({ loadHelpPanelContent }) {
  return (
    <SpaceBetween size="m">
      <Name loadHelpPanelContent={loadHelpPanelContent} />
      <Contents loadHelpPanelContent={loadHelpPanelContent} />
      <Instances loadHelpPanelContent={loadHelpPanelContent} />
      <KeyPair loadHelpPanelContent={loadHelpPanelContent} />
    </SpaceBetween>
  );
}

export default LaunchTemplatePane1;
