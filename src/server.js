import React from 'react';
import {createStore, applyMiddleware, compose}  from 'redux';
import {StaticRouter as Router} from 'react-router'
import App from './App'
import reducers from './reducers';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import ReduxThunk from 'redux-thunk';
import {serverHelper, renderAsync} from 'redux-async-render';
import promiseMiddleware from 'redux-promise';
import asyncAwait from 'redux-async-await';
import minify from 'express-minify';
import compression from 'compression';
import Express from 'express';
import {Server} from 'http';
import PageServices from './services/page-services';
import fs from 'fs';

const path = require('path');

const app = Express();
const server = new Server(app);

function cacheControl(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Cache-Control', 'max-age=86400000');
    next();
}
app.use(compression());
app.use(minify());


//app.use('/static', cacheControl, Express.static(path.join(__dirname, '/static'), {maxAge: 86400000}));
app.use('/assets', cacheControl, Express.static(path.join(__dirname, '/assets'), {maxAge: 86400000}));

const finalCreateStore = compose(
    serverHelper
)(createStore);


function configureStore(initialState) {
    return finalCreateStore(reducers, initialState);
}

const index = fs.readFileSync(__dirname + '/index.html', 'utf8');

function handleRender(req, res, next) {

    let pageServices = new PageServices(req.url);
    const baseLink = "yourwebsite.com";
    let metas = {"title":"title","desc":"desc","keywords":"k,e,y,w,o,r,d,s","canonical":req.protocol + '://' + baseLink + req.originalUrl};
    const context = {};
    const middleware = [ReduxThunk, promiseMiddleware, asyncAwait];
    const store = configureStore(applyMiddleware(...middleware));


    pageServices.getData(store.dispatch).then((result) => {

        const renderFn = () => renderToString(
            <Provider store={store}>
                <Router location={req.url} context={context}>
                    <App />
                </Router>
            </Provider>
        );
        let statusCode = 200;

        renderAsync(store, renderFn).then(rendered => {

            res.status(statusCode).send(
                index
                    .replace('<!-- CONTENT -->', rendered)
                    .replace('##CANONICAL##', metas.canonical)
                    .replace('##DESC##', metas.desc)
                    .replace('##KEYWORDS##', metas.keywords)
                    .replace('##TITLE##', metas.title)
                    .replace('"-- STORES --"', JSON.stringify(store.getState()))
            );
        }).catch(next);

    });

}


app.get('**', handleRender);

const port = process.env.PORT || 9000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }
    return console.info(
        `
      Server running on http://localhost:${port} [${env}]
      Universal rendering: ${process.env.UNIVERSAL ? 'enabled' : 'disabled'}
    `);
});