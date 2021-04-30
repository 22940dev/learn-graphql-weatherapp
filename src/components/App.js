import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Dashboard from './Dashboard'

export default function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://graphql-weather-api.herokuapp.com/',
  })

  return (
    <ApolloProvider client={client}>
      <Dashboard />
    </ApolloProvider>
  )
}
