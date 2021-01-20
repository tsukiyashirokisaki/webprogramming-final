import './App.css';
import React from 'react';
import { ApolloProvider,ApolloClient,InMemoryCache, Reference,gql} from '@apollo/client';
import { HashRouter } from 'react-router-dom';
import Game from "./containers/Game"
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';



const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
});
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
    timeout: 30000
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
});

function App() {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Game />
      </HashRouter>
    </ApolloProvider>
  );
}

export default App;