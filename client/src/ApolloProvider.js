// src/ApolloProvider.js
import React from "react";
import App from "./App";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";





const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL, // путь к серверу
});


const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken')
  return{
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  devtools: { enabled: true } 
});


export default function ApolloProviderWrapper() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
