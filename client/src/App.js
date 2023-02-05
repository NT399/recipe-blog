import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Mainpage';
import Header from './components/Nav';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const Authentication = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const userSide = new ApolloClient({
  link: Authentication.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={userSide}>
      <Router>
  
        <Header />
        <div>
            <Routes>
              <Route 
                path="/"
                element={<Main />}
              />
            </Routes>
        </div>
      
      </Router>
    </ApolloProvider>
  );
}

export default App;
