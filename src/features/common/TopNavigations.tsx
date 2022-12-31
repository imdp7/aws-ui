/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  TopNavigation,
  Input,
  Box,
  Toggle,
} from '@cloudscape-design/components';
import '../../App.css';
import classes from '../../app.module.scss';
import {
  applyMode,
  Mode,
  Density,
  applyDensity,
  disableMotion,
} from '@awsui/global-styles';
import { SpaceBetween } from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

interface State {
  user: string;
  signOut: () => void;
}

export const AppHeader = (props: State): JSX.Element => {
  const [mode, setMode] = useState(false);
  const [density, setDensity] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [redirectURL, setRedirectURL] = useState('');
  const navigate = useNavigate();

  if (redirectURL == 'signout') {
    navigate('/');
    props.signOut();
  }
  if (redirectURL == 'profile') {
    navigate('/account/profile');
  }
  return (
    <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
      <Box float="right" padding={{ right: 'xl', top: 'm' }} textAlign="right">
        <SpaceBetween size="s" direction="horizontal">
          <Toggle
            onChange={({ detail }) => {
              setMode(detail.checked);
              applyMode(detail.checked ? Mode.Dark : Mode.Light);
            }}
            checked={mode}
            className={classes.app_header_footer}
          >
            {mode ? 'Dark' : 'Light'}
          </Toggle>
          <Toggle
            onChange={({ detail }) => {
              setDensity(detail.checked);
              applyDensity(
                detail.checked ? Density.Comfortable : Density.Compact
              );
              disableMotion(density ? true : false);
            }}
            checked={density}
            className={classes.app_header_footer}
          >
            {density ? 'Comfort' : 'Compact'}
          </Toggle>
        </SpaceBetween>
      </Box>
      <TopNavigation
        identity={{
          href: '/',
          logo: {
            src: 'https://www.tamr.com/wp-content/uploads/2020/07/Logo-AWS.png',
            alt: 'Service',
          },
        }}
        utilities={[
          {
            type: 'button',
            text: 'Link',
            href: 'https://example.com/',
            external: true,
            externalIconAriaLabel: ' (opens in a new tab)',
          },
          {
            type: 'button',
            iconName: 'notification',
            title: 'Notifications',
            ariaLabel: 'Notifications (unread)',
            badge: true,
            disableUtilityCollapse: false,
          },
          {
            type: 'menu-dropdown',
            iconName: 'settings',
            ariaLabel: 'Settings',
            title: 'Settings',
            items: [
              {
                id: 'settings-org',
                text: 'Organizational settings',
              },
              {
                id: 'settings-project',
                text: 'Project settings',
              },
            ],
          },
          {
            type: 'menu-dropdown',
            iconName: 'user-profile',
            ariaLabel: 'Available Zones',
            text: 'N. Virginia',
            title: 'Zones',
            items: [
              {
                id: 'us-east-1',
                text: 'US East (N. Virginia)',
              },
              {
                id: 'us-east-2',
                text: 'US East Ohio)',
              },
              {
                id: 'us-west-1',
                text: 'US West (N. California)',
              },
              {
                id: 'us-west-2',
                text: 'US West (Oregon)',
              },
              {
                id: 'us-East-1',
                text: 'US East (N. Virginia)',
              },
              {
                id: 'us-East-1',
                text: 'US East (N. Virginia)',
              },
              {
                id: 'us-East-1',
                text: 'US East (N. Virginia)',
              },
              {
                id: 'us-East-1',
                text: 'US East (N. Virginia)',
              },
              {
                id: 'us-East-1',
                text: 'US East (N. Virginia)',
              },
              {
                id: 'settings-project',
                text: 'Project settings',
              },
            ],
          },
          {
            type: 'menu-dropdown',
            text: `${props.user}`,
            // description: 'Account ID: 6137-4001-7922',
            iconName: 'user-profile',
            onItemClick: (evt) => {
              setRedirectURL(evt.detail.id);
            },
            items: [
              {
                id: 'account',
                text: 'Account ID: 6107-4191-7922',
                disabled: true,
              },
              { id: 'profile', text: 'Profile' },
              { id: 'preferences', text: 'Preferences' },
              { id: 'security', text: 'Security' },
              {
                id: 'support-group',
                text: 'Support',
                items: [
                  {
                    id: 'documentation',
                    text: 'Documentation',
                    href: '#',
                    external: true,
                    externalIconAriaLabel: ' (opens in new tab)',
                  },
                  { id: 'support', text: 'Support' },
                  {
                    id: 'feedback',
                    text: 'Feedback',
                    href: '#',
                    external: true,
                    externalIconAriaLabel: ' (opens in new tab)',
                  },
                ],
              },
              {
                id: 'signout',
                text: 'Sign out',
              },
            ],
          },
        ]}
        i18nStrings={{
          searchIconAriaLabel: 'Search',
          searchDismissIconAriaLabel: 'Close search',
          overflowMenuTriggerText: 'More',
          overflowMenuTitleText: 'All',
          overflowMenuBackIconAriaLabel: 'Back',
          overflowMenuDismissIconAriaLabel: 'Close menu',
        }}
        search={
          <Input
            ariaLabel="Input field"
            value={searchValue}
            type="search"
            placeholder="Search"
            onChange={({ detail }) => setSearchValue(detail.value)}
          />
        }
      />
    </div>
  );
};
