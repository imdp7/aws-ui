import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import {
  AppLayout,
  Box,
  BreadcrumbGroup,
  BreadcrumbGroupProps,
  SideNavigation,
  SideNavigationProps,
  Toggle,
} from '@awsui/components-react';
import './App.css';
import classes from './app.module.scss';
import { applyMode, Mode } from '@awsui/global-styles';

const HOME_LINK = { text: 'AWS UI Vite App', href: '/' };
const FEATURE1_LINK = { text: 'Feature 1', href: '/feature1' };
const FEATURE2_LINK = { text: 'Feature 2', href: '/feature2' };

const getBreadCrumbItems = (href: string): BreadcrumbGroupProps.Item[] => {
  switch (href) {
    case FEATURE1_LINK.href:
      return [HOME_LINK, FEATURE1_LINK];
    case FEATURE2_LINK.href:
      return [HOME_LINK, FEATURE2_LINK];

    default:
      return [];
  }
};

const navigationHeader: SideNavigationProps.Header = HOME_LINK;
const navigationItems: SideNavigationProps.Item[] = [
  { ...FEATURE1_LINK, type: 'link' },
  { ...FEATURE2_LINK, type: 'link' },
  { type: 'divider' },
  {
    type: 'link',
    text: 'Documentation',
    href: 'https://docs.example.com',
    external: true,
  },
];

const AppNavigation = (): JSX.Element => {
  const location = useLocation();
  const [activeHref, setActiveHref] = useState(location.pathname);

  useEffect(() => {
    // TODO: add logic to inspect first segment of pathname
    setActiveHref(location.pathname);
  }, [location]);

  const navigate = useNavigate();
  const defaultOnFollowHandler = (
    event: CustomEvent<SideNavigationProps.FollowDetail>
  ): void => {
    if (!event.detail.external) {
      navigate(event.detail.href);
      event.preventDefault();
    }
  };

  return (
    <SideNavigation
      items={navigationItems}
      header={navigationHeader}
      activeHref={activeHref}
      onFollow={defaultOnFollowHandler}
    />
  );
};

const AppBreadcrumbs = (): JSX.Element => {
  const location = useLocation();
  const [breadcrumbItems, setBreadcrumbItems] = useState<
    BreadcrumbGroupProps.Item[]
  >(getBreadCrumbItems(location.pathname));

  useEffect(() => {
    setBreadcrumbItems(getBreadCrumbItems(location.pathname));
  }, [location]);

  const navigate = useNavigate();
  const defaultOnFollowHandler = (
    event: CustomEvent<BreadcrumbGroupProps.ClickDetail>
  ): void => {
    navigate(event.detail.href);
    event.preventDefault();
  };

  return (
    <BreadcrumbGroup
      items={breadcrumbItems}
      ariaLabel="Breadcrumbs"
      onFollow={defaultOnFollowHandler}
    />
  );
};

const AppHeader = (): JSX.Element => {
  const [checked, setChecked] = useState(false);

  return (
    <Box variant="div" id="h" className={classes.app_header_footer}>
      <Box float="left" padding={{ left: 'm', top: 'xxs' }} color="inherit">
        App Header
      </Box>
      <Box
        float="right"
        padding={{ right: 's', top: 'xxs' }}
        textAlign="right"
        color="inherit"
      >
        <Toggle
          onChange={({ detail }) => {
            setChecked(detail.checked);
            applyMode(detail.checked ? Mode.Dark : Mode.Light);
          }}
          checked={checked}
          className={classes.app_header_footer}
        >
          Dark Mode
        </Toggle>
      </Box>
    </Box>
  );
};

const AppFooter = (): JSX.Element => {
  return (
    <Box variant="div" id="f" className={classes.app_header_footer}>
      <Box
        variant="div"
        float="left"
        padding={{ left: 'm' }}
        color="inherit"
        fontWeight="light"
      >
        App Footer
      </Box>
    </Box>
  );
};

const App = (): JSX.Element => {
  const [tools, setTools] = useState<JSX.Element>();
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);

  const updateTools = (element: JSX.Element): void => {
    setTools(element);
    setToolsOpen(true);
  };

  const location = useLocation();
  const [homePage, setHomePage] = useState<boolean>();

  useEffect(() => {
    setHomePage(location.pathname == HOME_LINK.href);
  }, [location]);

  // https://reactrouter.com/docs/en/v6/api#outlet
  return (
    <div id="b">
      <AppHeader />
      <div id="c">
        <AppLayout
          navigation={<AppNavigation />}
          content={
            <Provider store={store}>
              <Outlet context={updateTools} />
            </Provider>
          }
          tools={tools}
          toolsOpen={toolsOpen}
          disableContentPaddings={homePage}
          disableContentHeaderOverlap={false}
          toolsHide={homePage}
          onToolsChange={({ detail }) => setToolsOpen(detail.open)}
          breadcrumbs={!homePage && <AppBreadcrumbs />}
        />
      </div>
      <AppFooter />
    </div>
  );
};

export default App;
