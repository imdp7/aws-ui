// rest.ts
const BASE_URL = 'http://localhost:3000/api';

export const url = {
  regions: `${BASE_URL}/regions`,
  accounts: `${BASE_URL}/accounts`,
  profile: `${BASE_URL}/profile`,
  createInstances: `${BASE_URL}/services/ec2/instances`,
  ami: `${BASE_URL}/services/ec2/ami`,
  services: `${BASE_URL}/services/`,
  // Add more endpoints as needed
};
