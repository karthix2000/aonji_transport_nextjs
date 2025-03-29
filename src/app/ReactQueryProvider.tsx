"use client"; // Required for client components in the app directory

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { PropsWithChildren, useState } from "react";

const ReactQueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
