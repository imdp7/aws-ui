import { getServicesCache, setServicesCache } from '../utils/Cache';
import { url } from '../endpoints/url';
// Function to fetch regions from the server
const fetchServicesFromServer = async () => {
  try {
    const response = await fetch(url.services);
    if (response.ok) {
      const services = await response.json();
      return services;
    } else {
      console.error('Failed to fetch services from the server');
      return null;
    }
  } catch (error) {
    console.error('Error while fetching services:', error);
    return null;
  }
};

const getServices = async () => {
  const cachedServices = getServicesCache();

  if (cachedServices) {
    return cachedServices;
  } else {
    const serverServices = await fetchServicesFromServer();

    if (serverServices) {
      setServicesCache(serverServices[0].services);
      return serverServices[0].services;
    } else {
      return null;
    }
  }
};

export { getServices };
