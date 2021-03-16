import { gql } from '@apollo/client';

export const GET_LIST = gql`
  query list {
    list {
      name
    }
  }
`;