import React from 'react';
import { Box, Link, LinkProps } from '@awsui/components-react';
import { CancelableEventHandler } from '@awsui/components-react/internal/events';

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
