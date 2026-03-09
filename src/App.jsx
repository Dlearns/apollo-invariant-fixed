import React, { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_ITEMS } from './query';
import ILoader from './ILoader';

export default function App() {
  const [filter, setFilter] = useState('');
  const { data, loading } = useQuery(GET_ITEMS, {
    variables: { filter },
    skip: !filter,
    notifyOnNetworkStatusChange: true,
  });

  return (
    <div>
      <input
        placeholder="filter"
        onChange={(e) => setFilter(e.target.value)}
      />
      {loading && <ILoader />}
      {data?.items?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
