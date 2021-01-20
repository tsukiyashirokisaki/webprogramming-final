import './App.css';
import React from 'react';
import ApolloClient, { ApolloLink } from 'apollo-boost';
import { onError } from 'apollo-link-error'
import { ApolloProvider } from 'react-apollo';
import { HashRouter } from 'react-router-dom';
import Game from "./containers/Game"

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  link: ApolloLink.from([errorLink])
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
