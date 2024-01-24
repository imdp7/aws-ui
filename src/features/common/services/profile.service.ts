import { getProfileCache, setProfileCache } from '../utils/Cache';
import { url } from '../endpoints/url';
// Function to fetch profile from the server
const fetchProfileFromServer = async (sub) => {
  try {
    const response = await fetch(`${url.profile}/${sub}`);
    if (response.ok) {
      const profile = await response.json();
      return profile;
    } else {
      console.error('Failed to fetch profile from the server');
      return null;
    }
  } catch (error) {
    console.error('Error while fetching services:', error);
    return null;
  }
};

const getProfile = async (sub) => {
  const cachedProfile = getProfileCache();

  if (cachedProfile) {
    return cachedProfile;
  } else {
    const serverProfile = await fetchProfileFromServer(sub);

    if (serverProfile) {
      setProfileCache(serverProfile);
      return serverProfile;
    } else {
      return null;
    }
  }
};

export { getProfile };
