import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: 'http://localhost:3333/graphql',
    cache: new InMemoryCache(),
  });
  client.refetchQueries({
    include: "all"
  })
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
    )
}

export default MyApp
