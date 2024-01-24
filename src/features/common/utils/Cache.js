export const getUserCache = () => {
  const cachedData = localStorage.getItem('user');
  return cachedData ? JSON.parse(cachedData) : null;
};

export const setUserCache = (data) => {
  return localStorage.setItem('user', JSON.stringify(data));
};

export const getProfileCache = () => {
  const cachedData = localStorage.getItem('profile');
  return cachedData ? JSON.parse(cachedData) : null;
};

export const setProfileCache = (data) => {
  return localStorage.setItem('profile', JSON.stringify(data));
};

export const getRegionsCache = () => {
  const cachedData = localStorage.getItem('regions');
  return cachedData ? JSON.parse(cachedData) : null;
};

export const setRegionsCache = (data) => {
  return localStorage.setItem('regions', JSON.stringify(data));
};

export const getServicesCache = () => {
  const cachedData = localStorage.getItem('services');
  return cachedData ? JSON.parse(cachedData) : null;
};

export const setServicesCache = (data) => {
  return localStorage.setItem('services', JSON.stringify(data));
};
