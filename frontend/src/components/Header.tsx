import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Button, Heading, Layer, ResponsiveContext, Text } from 'grommet';
import { Close as CloseIcon, Menu as MenuIcon } from 'grommet-icons';

import AnchorLink from './AnchorLink';
import * as urlUtils from 'utils/url';

const Header = () => {
  const location = useLocation();

  const size = useContext(ResponsiveContext);

  const [sidebarVisible, setSidebarVisibile] = useState(false);

  useEffect(() => {
    setSidebarVisibile(false);
  }, [location]);

  return (
    <React.Fragment>
      {/* Mobile/desktop Header */}
      <Box background="brand" className="header" elevation="small" pad="medium">
        <Box alignSelf="center" direction="row" gap="medium" width="xlarge">
          {size !== 'small' ? (
            /* Desktop header */
            <Box align="end" direction="row" gap="medium">
              <Heading level="3" margin="none">
                <AnchorLink
                  color="white"
                  label="Movie Database Viewer"
                  url={urlUtils.baseNonEmptyUrl}
                />
              </Heading>
              <AnchorLink
                color="white"
                label="Movies"
                url={urlUtils.popularMoviesUrl}
              />
              <AnchorLink
                color="white"
                label="TV Shows"
                url={urlUtils.popularTvShowsUrl}
              />
              <AnchorLink
                color="white"
                label="People"
                url={urlUtils.popularPeopleUrl}
              />
            </Box>
          ) : (
            /* Mobile header */
            <Box align="center" direction="row" gap="small">
              <Button
                icon={<MenuIcon color="white" />}
                onClick={() => setSidebarVisibile(!sidebarVisible)}
              />
              <Heading level="3" margin="none">
                <AnchorLink
                  color="white"
                  label="Movie Database Viewer"
                  url={urlUtils.baseNonEmptyUrl}
                />
              </Heading>
            </Box>
          )}
        </Box>
      </Box>
      {/* Mobile navigation menu */}
      {sidebarVisible && size === 'small' ? (
        <Layer animation="fadeIn">
          <Box
            background="light-2"
            direction="row"
            justify="between"
            pad="medium"
          >
            <Heading level="2" margin="none">
              <AnchorLink
                color="black"
                label="Movie Database Viewer"
                url={urlUtils.baseNonEmptyUrl}
              />
            </Heading>
            <Button
              icon={<CloseIcon />}
              onClick={() => setSidebarVisibile(!sidebarVisible)}
              plain
            />
          </Box>
          <Box
            background="light-2"
            fill
            gap="medium"
            justify="start"
            pad={{ left: 'medium', right: 'medium', top: 'medium' }}
          >
            <Text size="xlarge">
              <AnchorLink label="Movies" url={urlUtils.popularMoviesUrl} />
            </Text>
            <Text size="xlarge">
              <AnchorLink label="TV Shows" url={urlUtils.popularTvShowsUrl} />
            </Text>
            <Text size="xlarge">
              <AnchorLink label="People" url={urlUtils.popularPeopleUrl} />
            </Text>
          </Box>
        </Layer>
      ) : (
        <React.Fragment />
      )}
    </React.Fragment>
  );
};

export default Header;
