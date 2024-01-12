/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');

const inboundRulesSchema = new mongoose.Schema({
  type: { type: String },
  protocol: { type: String },
  portRange: { type: String },
  source: { type: String },
  description: { type: String, default: '-' },
});

const awsInstanceSchema = new mongoose.Schema({
  sub: { type: String },
  type: { type: String },
  publicDns: { type: String },
  monitoring: { type: String },
  hypervisor: { type: String },
  freeTier: { type: String },
  freeTrial: { type: String },
  bareMetal: { type: String },
  state: { type: String },
  platformDetails: { type: String },
  statusCheck: { type: String },
  terminalProtection: { type: String, default: 'on' },
  launchTime: { type: String },
  volume: { type: Number },
  securityGroups: { type: [String] },
  loadBalancers: { type: [String] },
  availabilityZone: { type: String },
  numOfvCpu: { type: Number },
  inboundRules: { type: [inboundRulesSchema] },
});

const EC2_Instances = mongoose.model('EC2_Instances', awsInstanceSchema);

module.exports = EC2_Instances;
