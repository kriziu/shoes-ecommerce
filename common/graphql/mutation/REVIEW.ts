import { gql } from '@apollo/client';

export const REVIEW = gql`
  mutation ($productId: ID!, $content: String!, $stars: Int!) {
    createReview(
      data: { content: $content, stars: $stars, product: $productId }
    ) {
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
