import express, { Express, NextFunction, Request, Response } from 'express';
import { MovieDb } from 'moviedb-promise';
import path from 'path';
import * as utils from './utils';

export const app: Express = express();
export const port: string = process.env.PORT || '4000';

export const moviedb: MovieDb = new MovieDb(
  process.env.MOVIEDB_API_KEY || ''
);

export const baseUrl: string = process.env.SUBDIRECTORY || '';
export const baseApiUrl: string = baseUrl + '/api';
export const staticUrl: string = baseUrl + '/static';
export const staticImagesUrl: string = baseUrl + '/static/img';

app.use(express.json());
app.use(baseUrl, express.static(path.resolve(__dirname, '../frontend/build')));
app.use(baseApiUrl, require('./routes'));

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
  utils.getImageConfig();
});

module.exports = app;
