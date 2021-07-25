import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import {
  Box,
  Card,
  Grid,
  Heading,
  Image,
  ResponsiveContext,
  Text,
} from 'grommet';

import AnchorLink from 'components/AnchorLink';
import AnimatedBox from 'components/AnimatedBox';
import DataSpinner from 'components/DataSpinner';
import MediaList from 'components/MediaList';
import * as urlUtils from 'utils/url';

const MediaDetailed = () => {
  const location = useLocation();

  const size = useContext(ResponsiveContext);

  const [credits, setCredits] = useState<any>({});
  const [error, setError] = useState(false);
  const [info, setInfo] = useState<any>({});

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let type = urlUtils.getMediaTypeFromUrl(location.pathname);

        if (type) {
          const response = await fetch(
            urlUtils.getMediaDetailedApiUrl(type, id)
          );
          const info = await response.json();

          if (info.name) {
            document.title =
              info.name +
              (info.date ? ' (' + new Date(info.date).getFullYear() + ')' : '');
          }

          setInfo(info);

          if (!info.knownFor) {
            const response = await fetch(
              urlUtils.getMediaCreditsApiUrl(type, id)
            );
            const credits: any = await response.json();

            setCredits(credits);
          }
        }
      } catch (e: any) {
        setError(true);
      }
    })();
  }, [id, location]);

  /* Media heading */
  const MediaHeading = () => {
    return (
      <Box>
        {/* Title or name */}
        <Heading level="1" margin="none">
          {info.name}
        </Heading>
        {/* Subheading */}
        <Text size={size !== 'small' ? 'large' : 'medium'}>
          {/* Job (person only) */}
          {info.job ? info.job : <React.Fragment />}
          {/* Date (movie or TV show only) */}
          {info.date ? (
            <React.Fragment>
              {' '}
              {new Date(info.date).getFullYear()}
              {info.genres || info.runtime ? ' \u2022 ' : ''}
            </React.Fragment>
          ) : (
            <React.Fragment />
          )}
          {/* Genres (movie or TV show only) */}
          {info.genres ? info.genres : ''}
          {info.genres && info.runtime ? ' \u2022 ' : ''}
          {/* Runtime (movie or TV show only) */}
          {info.runtime ? info.runtime : ''}
        </Text>
      </Box>
    );
  };

  return (
    <React.Fragment>
      {Object.keys(info).length ? (
        <AnimatedBox>
          {/* Heading, image, overview/biography, directors/creators, and/or stars */}
          <Grid
            columns={size !== 'small' ? ['25%', 'auto'] : 'auto'}
            gap="medium"
          >
            {/* Heading (mobile only) */}
            {size === 'small' ? (
              <Box>
                <MediaHeading />
              </Box>
            ) : (
              <React.Fragment />
            )}
            {/* Image */}
            <Card
              alignSelf="start"
              width={size !== 'small' ? { max: 'medium' } : { max: 'small' }}
            >
              <Image a11yTitle="" fill={true} fit="contain" src={info.image} />
            </Card>
            <Box>
              {/* Heading (desktop only) */}
              {size !== 'small' ? <MediaHeading /> : <React.Fragment />}
              {/* Overview (movies and TV shows) or biography (people) */}
              {info.overview || info.biography ? (
                <React.Fragment>
                  <Text
                    margin={
                      size !== 'small'
                        ? { bottom: 'small', top: 'medium' }
                        : { bottom: 'small' }
                    }
                    size={size !== 'small' ? '2xl' : 'large'}
                    weight="bold"
                  >
                    {info.overview
                      ? 'Overview'
                      : info.biography
                      ? 'Biography'
                      : ''}
                  </Text>
                  <Text
                    margin={{ bottom: 'medium' }}
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {info.overview || info.biography}
                  </Text>
                </React.Fragment>
              ) : (
                <React.Fragment />
              )}
              {/* Directors (movies) or creators (TV shows) */}
              {(credits.directors && credits.directors.length) ||
              (info.creators && info.creators.length) ? (
                <AnimatedBox>
                  <Text>
                    <Text margin={{ right: 'small' }} weight="bold">
                      {credits.directors && credits.directors.length
                        ? credits.directors.length === 1
                          ? 'Director'
                          : 'Directors'
                        : ''}
                      {info.creators && info.creators.length
                        ? info.creators.length === 1
                          ? 'Creator'
                          : 'Creators'
                        : ''}
                    </Text>
                    {(credits.directors || info.creators).map(
                      (element: any, index: number) => (
                        <React.Fragment key={index}>
                          <AnchorLink
                            label={element.name}
                            url={urlUtils.getMediaDetailUrl(
                              element.type,
                              element.id
                            )}
                          />
                          {index !==
                          (credits.directors || info.creators).length - 1
                            ? ', '
                            : ''}
                        </React.Fragment>
                      )
                    )}
                  </Text>
                </AnimatedBox>
              ) : (
                <React.Fragment />
              )}
              {/* Stars (movies and TV shows) */}
              {credits.cast && credits.cast.length ? (
                <AnimatedBox>
                  <Text margin={{ bottom: 'medium' }}>
                    <Text margin={{ right: 'small' }} weight="bold">
                      Stars
                    </Text>
                    {/* First 3 from top cast */}
                    {credits.cast
                      .slice(0, 3)
                      .map((element: any, index: number) => (
                        <React.Fragment key={index}>
                          <AnchorLink
                            label={element.name}
                            url={urlUtils.getMediaDetailUrl(
                              element.type,
                              element.id
                            )}
                          />
                          {index !== 2 ? ', ' : ''}
                        </React.Fragment>
                      ))}
                  </Text>
                </AnimatedBox>
              ) : (
                <React.Fragment />
              )}
            </Box>
          </Grid>
          {/* Top cast (movies and TV shows) or known for (people) */}
          {(credits.cast && credits.cast.length) ||
          (info.knownFor && info.knownFor.length) ? (
            <Box>
              <Text
                margin={
                  size !== 'small'
                    ? { bottom: 'medium', top: 'large' }
                    : { bottom: 'small', top: 'none' }
                }
                size={size !== 'small' ? '2xl' : 'large'}
                weight="bold"
              >
                {credits.cast && credits.cast.length
                  ? 'Top Cast'
                  : info.knownFor && info.knownFor.length
                  ? 'Known For'
                  : ''}
              </Text>
              <MediaList
                data={
                  credits.cast && credits.cast.length
                    ? credits.cast
                    : info.knownFor && info.knownFor.length
                    ? info.knownFor
                    : ''
                }
              />
            </Box>
          ) : (
            <React.Fragment />
          )}
        </AnimatedBox>
      ) : (
        <DataSpinner error={error} />
      )}
    </React.Fragment>
  );
};

export default MediaDetailed;
