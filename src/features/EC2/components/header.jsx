/* eslint-disable react/prop-types */
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';
import {
  HelpPanel,
  Icon,
  Button,
  Header,
  Tabs,
  Spinner,
  TutorialPanel,
  Link,
  Box,
} from '@cloudscape-design/components';
import { ExternalLinkItem, InfoLink } from '../commons/common-components';
import { useNavigate } from 'react-router-dom';

const Pane1 = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [loading]);
  return (
        <HelpPanel loadingText="Loading Content" loading={loading} header={<h2>{props.title}</h2>}>
          <div>
            <p>{props?.info}</p>
            <p>{props?.des}</p>
            <h5>{props?.h5}</h5>
            {props?.ul ? (
              <div>
                {props?.ul.map((t) => {
                  return (
                    <div key={t.h5}>
                      <b>{t?.h5}</b>
                      <ul>
                        <li>{t?.text}</li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </HelpPanel>
  );
};

const Tutorial = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
        <TutorialPanel
         loadingText="loading content"
          loading={loading}
          tutorials={[
            {
              title: 'Transcribe audio',
              completed: true,
              description: (
                <>
                  <Box
                    variant="p"
                    color="text-body-secondary"
                    padding={{ top: 'n' }}
                  >
                    In this tutorial you will learn how to:
                  </Box>
                  <ul>
                    <li>
                      <Box variant="span" color="text-body-secondary">
                        Transcribe an audio file from Amazon S3 to text
                      </Box>
                    </li>
                    <li>
                      <Box variant="span" color="text-body-secondary">
                        View the transcribed text
                      </Box>
                    </li>
                  </ul>
                </>
              ),
              completedScreenDescription:
                'You now know how to transcribe text from audio with Amazon Transcribe.',
              prerequisitesAlert: null,
              learnMoreUrl:
                'https://aws.amazon.com/getting-started/hands-on/create-audio-transcript-transcribe/',
              tasks: [
                {
                  title: 'Create transcription job',
                  steps: [
                    { title: 'Name your transcription job' },
                    { title: 'Choose a language' },
                    { title: 'Add a file' },
                    { title: 'Create job' },
                  ],
                },
                {
                  title: 'View transcription details',
                  steps: [
                    { title: 'Navigate to details page' },
                    { title: 'See preview' },
                  ],
                },
              ],
            },
            {
              title: 'Catalog audio archives',
              description: (
                <>
                  In this tutorial you will learn how to:
                  <ul>
                    <li>Index transcribed audio/video files</li>
                    <li>Search across the file library</li>
                  </ul>
                </>
              ),
              prerequisitesAlert: (
                <>
                  Transcribe audio first to complete this tutorial.
                  <br />
                  <Link
                    href="https://aws.amazon.com/getting-started/hands-on/create-audio-transcript-transcribe/"
                    external={true}
                    externalIconAriaLabel="Opens in a new tab"
                  >
                    Create an Audio Transcript
                  </Link>
                </>
              ),
              prerequisitesNeeded: true,
              tasks: [],
            },
          ]}
          downloadUrl="https://example.com/my-service/all-tutorials.pdf"
          i18nStrings={{
            labelsTaskStatus: {},
            loadingText: 'Loading',
            tutorialListTitle: 'Choose a tutorial',
            tutorialListDescription:
              'Use our walk-through tutorials to learn how to achieve your desired objectives within Amazon Transcribe.',
            tutorialListDownloadLinkText: 'Download PDF version',
            tutorialCompletedText: 'Tutorial completed',
            labelExitTutorial: 'dismiss tutorial',
            learnMoreLinkText: 'Learn more',
            startTutorialButtonText: 'Start tutorial',
            restartTutorialButtonText: 'Restart tutorial',
            completionScreenTitle:
              'Congratulations! You completed the tutorial.',
            feedbackLinkText: 'Feedback',
            dismissTutorialButtonText: 'Dismiss tutorial',
            taskTitle: (taskIndex, taskTitle) =>
              `Task ${taskIndex + 1}: ${taskTitle}`,
            stepTitle: (stepIndex, stepTitle) =>
              `Step ${stepIndex + 1}: ${stepTitle}`,
            labelTotalSteps: (totalStepCount) =>
              `Total steps: ${totalStepCount}`,
            labelLearnMoreExternalIcon: 'Opens in a new tab',
            labelTutorialListDownloadLink:
              'Download PDF version of this tutorial',
            labelLearnMoreLink:
              'Learn more about transcribe audio (opens new tab)',
          }}
        />
  );
};

export function HelpPanels(props) {
  const [activeTabId, setActiveTabId] = React.useState('first');
  return (
    <Tabs
      onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
      activeTabId={activeTabId}
      className="side-pane"
      tabs={[
        {
          label: 'Info',
          id: 'first',
          content: <Pane1 {...props} />,
        },
        {
          label: 'Tutorial',
          id: 'second',
          content: <Tutorial {...props} />,
        },
      ]}
    />
  );
}
export function DashboardHeader(props) {
  const navigate = useNavigate();
  return (
    <Header
      variant="h1"
      description={props.des}
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
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                navigate('/ec2_instance/launchEC2');
              }}
            >
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
