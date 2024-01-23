// rest.ts
const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const url = {
  regions: `${BASE_URL}/regions`,
  accounts: `${BASE_URL}/accounts`,
  profile: `${BASE_URL}/profile`,
  createInstances: `${BASE_URL}/services/ec2/instances`,
  ami: `${BASE_URL}/services/ec2/ami`,
  services: `${BASE_URL}/services/`,
  // Add more endpoints as needed
};
