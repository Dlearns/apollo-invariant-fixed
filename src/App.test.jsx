import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';

import App from './App';
import { mocks } from './mocks';

test('typing triggers query with MockedProvider', async () => {
  const user = userEvent.setup();

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  const input = screen.getByPlaceholderText('filter');

  await user.type(input, 'abc');

  // Let the query resolve
  await new Promise((r) => setTimeout(r, 200));

  expect(screen.getByText('Item ABC')).toBeInTheDocument();
});
