import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Heading } from 'grommet';

import MediaList from 'components/MediaList';
import * as urlUtils from 'utils/url';

const MediaTrending = () => {
  const location = useLocation();

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const titles: any = {
      all: 'Trending',
      movie: 'Popular Movies',
      tv: 'Popular TV Shows',
      person: 'Popular People',
    };

    let type = urlUtils.getMediaTypeFromUrl(location.pathname);
    let title = type ? titles[type] : titles['all'];

    document.title = title + ' - Movie Database Viewer';

    setTitle(title);
    setUrl(urlUtils.getMediaTrendingApiUrl(type ? type : 'all', 'week'));
  }, [location]);

  return title && url ? (
    <React.Fragment>
      <Heading margin={{ top: 'none', bottom: 'medium' }}>{title}</Heading>
      <MediaList url={url} />
    </React.Fragment>
  ) : (
    <React.Fragment />
  );
};

export default MediaTrending;
