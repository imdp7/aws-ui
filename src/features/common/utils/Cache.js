export const getUserCache = () => {
  const cachedData = localStorage.getItem('user');
  return cachedData ? JSON.parse(cachedData) : null;
};

export const setUserCache = (data) => {
  return localStorage.setItem('user', JSON.stringify(data));
};

export const getRegionsCache = () => {
  const cachedData = localStorage.getItem('regions');
  return cachedData ? JSON.parse(cachedData) : null;
};

export const setRegionsCache = (data) => {
  return localStorage.setItem('regions', JSON.stringify(data));
};
