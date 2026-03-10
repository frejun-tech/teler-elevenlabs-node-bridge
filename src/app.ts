import express, { Application, Request, Response } from 'express';
import { router } from './api/router';

export const createApp = (): Application => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/', (_req: Request, res: Response) => {
        res.send('Hello from server');
    });

    app.use('/api', router);

    return app;
};