import React from 'react';
import {
  Box,
  ColumnLayout,
  Container,
  Link,
  LinkProps,
} from '@awsui/components-react';
import { useNavigate } from 'react-router-dom';
import classes from './home.module.scss';

const HomeHeader = (): JSX.Element => {
  return (
    <Box
      margin={{ bottom: 'l' }}
      padding={{ horizontal: 'xxxl', vertical: 'l' }}
      className={classes.home_header}
    >
      <Box
        variant="h1"
        fontWeight="heavy"
        padding="n"
        fontSize="display-l"
        color="inherit"
      >
        AWS App
      </Box>
      <Box
        variant="p"
        fontWeight="light"
        color="inherit"
        className={classes.home_header_secondary}
      >
        Descriptive sentence about the impressive AWS UI App
      </Box>
    </Box>
  );
};

const HomeFeatures = (): JSX.Element => {
  const navigate = useNavigate();

  const defaultOnFollowHandler = (
    event: CustomEvent<LinkProps.FollowDetail>
  ): void => {
    navigate(event.detail.href as string);
    event.preventDefault();
  };

  return (
    <div>
      <Box variant="h1" tagOverride="h2" padding={{ bottom: 's', top: 'l' }}>
        Benefits and features
      </Box>
      <Container>
        <ColumnLayout columns={2} variant="text-grid">
          <div>
            <Box variant="h3" padding={{ top: 'n' }}>
              EC2 Instance
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/ec2_instance"
                onFollow={defaultOnFollowHandler}
              >
                EC2 Instance
              </Link>{' '}
            </Box>
          </div>
          <div>
            <Box variant="h3" padding={{ top: 'n' }}>
              S3
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/s3"
                onFollow={defaultOnFollowHandler}
              >
                S3
              </Link>{' '}
            </Box>
          </div>
          <div>
            <Box variant="h3" padding={{ top: 'n' }}>
              CloudFront
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/cloudfront"
                onFollow={defaultOnFollowHandler}
              >
                CloudFront
              </Link>{' '}
            </Box>
          </div>
          <div>
            <Box variant="h3" padding={{ top: 'n' }}>
              SQS
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/sqs"
                onFollow={defaultOnFollowHandler}
              >
                SQS
              </Link>{' '}
            </Box>
          </div>
          <div>
            <Box variant="h3" padding={{ top: 'n' }}>
              Amazon Connect
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/connect"
                onFollow={defaultOnFollowHandler}
              >
                Amazon Connect
              </Link>{' '}
            </Box>
          </div>
          <div>
            <Box variant="h3" padding={{ top: 'n' }}>
              VPC
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/vpc"
                onFollow={defaultOnFollowHandler}
              >
                VPC
              </Link>{' '}
            </Box>
          </div>
          <div>
            <Box variant="h3" padding={{ top: 'n' }}>
              IAM
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/iam"
                onFollow={defaultOnFollowHandler}
              >
                IAM
              </Link>{' '}
            </Box>
          </div>
          <div>
            <Box variant="h3" padding={{ top: 'n' }}>
              Amazon Rekognition
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/rekognition"
                onFollow={defaultOnFollowHandler}
              >
                Amazon Rekognition
              </Link>{' '}
            </Box>
          </div>
          <div>
            <Box variant="h3" padding={{ top: 'n' }}>
              Cloudshell
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/cloudshell"
                onFollow={defaultOnFollowHandler}
              >
                Cloudshell
              </Link>{' '}
            </Box>
          </div>
        </ColumnLayout>
      </Container>
    </div>
  );
};

export const Home = (): JSX.Element => {
  return (
    <>
      <HomeHeader />

      <Box margin={{ bottom: 'l' }} padding={{ horizontal: 'xxxl' }}>
        <Box padding={{ horizontal: 'xl' }}>
          <HomeFeatures />
        </Box>
      </Box>
    </>
  );
};
