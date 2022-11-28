/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { TopNavigation, Input } from '@awsui/components-react';

export const AppHeader = (): JSX.Element => {
  const [value, setValue] = useState('');
  return (
    <div>
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
            text: 'Darshan Patel',
            description: 'email@example.com',
            iconName: 'user-profile',
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
              { id: 'signout', text: 'Sign out' },
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
        // search={<Input type="search" placeholder="Search" ariaLabel="Search" />}
      />
    </div>
  );
};
