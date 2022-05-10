import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;
