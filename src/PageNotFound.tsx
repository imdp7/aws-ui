/* eslint-disable react/no-unescaped-entities */
import React, { Fragment } from 'react';
import { AppLayout, Box, SpaceBetween } from '@cloudscape-design/components';
import { AppHeader } from './features/common/TopNavigations';
import { Container } from '@cloudscape-design/components';

function NotFound() {
  return (
    <SpaceBetween size="l">
      <Box></Box>
      <Container variant="stacked">
        <SpaceBetween size="xxl">
          <Box
            color="text-status-inactive"
            display="block"
            fontSize="heading-xl"
            fontWeight="bold"
            textAlign="center"
            variant="awsui-value-large"
          >
            The page you are looking doesn't exist.
          </Box>
          <Box
            color="text-status-info"
            display="block"
            fontSize="display-l"
            fontWeight="bold"
            textAlign="center"
            variant="awsui-value-large"
          >
            Page not Found
          </Box>
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}
function PageNotFound() {
  return (
    <div>
      <AppHeader />
      <AppLayout
        content={<NotFound />}
        navigationHide={true}
        contentType="wizard"
        disableBodyScroll={true}
      />
    </div>
  );
}

export default PageNotFound;
