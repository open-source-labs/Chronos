import React from 'react';

const DetailContext = React.createContext({
  detailData: [],
});

export const DetailProvider = DetailContext.Provider;
export const DetailConsumer = DetailContext.Consumer;
export default DetailContext;
