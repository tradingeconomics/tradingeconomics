import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import CountryProvider from "@/hooks/useCountry";
import { ThemeProvider } from "@/hooks/useTheme";
import App from "@/App.tsx";
import "@/index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <ThemeProvider>
        <CountryProvider value="mexico">
          <App />
        </CountryProvider>
      </ThemeProvider>
    </StrictMode>
  </QueryClientProvider>
);
