import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Box, Card, Grid, Image, ResponsiveContext, Text } from 'grommet';

import DataSpinner from 'components/DataSpinner';
import MediaList from 'components/MediaList';
import * as urlUtils from 'utils/url';

const MediaDetailed = () => {
  const location = useLocation();

  const size = useContext(ResponsiveContext);

  const [cast, setCast] = useState<any>({});
  const [error, setError] = useState(false);
  const [info, setInfo] = useState<any>({});
  const [knownFor, setKnownFor] = useState<any>({});

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
            document.title = info.name;
          }

          setInfo(info);

          if (info.knownFor) {
            setKnownFor(info.knownFor);
          } else {
            const response = await fetch(
              urlUtils.getMediaCreditsApiUrl(type, id)
            );
            const credits: any = await response.json();

            setCast(credits);
          }
        }
      } catch (e: any) {
        setError(true);
      }
    })();
  }, [id, location]);

  const Title = () => {
    return (
      <React.Fragment>
        <Text weight="bold" size={size !== 'small' ? '4xl' : 'xlarge'}>
          {info.name}
          {info.date ? (
            <Text weight="normal" size={size !== 'small' ? '4xl' : 'xlarge'}>
              {' '}
              ({new Date(info.date).getFullYear()})
            </Text>
          ) : (
            <React.Fragment />
          )}
        </Text>
        <Text size={size !== 'small' ? 'large' : 'small'}>
          {info.genres ? info.genres : ''}
          {info.genres && info.runtime ? ' \u2022 ' : ''}
          {info.runtime ? info.runtime : ''}
        </Text>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {Object.keys(info).length ? (
        <Box
          animation={[
            { type: 'fadeIn', duration: 200 },
            { type: 'slideUp', duration: 200 },
          ]}
        >
          <Grid
            columns={size !== 'small' ? ['25%', 'auto'] : 'auto'}
            gap="medium"
          >
            {size === 'small' ? (
              <Box>
                <Title />
              </Box>
            ) : (
              <React.Fragment />
            )}
            <Card
              alignSelf="start"
              width={size !== 'small' ? { max: 'medium' } : { max: 'small' }}
            >
              <Image a11yTitle="" fill={true} fit="contain" src={info.image} />
            </Card>
            <Box>
              {size !== 'small' ? <Title /> : <React.Fragment />}
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
                  <Text>{info.overview || info.biography}</Text>
                </React.Fragment>
              ) : (
                <React.Fragment />
              )}
            </Box>
          </Grid>
          {Object.keys(cast).length || Object.keys(knownFor).length ? (
            <Box>
              <Text
                margin={
                  size !== 'small'
                    ? { bottom: 'medium', top: 'large' }
                    : { vertical: 'small' }
                }
                size={size !== 'small' ? '2xl' : 'large'}
                weight="bold"
              >
                {Object.keys(cast).length
                  ? 'Top Cast'
                  : Object.keys(knownFor).length
                  ? 'Known For'
                  : ''}
              </Text>
              <MediaList
                data={
                  Object.keys(cast).length
                    ? cast
                    : Object.keys(knownFor).length
                    ? knownFor
                    : ''
                }
              />
            </Box>
          ) : (
            <React.Fragment />
          )}
        </Box>
      ) : (
        <DataSpinner error={error} />
      )}
    </React.Fragment>
  );
};

export default MediaDetailed;
