"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";



type Props = {
  children: React.ReactNode;
};
const queryClient = new QueryClient();

const Providers = ({ children }: {children: React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
       
        {children}

    </QueryClientProvider>
  );
};

export default Providers;
