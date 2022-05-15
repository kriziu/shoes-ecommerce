import { gql } from '@apollo/client';

export const GET_REVIEWS = gql`
  query ($productId: ID!) {
    reviews(filters: { product: { id: { eq: $productId } } }) {
      data {
        id
        attributes {
          content
          createdAt
          stars
          user {
            data {
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`;
