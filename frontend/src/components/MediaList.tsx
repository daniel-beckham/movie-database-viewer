import React, { useEffect, useState } from 'react';

import { Box, Card, CardBody, Grid, Text } from 'grommet';

import AnchorLink from './AnchorLink';
import AnimatedBox from './AnimatedBox';
import DataSpinner from './DataSpinner';
import MediaImage from './MediaImage';
import * as urlUtils from 'utils/url';

function MediaList(props: any) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (props.data) {
          setData(props.data);
        } else {
          const requestOptions = props.query
            ? {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: props.query }),
              }
            : {};

          const response = await fetch(props.url, requestOptions);
          const data: any = await response.json();
          setData(data);
        }
      } catch (e: any) {
        setError(true);
      }
    })();
  }, [props]);

  return (
    <React.Fragment>
      {data && data.length ? (
        <AnimatedBox>
          <Grid columns="small" gap="medium">
            {data.map((element: any) => (
              /* Image, title/name, and character name */
              <Card key={element.id}>
                <AnchorLink
                  title={element.name}
                  url={urlUtils.getMediaDetailedUrl(element.type, element.id)}
                >
                  {/* Image */}
                  <CardBody>
                    <MediaImage fill={true} src={element.image} />
                  </CardBody>
                </AnchorLink>
                <Box pad="small">
                  {/* Title (movies or TV shows) or name (people) */}
                  <Text textAlign="center">
                    <AnchorLink
                      label={element.name}
                      title={element.name}
                      url={urlUtils.getMediaDetailedUrl(
                        element.type,
                        element.id
                      )}
                    />
                  </Text>
                  {/* Character name (movies or TV shows) */}
                  {element.character ? (
                    <Text textAlign="center">{element.character}</Text>
                  ) : (
                    <React.Fragment />
                  )}
                </Box>
              </Card>
            ))}
          </Grid>
        </AnimatedBox>
      ) : (
        <DataSpinner error={error} />
      )}
    </React.Fragment>
  );
}

export default MediaList;
