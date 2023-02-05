import { gql } from '@apollo/client';

export const QUERY_CREATIONS = gql`
  query getCreations {
    creations {
      _id
      creationText
      creationURL
      creationAuthor
    }
  }
`;


export const QUERY_CREATOR = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      creations {
        _id
        creationText
        creationURL
      }
    }
  }
`;


