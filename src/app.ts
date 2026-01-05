import path from 'path';
import express, { Application } from 'express';

import { routes } from './routes/index.router';

const app: Application = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use(routes);

export default app;