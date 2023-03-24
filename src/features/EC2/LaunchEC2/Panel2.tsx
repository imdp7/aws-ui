/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Button,
  ExpandableSection,
  SpaceBetween,
  Input,
  FormField,
  Link,
  ColumnLayout,
  Box,
  Alert,
  Flashbar,
  Spinner,
} from '@awsui/components-react';
import { useNavigate } from 'react-router-dom';

const DATA = {
  image: 'Amazon Linux 2 Kernel 5.10 AMI',
  ami: 'ami-0b0dcb5067f052a63',
  instance: 't2.micro',
  firewall: 'New security group',
  vol: '1 volume(s) - 8 GiB',
  status: true,
};

function Panel2(props) {
  const [instanceNo, setInstanceNo] = useState('1');
  const [visible, setVisible] = useState(true);
  const [btn, setBtn] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!loading ? (
        <div className="summary-panel">
          <SpaceBetween size="l" direction="vertical">
            <ExpandableSection
              variant="container"
              headerText="Summary"
              defaultExpanded
            >
              <ColumnLayout borders="horizontal">
                <FormField
                  //     description="This is a description."
                  label="Number of Instances"
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
                  onClick={props.createInstance}
                  iconName="add-plus"
                  loadingText="loading"
                >
                  Launch Instance
                </Button>
              </SpaceBetween>
            </SpaceBetween>
          </SpaceBetween>
        </div>
      ) : (
        <Spinner size="large" className="spinner" />
      )}
    </>
  );
}

export default Panel2;
