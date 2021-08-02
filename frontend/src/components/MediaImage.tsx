import React, { useState } from 'react';
import ContentLoader from 'react-content-loader';

import { Box, Image } from 'grommet';

const MediaImage = (props: any) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <React.Fragment>
      <Box animation={loaded ? { type: 'fadeIn', duration: 200 } : {}}>
        <Image
          style={{ display: loaded ? 'block' : 'none' }}
          onLoad={() => {
            setLoaded(true);
          }}
          {...props}
        />
      </Box>
      {!loaded ? (
        <ContentLoader viewBox="0 0 500 750">
          <rect height="100%" width="100%" />
        </ContentLoader>
      ) : (
        <React.Fragment />
      )}
    </React.Fragment>
  );
};

export default MediaImage;
