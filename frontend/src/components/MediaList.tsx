import React, { useEffect, useState } from 'react';

import { Box, Card, CardBody, Grid, Image, Text } from 'grommet';

import AnchorLink from './AnchorLink';
import DataSpinner from './DataSpinner';
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
        <Box
          animation={[
            { type: 'fadeIn', duration: 200 },
            { type: 'slideUp', duration: 200 },
          ]}
        >
          <Grid columns="small" gap="medium">
            {data.map((element: any) => (
              <Card key={element.id}>
                <AnchorLink
                  title={element.name}
                  url={urlUtils.getMediaDetailUrl(element.type, element.id)}
                >
                  <CardBody>
                    <Image a11yTitle="" fill={true} src={element.image} />
                  </CardBody>
                </AnchorLink>
                <Box pad="small">
                  <Text textAlign="center">
                    <AnchorLink
                      title={element.name}
                      url={urlUtils.getMediaDetailUrl(element.type, element.id)}
                    >
                      {element.name}
                    </AnchorLink>
                  </Text>
                  {element.character ? (
                    <Text textAlign="center">{element.character}</Text>
                  ) : (
                    <React.Fragment />
                  )}
                </Box>
              </Card>
            ))}
          </Grid>
        </Box>
      ) : (
        <DataSpinner error={error} />
      )}
    </React.Fragment>
  );
}

export default MediaList;
