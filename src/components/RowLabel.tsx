import React from 'react';

type Data = {
  [key: string]: any
}

type RowLabelArgs = {
    data: Data,
    path: string,
    index?: number,
}

const RowLabel: React.ComponentType<RowLabelArgs> = ({ data, index }) => {
  return (
    <div>{data?.title || data?.name || `Slide ${String(index).padStart(2, "0")}`}</div>
  )
}

export default RowLabel