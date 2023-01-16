/* eslint-disable react/prop-types */
import React from 'react';
import {
  Grid,
  Header,
  Container,
  Box,
  SpaceBetween,
  ColumnLayout,
  Link,
} from '@cloudscape-design/components';
import YouTube from 'react-youtube';

const opts = {
  width: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

export const Content = (props) => {
  return (
    <Grid
      gridDefinition={[
        { colspan: { l: 8, m: 8, default: 12 } },
        { colspan: { l: 4, m: 4, default: 12 } },
        { colspan: { l: 8, m: 8, default: 12 } },
        { colspan: { l: 4, m: 4, default: 12 } },
        { colspan: { l: 8, m: 8, default: 12 } },
        { colspan: { l: 3, m: 3, default: 12 } },
      ]}
    >
      <Container header={<Header variant="h2">How it works</Header>}>
        {props.image ? (
          <img width="100%" src={`${props.image}`} />
        ) : (
          <div>
            <YouTube videoId="_I14_sXHO8U" opts={opts} />
            <Box variant="p">
              Customers of all sizes and industries can store and protect any
              amount of data for virtually any use case, such as data lakes,
              cloud-native applications, and mobile apps. With cost-effective
              storage classes and easy-to-use management features, you can
              optimize costs, organize data, and configure fine-tuned access
              controls to meet specific business, organizational, and compliance
              requirements.
            </Box>
          </div>
        )}
      </Container>
      <Container header={<Header variant="h2">Learn more</Header>}>
        <div>
          <Box variant="h4">Secure data integration</Box>
          With Amazon AppFlow, your flows are always encrypted. You can even
          choose your own encryption keys. You can also create private flows
          between AWS services and SaaS applications that have integrated with
          AWS PrivateLink. Amazon AppFlow will automatically route private flows
          over the AWS infrastructure without exposing the data to the public
          internet, reducing the risk of sensitive data leakage, With Amazon
          AppFlow, your flows are always encrypted. You can even choose your own
          encryption keys. You can also create private flows between AWS
          services and SaaS applications that have integrated with AWS
          PrivateLink. Amazon AppFlow will automatically route private flows
          over the AWS infrastructure without exposing the data to the public
          internet, reducing the risk of sensitive data leakage.
        </div>
        <Link external>Learn more about AWS PrivateLink </Link>
      </Container>
      <Container header={<Header variant="h2">Benefits and features</Header>}>
        <SpaceBetween size="m">
          <ColumnLayout columns={2} variant="text-grid">
            <div>
              <Box variant="h4">Speed and automation</Box>
              Use Amazon AppFlow to integrate applications in a few minutes – no
              more waiting days or weeks to code custom connectors. Features
              like data pagination, error logging, and network connection
              retries are included by default so there’s no coding or
              management. With Amazon Appflow, data flow quality is built in,
              and you can enrich the flow of data through masking, mapping,
              merging, filtering, and validation as part of the flow itself.
            </div>
            <div>
              <Box variant="h4">Security and privacy</Box>
              All data flowing through Amazon AppFlow is encrypted at rest and
              in transit. You can encrypt data with AWS keys, or bring your own
              custom keys. With Amazon AppFlow, you can use your existing
              identity and access management policies to enforce fine-grained
              permissions, rather than creating new policies. For applications
              that have integrated with AWS PrivateLink, data is secured from
              the public internet by default.
            </div>
            <div>
              <Box variant="h4">Scalability</Box>
              Amazon AppFlow easily scales up without the need to plan or
              provision resources, so you can move large volumes of data without
              breaking it down into multiple batches. Using Amazon AppFlow, you
              can easily transfer millions of Salesforce records or Zendesk
              tickets - all while running a single flow.
            </div>
            <div>
              <Box variant="h4">Reliability</Box>
              Amazon AppFlow is built with a highly available architecture to
              prevent single points of failure. Amazon AppFlow takes advantage
              of AWS scaling, monitoring, auditing, and billing features.
            </div>
          </ColumnLayout>
        </SpaceBetween>
      </Container>
      <Container header={<Header variant="h2">Pricing</Header>}>
        <div>{props.pricing}</div> <Link external>Learn More</Link>
      </Container>
      {props.useCase == true ? (
        <Container header={<Header variant="h2">Use cases</Header>}>
          <SpaceBetween size="m">
            <ColumnLayout columns={2} variant="text-grid">
              <div>
                <Box variant="h4">Backup and restore</Box>
                Build scalable, durable, and secure backup and restore solutions
                to augment or replace existing on-premises capabilities with S3
                and other AWS services, such as Amazon S3 Glacier, Amazon
                Elastic File System (Amazon EFS), and Amazon Elastic Block Store
                (Amazon EBS).
              </div>
              <div>
                <Box variant="h4">Disaster recovery</Box>
                Protect critical data, applications, and IT systems that are
                running in the AWS Cloud or your on-premises environment without
                incurring the expense of a second physical site.
              </div>
              <div>
                <Box variant="h4">Archive</Box>
                Retire physical infrastructure, and archive data with S3 storage
                classes that retain objects long-term at the lowest rates.
              </div>
              <div>
                <Box variant="h4">Data lakes and big data analytics</Box>
                Accelerate innovation by creating a data lake in S3. Extract
                valuable insights using query-in-place, analytics, and machine
                learning features.
              </div>
              <div>
                <Box variant="h4">Hybrid cloud storage</Box>
                Create a seamless connection between on-premises applications
                and S3 with AWS Storage Gateway. Reduce your data center
                footprint and use the scale, reliability, and durability of AWS
                and its innovative machine learning and analytics capabilities.
              </div>
              <div>
                <Box variant="h4">Cloud-native application data</Box>
                Build fast, cost-effective mobile and internet-based
                applications by using AWS services and S3 to store production
                data.
              </div>
            </ColumnLayout>
          </SpaceBetween>
        </Container>
      ) : null}
      <Container
        header={
          <Header variant="h2">
            Common tasks
            <Link external />
          </Header>
        }
      >
        <ColumnLayout variant="default" borders="horizontal">
          <div>Get started with S3</div>
          <div>Create a bucket</div>
          <div>Upload an object</div>
          <div>Download an object</div>
          <div>Host a static website</div>
        </ColumnLayout>{' '}
      </Container>
    </Grid>
  );
};
