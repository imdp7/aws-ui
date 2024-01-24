/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  TopNavigation,
  Modal,
  Autosuggest,
} from '@cloudscape-design/components';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import PreferencesModal from '../../components/PreferenceModal';
import { getRegions } from './services/regionsService';
import { setUserCache, getUserCache, getRegionsCache } from './utils/Cache';
import { getServices } from './services/allServices';
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
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [selection, setSelection] = React.useState(ec2_region || s3_region);
  const [regions, setRegions] = useState([]); // State to store regions

  const navigate = useNavigate();

  const logOut = () => {
    navigate('/');
    props.signOut();
  };

  const handleItemClick = (evt) => {
    switch (evt.detail.id) {
      case 'signout':
        logOut();
        break;
      case 'profile':
        navigate('/account/profile');
        break;
      case 'userSettings':
        navigate('/settings/home');
        break;
      case 'preferences':
        setVisible(true);
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    const fetchRegions = async () => {
      const cacheRegions = await getRegionsCache();
      if (cacheRegions) {
        setRegions(cacheRegions[0].regions);
      } else {
        const regionsData = await getRegions();
        if (regionsData) {
          setRegions(regionsData[0]?.regions);
        }
      }
    };
    const fetchServices = async () => {
      const data = await getServices();
      const updatedOptions = [
        {
          label: 'Services',
          options: data.map((option) => ({
            value: option?.title,
            label: option?.title,
            iconUrl: option?.img,
            link: option?.link,
          })),
        },
      ];
      setOptions(updatedOptions);
    };
    fetchRegions();
    fetchServices();
  }, []);

  const updateRegion = async (selectedRegion) => {
    const existingData = await getUserCache();
    setUserCache({ ...existingData, region: selectedRegion });
    setSelection(selectedRegion);
  };

  const handleOnSelect = (evt) => {
    navigate(evt.detail.selectedOption.link);
  };

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
            onItemClick: (evt) => {
              handleItemClick(evt);
            },
            items: [
              {
                id: 'settings-org',
                text: 'Organizational settings',
              },
              {
                id: 'settings-project',
                text: 'Project settings',
              },
              { id: 'userSettings', text: 'More User Settings' },
            ],
          },
          {
            type: 'menu-dropdown',
            ariaLabel: 'Available Zones',
            disableUtilityCollapse: false,
            text: `${selection[0].text || selection}`,
            title: 'Zones',
            onItemClick: (e) => updateRegion(e.detail.id),
            items: regions,
          },
          {
            type: 'menu-dropdown',
            text: `${props.user}`,
            iconName: 'user-profile',
            onItemClick: (evt) => {
              handleItemClick(evt);
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
          <Autosuggest
            onChange={({ detail }) => setInputValue(detail.value)}
            value={inputValue.toUpperCase()}
            options={options}
            ariaLabel="Autosuggest example with suggestions"
            placeholder="Search"
            empty="No matches found"
            loadingText="Loading"
            recoveryText="Retry"
            onSelect={(evt) => handleOnSelect(evt)}
          />
        }
      />
    </div>
  );
};
