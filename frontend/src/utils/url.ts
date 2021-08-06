export const baseUrl: string = `${process.env.PUBLIC_URL}` || '';
export const baseNonEmptyUrl: string = baseUrl ? baseUrl : '/';
export const baseApiUrl = baseUrl + '/api';

export const trendingUrl: string = baseUrl + '/trending';
export const popularMoviesUrl: string = baseUrl + '/movie/popular';
export const popularTvShowsUrl: string = baseUrl + '/tv/popular';
export const popularPeopleUrl: string = baseUrl + '/person/popular';
export const searchUrl: string = baseUrl + '/search';

export const popularMoviesRoute: string = popularMoviesUrl;
export const popularTvShowsRoute: string = popularTvShowsUrl;
export const popularPeopleRoute: string = popularPeopleUrl;
export const searchRoute: string = searchUrl;
export const movieRoute: string = baseUrl + '/movie/:id';
export const tvRoute: string = baseUrl + '/tv/:id';
export const personRoute: string = baseUrl + '/person/:id';

export const searchApiUrl: string = baseApiUrl + '/search';
export const searchSuggestionsApiUrl: string =
  baseApiUrl + '/search/suggestions';

export const getMediaDetailedUrl = (type: string, id: string): string => {
  return baseUrl + '/' + type + '/' + id;
};

export const getMediaDetailedApiUrl = (type: string, id: string): string => {
  return baseApiUrl + '/' + type + '/' + id;
};

export const getMediaTrendingApiUrl = (
  type: string,
  window: string
): string => {
  return baseApiUrl + '/trending/' + type + '/' + window;
};

export const getMediaCreditsApiUrl = (type: string, id: string): string => {
  return baseApiUrl + '/' + type + '/' + id + '/credits';
};

export const getMediaTypeFromUrl = (path: string): string | null => {
  let match = path.match('/(movie|tv|person)/');
  let type: string | null = null;

  if (match) {
    match.every((value: string) => {
      if (value === 'movie' || value === 'tv' || value === 'person') {
        type = value;
        return false;
      }

      return true;
    });
  }

  return type;
};
