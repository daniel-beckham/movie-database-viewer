import express, { Request, Response, Router } from 'express';
import { moviedb } from './app';
import * as utils from './utils';

const router: Router = express.Router();

export const maxCredits: number = 10;
export const maxSearchSuggestions: number = 5;

router.get('/movie/:id', async (req: Request, res: Response) => {
  try {
    const movieDbResponse = await moviedb.movieInfo(req.params.id);
    const infoResponse = {
      type: utils.movieType,
      name: movieDbResponse.title,
      overview:
        movieDbResponse.overview || 'No overview is available for this movie.',
      image: utils.getImageUrl(utils.movieType, movieDbResponse.poster_path),
      date: movieDbResponse.release_date,
      runtime: utils.getFormattedRuntime(movieDbResponse.runtime),
      genres: movieDbResponse.genres
        ? movieDbResponse.genres.map((genre: any) => genre.name).join(', ')
        : null,
    };

    res.send(infoResponse);
  } catch (error: any) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get('/movie/:id/credits', async (req: Request, res: Response) => {
  try {
    const movieDbResponse = await moviedb.movieCredits(req.params.id);

    if (movieDbResponse.cast) {
      const creditsResponse = movieDbResponse.cast
        .slice(0, maxCredits)
        .map((result: any) => ({
          id: result.id,
          type: utils.personType,
          name: result.name,
          image: utils.getImageUrl(utils.personType, null, result.profile_path),
          character: result.character,
        }));

      res.send(creditsResponse);
    }
  } catch (error: any) {
    res.sendStatus(400);
  }
});

router.get('/tv/:id', async (req: Request, res: Response) => {
  try {
    const movieDbResponse = await moviedb.tvInfo(req.params.id);
    const infoResponse = {
      type: utils.tvType,
      name: movieDbResponse.name,
      overview:
        movieDbResponse.overview ||
        'No overview is available for this TV show.',
      image: utils.getImageUrl(utils.movieType, movieDbResponse.poster_path),
      date: movieDbResponse.first_air_date,
      runtime: utils.getFormattedRuntime(
        movieDbResponse.episode_run_time &&
          movieDbResponse.episode_run_time.length
          ? movieDbResponse.episode_run_time[0]
          : undefined
      ),
      genres: movieDbResponse.genres
        ? movieDbResponse.genres.map((genre: any) => genre.name).join(', ')
        : null,
    };

    res.send(infoResponse);
  } catch (error: any) {
    res.sendStatus(400);
  }
});

router.get('/tv/:id/credits', async (req: Request, res: Response) => {
  try {
    const movieDbResponse = await moviedb.tvCredits(req.params.id);

    if (movieDbResponse.cast) {
      const creditsResponse = movieDbResponse.cast
        .slice(0, maxCredits)
        .map((result: any) => ({
          id: result.id,
          type: utils.personType,
          name: result.name,
          image: utils.getImageUrl(utils.personType, null, result.profile_path),
          character: result.character,
        }));

      res.send(creditsResponse);
    }
  } catch (error: any) {
    res.sendStatus(400);
  }
});

router.get('/person/:id', async (req: Request, res: Response) => {
  try {
    const movieDbInfoResponse = await moviedb.personInfo(req.params.id);

    let knownFor: any = null;

    if (movieDbInfoResponse.id && movieDbInfoResponse.name) {
      const movieDbSearchResponse = await moviedb.searchPerson({
        query: movieDbInfoResponse.name,
      });

      if (movieDbSearchResponse.results) {
        movieDbSearchResponse.results.forEach((person) => {
          if (person.id === movieDbInfoResponse.id) {
            knownFor = person.known_for;
            return;
          }
        });
      }
    }

    const infoResponse = {
      type: utils.personType,
      name: movieDbInfoResponse.name,
      biography:
        movieDbInfoResponse.biography ||
        'No biography is available for this person.',
      image: utils.getImageUrl(
        utils.personType,
        null,
        movieDbInfoResponse.profile_path
      ),
      knownFor: knownFor
        ? knownFor.map((credit: any) => ({
            id: credit.id,
            type: credit.media_type,
            name: credit.title || credit.name,
            image: utils.getImageUrl(credit.media_type, credit.poster_path),
          }))
        : null,
    };

    res.send(infoResponse);
  } catch (error: any) {
    res.sendStatus(400);
  }
});

router.get('/trending/:type/:window', async (req: Request, res: Response) => {
  try {
    const trendingRequest: any = {
      media_type: req.params.type,
      time_window: req.params.window,
    };
    const movieDbResponse = await moviedb.trending(trendingRequest);

    if (movieDbResponse.results) {
      const trendingResponse = movieDbResponse.results.map((result: any) => ({
        id: result.id,
        type: result.media_type,
        name: result.title || result.name,
        image: utils.getImageUrl(
          result.media_type,
          result.poster_path,
          result.profile_path
        ),
      }));

      res.send(trendingResponse);
    }
  } catch (error: any) {
    res.sendStatus(400);
  }
});

router.post('/search', async (req: Request, res: Response) => {
  try {
    const searchMultiRequest: any = {
      query: req.body.query,
    };
    const movieDbResponse = await moviedb.searchMulti(searchMultiRequest);

    if (movieDbResponse.results) {
      const searchResponse = movieDbResponse.results.map((result: any) => ({
        id: result.id,
        type: result.media_type,
        name: result.title || result.name,
        date: result.release_date || result.first_air_date,
        image: utils.getImageUrl(
          result.media_type,
          result.poster_path,
          result.profile_path
        ),
      }));

      res.send(searchResponse);
    }
  } catch (error: any) {
    res.sendStatus(400);
  }
});

router.post('/search/suggestions', async (req: Request, res: Response) => {
  try {
    const searchMultiRequest: any = {
      query: req.body.query,
    };
    const movieDbResponse = await moviedb.searchMulti(searchMultiRequest);

    if (movieDbResponse.results) {
      const searchResponse = movieDbResponse.results
        .slice(0, maxSearchSuggestions)
        .map((result: any) => ({
          label:
            (result.title || result.name) +
            (result.release_date || result.first_air_date
              ? ' (' +
                new Date(
                  result.release_date || result.first_air_date
                ).getFullYear() +
                ')'
              : ''),
          value: {
            id: result.id,
            type: result.media_type,
            image: utils.getImageUrl(
              result.media_type,
              result.poster_path,
              result.profile_path,
              utils.imageConfig.logoSize
            ),
          },
        }));

      res.send(searchResponse);
    }
  } catch (error: any) {
    res.sendStatus(400);
  }
});

module.exports = router;
