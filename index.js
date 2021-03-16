/**
 * @format
 */
 import React from 'react';
import {AppRegistry} from 'react-native';
import Application from './App';
import {name as appName} from './app.json';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
    uri: 'http://192.168.2.113:4000/graphql',
    cache: new InMemoryCache()
});

const App = () => (
    <ApolloProvider client={client}>
        <Application />
    </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => App);
