import React from 'react';
import Box from '@cloudscape-design/components/box';
import classes from '../../app.module.scss';

export function AppFooter(): JSX.Element {
  return (
    <Box variant="div" id="f" className={classes.app_header_footer}>
      <Box
        variant="div"
        float="right"
        padding={{ left: 'm' }}
        color="inherit"
        fontWeight="light"
      >
        <span>Help</span>
      </Box>
    </Box>
  );
}
