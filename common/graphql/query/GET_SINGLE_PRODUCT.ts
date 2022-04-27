import { gql } from '@apollo/client';

export const GET_SINGLE_PRODUCT = gql`
  query ($slug: String!) {
    products(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          name
          price
          category
          slug
          description
          promotionPrice
          color
          sizes
          productVariants {
            data {
              attributes {
                products {
                  data {
                    id
                    attributes {
                      slug
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
            }
          }
          reviews {
            data {
              id
              attributes {
                content
                createdAt
                stars
                customer {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
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
