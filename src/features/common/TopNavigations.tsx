/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { TopNavigation, Input, Modal } from '@cloudscape-design/components';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import PreferencesModal from '../../components/PreferenceModal';
import { getRegions } from './services/regionsService';
interface State {
  user: string;
  signOut: () => void;
}

const ec2_region = [
  {
    id: 'US East (N. Virginia)',
    text: 'US East (N. Virginia)',
  },
];

const s3_region = [
  {
    id: 'Global',
    text: 'Global',
  },
];

export const AppHeader = (props: State): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');
  const [redirectURL, setRedirectURL] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [selection, setSelection] = React.useState(ec2_region || s3_region);
  const [regions, setRegions] = useState([]); // State to store regions

  const navigate = useNavigate();

  if (redirectURL == 'signout') {
    navigate('/');
    props.signOut();
  } else if (redirectURL == 'profile') {
    navigate('/account/profile');
  }

  const onFollowHandler = (e) => {
    e.preventDefault();
    e.detail.id === 'preferences' ? setVisible(true) : null;
  };

  // Fetch regions when the component mounts
  React.useEffect(() => {
    const fetchRegions = async () => {
      const regionsData = await getRegions();
      if (regionsData) {
        setRegions(regionsData[0]?.regions);
      }
    };

    fetchRegions();
  }, []); // Empty dependency array ensures it only runs once when the component mounts

  return (
    <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
      <Modal
        onDismiss={() => setVisible(false)}
        visible={visible}
        closeAriaLabel="Close modal"
        header="Preferences"
        size="medium"
      >
        <PreferencesModal />
      </Modal>
      <TopNavigation
        identity={{
          href: '/',
          logo: {
            src: 'https://www.awsgearshop.com/media/logo/stores/4/aws_corporate_logo.png',
            alt: 'Service',
          },
        }}
        utilities={[
          {
            type: 'button',
            iconName: 'keyboard',
            title: 'Terminal',
            ariaLabel: 'Terminal',
            disableUtilityCollapse: false,
          },
          {
            type: 'menu-dropdown',
            iconName: 'notification',
            title: 'Notifications',
            ariaLabel: 'Notifications (unread)',
            badge: true,
            disableUtilityCollapse: false,
            items: [
              {
                id: 'open_issues',
                text: 'Open Issues',
              },
              {
                id: 'schedule_changes',
                text: 'Schedule Chages',
              },
              {
                id: 'other_notifications',
                text: 'Other Notifications',
              },
            ],
          },
          {
            type: 'menu-dropdown',
            iconName: 'settings',
            ariaLabel: 'Settings',
            title: 'Settings',
            // onItemClick: (evt) => {
            //   onFollowHandler(evt);
            // },
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
            ariaLabel: 'Available Zones',
            disableUtilityCollapse: false,
            text: `${selection[0].text || selection}`,
            title: 'Zones',
            onItemClick: (e) => {
              e.preventDefault();
              setSelection(({ detail }) => e.detail.id);
            },
            items: regions,
          },
          {
            type: 'menu-dropdown',
            text: `${props.user}`,
            iconName: 'user-profile',
            onItemClick: (evt) => {
              setRedirectURL(evt.detail.id);
              onFollowHandler(evt);
            },
            items: [
              {
                id: 'account',
                disabled: true,
                items: [
                  {
                    id: 'accountID',
                    text: 'Account ID: 6107-4191-7922',
                  },
                ],
              },
              { id: 'profile', text: 'Account' },
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
