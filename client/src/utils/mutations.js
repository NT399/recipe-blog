import { gql } from '@apollo/client';

export const ADD_CREATION = gql`
  mutation addCreation($creationText: String!) {
    addCreation(creationText: $creationText) {
      _id
      creationText
      creationURL
      creationAuthor
    }
  }
`;

export const LOGIN_CREATOR = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const DELETE_CREATION = gql`
mutation deleteCreation($creationText: String!) {
  deleteCreation(creationText: $creationText) {
    _id
    creationText
    creationAuthor
  }
}
`;

export const ADD_NEWCREATOR = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;



