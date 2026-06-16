import React, { createContext, useContext, useMemo } from 'react';
import { YopoyFrontendClient } from './YopoyFrontendClient';
import { createYopoyFrontendClient } from './createYopoyFrontendClient';
import { devRequestContext } from './devRequestContext';
import { createInMemoryAppContainer } from '../composition/createInMemoryAppContainer';

// Create a singleton container to ensure states are kept in memory across component re-renders
const singletonContainer = createInMemoryAppContainer();

const YopoyClientContext = createContext<YopoyFrontendClient | null>(null);

export const YopoyClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const client = useMemo(() => {
    return createYopoyFrontendClient(singletonContainer, devRequestContext);
  }, []);

  return (
    <YopoyClientContext.Provider value={client}>
      {children}
    </YopoyClientContext.Provider>
  );
};

export function useYopoyClient(): YopoyFrontendClient {
  const context = useContext(YopoyClientContext);
  if (!context) {
    throw new Error('useYopoyClient must be used within a YopoyClientProvider');
  }
  return context;
}
