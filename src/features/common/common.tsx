import React from 'react';
import { Box, Link, LinkProps } from '@cloudscape-design/components';
import { CancelableEventHandler } from '@cloudscape-design/components/internal/events';

export interface InfoLinkProps {
  onFollow: CancelableEventHandler<LinkProps.FollowDetail>;
}

export const InfoLink = ({ onFollow }: InfoLinkProps): JSX.Element => {
  return (
    <Link variant="info" onFollow={onFollow}>
      Info
    </Link>
  );
};

interface ValueWithLabelProps {
  label: string;
  children: JSX.Element | string;
}
export const ValueWithLabel = ({
  label,
  children,
}: ValueWithLabelProps): JSX.Element => {
  return (
    <div>
      <Box variant="awsui-key-label">{label}</Box>
      <div>{children}</div>
    </div>
  );
};
