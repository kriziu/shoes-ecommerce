import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      user {
        email
      }
    }
  }
`;
