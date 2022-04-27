import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query {
    products {
      data {
        id
        attributes {
          name
          price
          category
          slug
          promotionPrice
          color
          images {
            data {
              id
              attributes {
                width
                height
                url
              }
            }
          }
        }
      }
    }
  }
`;
