import { Redirect, Route, Switch } from 'react-router-dom';

import MediaDetailed from 'pages/MediaDetailed';
import MediaTrending from 'pages/MediaTrending';
import SearchResults from 'pages/SearchResults';

import * as urlUtils from 'utils/url';

const Routes = () => {
  return (
    <Switch>
      <Route exact path={urlUtils.baseNonEmptyUrl}>
        <MediaTrending key={0} />
      </Route>
      <Route exact path={urlUtils.popularMoviesRoute}>
        <MediaTrending key={1} />
      </Route>
      <Route exact path={urlUtils.popularTvShowsRoute}>
        <MediaTrending key={2} />
      </Route>
      <Route exact path={urlUtils.popularPeopleRoute}>
        <MediaTrending key={3} />
      </Route>
      <Route path={urlUtils.movieRoute}>
        <MediaDetailed key={4} />
      </Route>
      <Route path={urlUtils.tvRoute}>
        <MediaDetailed key={5} />
      </Route>
      <Route path={urlUtils.personRoute}>
        <MediaDetailed key={6} />
      </Route>
      <Route path={urlUtils.searchRoute}>
        <SearchResults />
      </Route>
      {/* Not found */}
      <Route>
        <Redirect to={urlUtils.baseNonEmptyUrl} />
      </Route>
    </Switch>
  );
};

export default Routes;
