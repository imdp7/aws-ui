import { getRegionsCache, setRegionsCache } from '../utils/Cache';
import { url } from '../endpoints/url';
// Function to fetch regions from the server
const fetchRegionsFromServer = async () => {
  try {
    const response = await fetch(url.regions);
    if (response.ok) {
      const regions = await response.json();
      return regions;
    } else {
      console.error('Failed to fetch regions from the server');
      return null;
    }
  } catch (error) {
    console.error('Error while fetching regions:', error);
    return null;
  }
};

// Function to fetch regions, store them locally, and return the array
const getRegions = async () => {
  // Try to get regions from cache
  const cachedRegions = getRegionsCache();

  if (cachedRegions) {
    // If regions are available in cache, return them
    return cachedRegions;
  } else {
    // If regions are not available in cache, fetch from the server
    const serverRegions = await fetchRegionsFromServer();

    // If serverRegions is not null, store them in cache and return
    if (serverRegions) {
      setRegionsCache(serverRegions);
      return serverRegions;
    } else {
      // If serverRegions is null, return null
      return null;
    }
  }
};

export { getRegions };
