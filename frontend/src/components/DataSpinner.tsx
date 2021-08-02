import React, { useEffect, useState } from 'react';

import { Box, Layer, Spinner } from 'grommet';

type DataSpinnerProps = {
  error: boolean;
  delay?: number;
};

function DataSpinner({ error, delay = 500 }: DataSpinnerProps) {
  const [starting, setStarting] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setStarting(true);

      await new Promise((resolve) => setTimeout(resolve, delay));

      if (mounted) {
        setStarting(false);
      }
    })();

    return () => {
      mounted = false;
      setStarting(false);
    };
  }, [delay]);

  return error === false ? (
    starting === false ? (
      <Layer modal={false} plain={true} responsive={false}>
        <Spinner size="medium" />
      </Layer>
    ) : (
      <React.Fragment />
    )
  ) : (
    <Box>The data could not be retrieved.</Box>
  );
}

export default DataSpinner;
