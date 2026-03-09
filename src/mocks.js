import { GET_ITEMS } from './query';

export const mocks = [
  {
    request: {
      query: GET_ITEMS,
      variables: { filter: 'abc' },
    },
    result: {
      data: {
        items: [{ id: '1', name: 'Item ABC' }],
      },
    },
    delay: 150,
  },
];
