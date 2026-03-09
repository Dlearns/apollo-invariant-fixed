import { gql } from '@apollo/client';

export const GET_ITEMS = gql`
  query GetItems($filter: String) {
    items(filter: $filter) {
      id
      name
    }
  }
`;
