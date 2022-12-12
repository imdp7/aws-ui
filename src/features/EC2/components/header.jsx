/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { HelpPanel, Icon, Button, Header } from '@cloudscape-design/components';
import { ExternalLinkItem, InfoLink } from '../commons/common-components';

export function HelpPanels(props) {
  return (
    <HelpPanel
      header={<h2>{props.title}</h2>}
      footer={
        <>
          <h3>
            Learn more{' '}
            <span role="img" aria-label="Icon external Link">
              <Icon name="external" />
            </span>
          </h3>
          <ul>
            <li>
              <ExternalLinkItem
                href="#"
                text="User Guide for Linux Instances"
              />
            </li>
            <li>
              <ExternalLinkItem
                href="#"
                text="User Guide for Windows Instances"
              />
            </li>
            <li>
              <ExternalLinkItem href="#" text="API Reference" />
            </li>
            <li>
              <ExternalLinkItem
                href="#"
                text="EC2 section of the AWS CLI Reference"
              />
            </li>
            <li>
              <ExternalLinkItem
                href="#"
                text="EC2 Instance Connect API Reference"
              />
            </li>
          </ul>
        </>
      }
    >
      <p>{props?.info}</p>
      <p>{props?.des}</p>
      <h5>{props?.h5}</h5>
      {props?.ul ? (
        <>
          {props?.ul.map((t, i) => {
            return (
              <>
                <b key={i}>{t?.h5}</b>
                <ul>
                  <li key={i}>{t?.text}</li>
                </ul>
              </>
            );
          })}
        </>
      ) : null}
    </HelpPanel>
  );
}
export function DashboardHeader(props) {
  return (
    <Header
      variant="h1"
      description={props.description}
      info={
        <InfoLink
          onFollow={() =>
            props.loadHelpPanelContent(
              <HelpPanels
                title={props.title}
                des={props?.des}
                h5={props.h5}
                ul={props.ul}
              />
            )
          }
          ariaLabel={'Information about service dashboard.'}
        />
      }
      actions={
        <>
          {props.buttonText ? (
            <Button variant="primary" href={props.href}>
              {props.buttonText}
            </Button>
          ) : null}
        </>
      }
    >
      {props.title}
    </Header>
  );
}