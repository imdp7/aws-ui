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
import { applyMode, Mode } from '@awsui/global-styles';

interface State {
  user: string;
  signOut: () => void;
}

export const AppHeader = (props: State): JSX.Element => {
  const [checked, setChecked] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  return (
    <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
      <Box float="right" padding={{ right: 'xl', top: 'm' }} textAlign="right">
        <Toggle
          onChange={({ detail }) => {
            setChecked(detail.checked);
            applyMode(detail.checked ? Mode.Dark : Mode.Light);
          }}
          checked={checked}
          className={classes.app_header_footer}
        >
          {checked ? 'Dark' : 'Light'}
        </Toggle>
      </Box>
      <TopNavigation
        identity={{
          href: '/',
          title: 'AWS',
          logo: {
            src: 'https://icones.pro/wp-content/uploads/2021/08/logo-amazon-orange.png',
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
            description: `${props.user}`,
            iconName: 'user-profile',
            onItemClick: () => {
              props.signOut();
            },
            items: [
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
