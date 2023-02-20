import React, { useRef, useState, useEffect } from 'react';
import {
  SpaceBetween,
  Link,
  Header,
  Container,
  ContentLayout,
  AppLayout,
  Checkbox,
  BreadcrumbGroup,
  Flashbar,
  Alert,
  Button,
  ColumnLayout,
  Box,
  Select,
  RadioGroup,
  TagEditor,
  FormField,
  Autosuggest,
  S3ResourceSelector,
  Spinner,
  Input,
} from '@cloudscape-design/components';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const IntelligentTiering = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [prefix, setPrefix] = useState('');
  const [suffix, setSufffix] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(-1);
    }, 1500);
  };

  const Configuration = () => {
    const [name, setName] = useState("")
    const [scope, setScope] = useState('filter')
    const [prefix, setPrefix] = useState("")
    const [tags, setTags] = useState([]);
    const [status, setStatus] = useState('enable')

    return (
      <SpaceBetween size="xs">
        <FormField label="Configuration name"
        constraintText="The configuration name can contain up to 64 alphanumeric characters. You will not be able to change this name after the configuration has been created."
        >
        <Input value ={name} 
          onChange={({detail}) => setName(detail.value)}
         placeholder="Enter Configuration name"
        />
        </FormField>
        <FormField label="Choose a configuration scope" />
          <RadioGroup value={scope} 
            items={[
              {value: "filter", label: "Limit the scope of this configuration using one or more filters"},
              {value: "all", label: "This configuration applies to all objects in the bucket"},
              ]} 
            onChange={({detail}) => setScope(detail.value)}
          />

          {scope == "filter" && (
            <SpaceBetween size="xs">
              <FormField label="Prefix" 
                description="Add a filter to limit the scope of this configuration to a single prefix."
                constraintText="Don't include the bucket name in the prefix. Using certain characters in key names can cause problems with some applications and protocols."
                >
                <Input value ={prefix} 
          onChange={({detail}) => setPrefix(detail.value)}
         placeholder="Enter Prefix"
        />
              </FormField>

               <FormField label="Object Tags" 
                description="You can limit the scope of this rule to the key value pairs added below."
                />
                    <TagEditor
      i18nStrings={{
        keyPlaceholder: "Enter key",
        valuePlaceholder: "Enter value",
        addButton: "Add new tag",
        removeButton: "Remove",
        undoButton: "Undo",
        keySuggestion:'Custom tag key',
        valueSuggestion: 'Custom value',
        undoPrompt:
          "This tag will be removed upon saving changes",
        loading:
          "Loading tags that are associated with this resource",
        keyHeader: "Key",
        valueHeader: "Value",
        optional: "optional",
        keysSuggestionLoading: "Loading tag keys",
        keysSuggestionError:
          "Tag keys could not be retrieved",
        valuesSuggestionLoading: "Loading tag values",
        valuesSuggestionError:
          "Tag values could not be retrieved",
        emptyKeyError: "You must specify a tag key",
        maxKeyCharLengthError:
          "The maximum number of characters you can use in a tag key is 128.",
        maxValueCharLengthError:
          "The maximum number of characters you can use in a tag value is 256.",
        duplicateKeyError:
          "You must specify a unique tag key.",
        invalidKeyError:
          "Invalid key. Keys can only contain Unicode letters, digits, white space and any of the following: _.:/=+@-",
        invalidValueError:
          "Invalid value. Values can only contain Unicode letters, digits, white space and any of the following: _.:/=+@-",
        awsPrefixError: "Cannot start with aws:",
        tagLimit: (availableTags, tagLimit) =>
          availableTags === tagLimit
            ? "You can add up to " + tagLimit + " tags."
            : availableTags === 1
            ? "You can add up to 1 more tag."
            : "You can add up to " +
              availableTags +
              " more tags.",
        tagLimitReached: tagLimit =>
          tagLimit === 1
            ? "You have reached the limit of 1 tag."
            : "You have reached the limit of " +
              tagLimit +
              " tags.",
        tagLimitExceeded: tagLimit =>
          tagLimit === 1
            ? "You have exceeded the limit of 1 tag."
            : "You have exceeded the limit of " +
              tagLimit +
              " tags.",
        enteredKeyLabel: key => 'Use "' + key + '"',
        enteredValueLabel: value => 'Use "' + value + '"'
      }}
      tags={tags}
      onChange={({ detail }) => setTags(detail.tags)}
      keysRequest={() => Promise.resolve([])}
    />
     
            </SpaceBetween>
            )}

           <FormField label="Status" description="Choose whether the configuration will be enabled or disabled."/>
        <RadioGroup value={status} 
            items={[
              {value: "disable", label: "Disable"},
              {value: "enable", label: "Enable"},
              ]} 
            onChange={({detail}) => setStatus(detail.value)}
          />
      </SpaceBetween>
      );
  }

  const Archieve = () => {
    const [archieve, setArchieve] = useState(false);
    const [deepArchieve, setDeepArchieve] = useState(false);
    const [daysArchieve, setDaysArchieve] = useState(null)
    const [daysDeepArchieve, setDaysDeepArchieve] = useState(null)

    return (
      <SpaceBetween size="s">
        <Checkbox 
          checked={archieve} 
          onChange={({detail}) => setArchieve(detail.checked)}
          description="When enabled, Intelligent-Tiering will automatically move objects that haven’t been accessed for a minimum of 90 days to the Archive Access tier."
          >
          Archive Access tier
          </Checkbox>
          {archieve && (
            <SpaceBetween size="s">
            <FormField label="Days until transition to the Archive Access tier"
              description="The number of consecutive days without access before tiering down to the Archive Access tier."
              constraintText="Whole number greater than or equal to 90 and up to 730 days. 
              When both are selected, the Deep Archive Access tier value must be larger than the Archive Access tier value."
              >
              <Input 
                value={daysArchieve} 
                onChange={({detail}) => setDaysArchieve(detail.value)}
                inputMode="numeric"
                type="number"
              />
              </FormField>
              <Alert type="info">
                <>
                Only activate the Archive Access tier for 90 days if you want to bypass the Archive Instant Access tier. 
                The Archive Access tier delivers 10% lower storage cost with minute to hour retrieval times, whereas the Archive Instant Access tier 
                delivers the same milliseconds access times as the Frequent and Infrequent Access tiers. Learn more about the {" "}
                <Link external fontSize="inherit">S3 Intelligent-Tiering access tiers</Link>
                </>
               </Alert>
              </SpaceBetween>
            )}
          <Checkbox 
          checked={deepArchieve} 
          onChange={({detail}) => setDeepArchieve(detail.checked)}
          description="When enabled, Intelligent-Tiering will automatically move objects that haven’t been accessed for a minimum of 90 days to the Archive Access tier."
          >
          Deep Archive Access tier
          </Checkbox>
          {deepArchieve && (
            <SpaceBetween size="s">
            <FormField label="Days until transition to the Deep Archive Access tier"
              description="The number of consecutive days without access before tiering down to the Deep Deep Archive Access tier can be extended for up to 2 years."
              constraintText="Whole number greater than or equal to 180 and up to 730 days.
               When both are selected, the Deep Archive Access tier value must be larger than the Archive Access tier value."
              >
              <Input 
                value={daysDeepArchieve} 
                onChange={({detail}) => setDaysDeepArchieve(detail.value)}
                inputMode="numeric"
                type="number"
              />
              </FormField>
              </SpaceBetween>
            )}
          {archieve || deepArchieve ? (
            <Alert type="warning" header="Retrieval time compatibility">
                <>
               To access objects that have moved to the Intelligent-Tiering Archive Access tier, you must restore them back to the Frequent Access tier which 
               can take up to 5 hours from the Archive Access tier, and 12 hours from the Deep Archive Access tier. Ensure that this retrieval time is compatible
                with your application.
                </>
               </Alert>
            ): null}
      </SpaceBetween>
      );
  }
  
  return (
    <SpaceBetween size="s">
      <Container
        header={
          <Header
            variant="h2"
            description={
              <>
              {props.state.description && (
                <>
                {props.state.description}{' '}
                <Link external fontSize="inherit">
                  {' '}
                  Learn more
                </Link>
                </>
             
              )}
               </>
            }
          >
            {props.state.head}
          </Header>
        }
      >
      <Configuration />
      </Container>
      <Container
        header={
          <Header
            variant="h2"
            description={
              <>
                ntelligent-Tiering can tier down objects to the Archive Access tier, the Deep Archive Access tier, or both. 
                The number of days until transition to the selected tiers can be extended up to a total of 2 years.{' '}
                <Link external fontSize="inherit">
                  {' '}
                  Learn more
                </Link>
              </>
            }
          >
            Archive rule actions
          </Header>
        }
      >
        <Archieve />
      </Container>
      
      <SpaceBetween size="l" direction="horizontal" className="btn-right">
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <Button variant="primary" onClick={handleRefresh} loading={loading}>
          Save changes
        </Button>
      </SpaceBetween>
    </SpaceBetween>
  );
};

export default IntelligentTiering;