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
        AWS UI Vite App
      </Box>
      <Box
        variant="p"
        fontWeight="light"
        color="inherit"
        className={classes.home_header_secondary}
      >
        Descriptive sentence about the impressive AWS UI Vite App
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
              Feature 1
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/feature1"
                onFollow={defaultOnFollowHandler}
              >
                Feature 1
              </Link>{' '}
            </Box>
          </div>
          <div>
            <Box variant="h3" padding={{ top: 'n' }}>
              Feature 2
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/feature2"
                onFollow={defaultOnFollowHandler}
              >
                Feature 2
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
