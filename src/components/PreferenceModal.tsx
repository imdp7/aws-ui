import React, { useState, useEffect } from 'react';
import {
  SpaceBetween,
  ColumnLayout,
  FormField,
  Toggle,
  Box,
} from '@cloudscape-design/components';
import {
  applyMode,
  applyDensity,
  disableMotion,
  Mode,
  Density,
} from '@cloudscape-design/global-styles';
import { getUserCache, setUserCache } from '../features/common/utils/Cache';
import { url } from '../features/common/endpoints/url';

const PreferencesModal = () => {
  const [mode, setMode] = useState(Mode.Light);
  const [density, setDensity] = useState(Density.Comfortable);
  const [motion, setMotion] = useState(false);
  const [cacheData, setCacheData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserCache();

        // Set initial state based on cacheData
        if (data && data.preferences) {
          setCacheData(data);
          setMode(data.preferences.mode || mode);
          setDensity(data.preferences.density || density);
          setMotion(data.preferences.motion || motion);
        }
      } catch (error) {
        console.error('Error fetching user cache:', error);
      }
    };

    fetchData();
  }, []);

  const updateServerPreferences = async (sub, preferences) => {
    try {
      const response = await fetch(`${url.accounts}/${sub}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferences,
        }),
      });

      if (response.ok) {
        updateLocalCache(sub, preferences);
      } else {
        console.error(`Failed to update account with ID ${sub}`);
      }
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  const updateLocalCache = (sub, preferences) => {
    const currentCache = getUserCache();
    console.log(`Updating local cache`, currentCache);
    if (currentCache) {
      const updatedCache = {
        ...currentCache,
        preferences: {
          ...currentCache.preferences, // Keep existing preferences unchanged
          ...preferences, // Update only the changed preferences
        },
      };

      setUserCache(updatedCache);
    }
  };

  const handleModeChange = async ({ detail }) => {
    const newMode: Mode = detail.checked ? Mode.Dark : Mode.Light;
    setMode(newMode);
    applyMode(newMode);
    await updateServerPreferences(cacheData.user.sub, { mode: newMode });
  };

  const handleDensityChange = async ({ detail }) => {
    const newDensity: Density = detail.checked
      ? Density.Comfortable
      : Density.Compact;
    setDensity(newDensity);
    applyDensity(density);
    await updateServerPreferences(cacheData.user.sub, { density: newDensity });
  };

  const handleMotionChange = async ({ detail }) => {
    setMotion(detail.checked);
    disableMotion(motion);
    await updateServerPreferences(cacheData.user.sub, {
      motion: detail.checked,
    });
  };
  return (
    <SpaceBetween size="s" direction="vertical">
      <ColumnLayout columns={3}>
        <FormField description="Light or Dark." label="Theme Mode">
          <Toggle onChange={handleModeChange} checked={mode === 'Dark'}>
            <Box>{mode === 'Dark' ? 'Dark' : 'Light'}</Box>
          </Toggle>
        </FormField>
        <FormField description="Comfort or Compact." label="Density">
          <Toggle
            onChange={handleDensityChange}
            checked={density === 'Comfortable'}
          >
            <Box>{density === 'Comfortable' ? 'Comfort' : 'Compact'}</Box>
          </Toggle>
        </FormField>
        <FormField description="True or False." label="Motion">
          <Toggle onChange={handleMotionChange} checked={motion}>
            <Box>{motion ? 'True' : 'False'}</Box>
          </Toggle>
        </FormField>
      </ColumnLayout>
    </SpaceBetween>
  );
};

export default PreferencesModal;
