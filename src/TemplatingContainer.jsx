// src/TemplatingContainer.jsx
import React, { useMemo, useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { GET_ITEMS } from "./query";

export default function TemplatingContainer({ onFilter }) {
  const [filterValue, setFilterValue] = useState("");
  const [gridData, setGridData] = useState([]);

  // Dynamically build query (simplified for demo)
  const q = useMemo(() => {
    return gql`
      query GetItems($filter: String) {
        items(filter: $filter) {
          id
          name
        }
      }
    `;
  }, []);

  const [loadQuery, { loading }] = useLazyQuery(q, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setGridData(data?.items || []);
    },
  });

  const handleFilter = () => {
    loadQuery({ variables: { filter: filterValue } });
    if (onFilter) onFilter(filterValue);
  };

  return (
    <div>
      <input
        placeholder="filter"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
      <button onClick={handleFilter}>Apply Filter</button>
      <div>
        {loading && <p>Loading...</p>}
        {gridData.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}
