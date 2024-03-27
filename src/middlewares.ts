import express from 'express';
import morgan from 'morgan';

const configureMiddlewares = (app: express.Application) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan('dev'));
    app.use((req, res, next) => {
        res.setHeader('Content-Security-Policy', "default-src 'self'");
        next();
    });
};

export { configureMiddlewares };