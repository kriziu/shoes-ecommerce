import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query {
    products(pagination: { pageSize: 200 }) {
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
                hash
              }
            }
          }
        }
      }
    }
  }
`;
