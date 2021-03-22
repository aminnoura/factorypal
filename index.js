/**
 * @format
 */
 import React from 'react';
import {AppRegistry} from 'react-native';
import Application from './src/App';
import {name as appName} from './app.json';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

/* -----------------------------------------------------------

This is a small application for testing purpose. So the GIT behavior is not the real behavior as normally in 
the working environment happens. I did not make branches and I pushed directly into master. The commit messages
are not well organized as there is no branches and also not other developers. Also based on the application
size, there would not be so much commit messages. 

The App automatically build on github -> see the file in .githun/workflow/ci.yaml
The backend automatically deploy to heroku (backend is updating from backend branch)

----------------------------------------------------------- */

// Initialize Apollo Client
const client = new ApolloClient({
    uri: 'https://factorypal.herokuapp.com/graphql',
    cache: new InMemoryCache()
});

const App = () => (
    <ApolloProvider client={client}>
        <Application />
    </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => App);
