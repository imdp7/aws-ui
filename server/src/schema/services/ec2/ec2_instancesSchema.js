/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');

const inboundRulesSchema = new mongoose.Schema({
  type: { type: String },
  protocol: { type: String },
  portRange: { type: String },
  source: { type: String },
  description: { type: String, default: '-' },
});

const amiSchema = new mongoose.Schema({
  label: { type: String },
  description: { type: String, default: '-' },
  tags: { type: Array, default: [] },
  labelTag: { type: String },
});

const instanceTypeSchema = new mongoose.Schema({
  label: { type: String },
  description: { type: String, default: '-' },
});

const awsInstanceSchema = new mongoose.Schema({
  instanceNo: { type: Number },
  name: { type: String },
  operatingSystem: { type: String },
  type: { type: [instanceTypeSchema] },
  publicDns: { type: String },
  monitoring: { type: String, default: 'Default' },
  hypervisor: { type: String },
  freeTier: { type: String },
  freeTrial: { type: String },
  bareMetal: { type: String },
  state: { type: String, default: 'Stopped' },
  platformDetails: { type: String },
  statusCheck: { type: String },
  terminalProtection: { type: String, default: 'on' },
  launchTime: { type: String },
  storageNo: { type: Number },
  securityGroups: { type: [String] },
  loadBalancers: { type: [String] },
  availabilityZone: { type: String },
  numOfvCpu: { type: Number },
  inboundRules: { type: [inboundRulesSchema] },
  ami: { type: [amiSchema] },
});

const EC2_Instances = mongoose.model('EC2_Instances', awsInstanceSchema);

module.exports = EC2_Instances;
