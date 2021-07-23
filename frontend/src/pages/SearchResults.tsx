import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Heading } from 'grommet';

import MediaList from 'components/MediaList';
import * as urlUtils from 'utils/url';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  let query = useQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = 'Results for "' + query.get('q') + '"';
  }, [query]);

  return (
    <React.Fragment>
      <Heading margin={{ bottom: 'medium', top: 'none' }}>
        Results for "{query.get('q')}"
      </Heading>
      <MediaList
        key={query.get('q')}
        query={query.get('q')}
        url={urlUtils.searchApiUrl}
      />
    </React.Fragment>
  );
};

export default SearchResults;
