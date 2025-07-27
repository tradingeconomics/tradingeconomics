import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/Home.tsx";
import MarketsPage from "./pages/Markets.tsx";
import RootLayout from "./Layouts/RootLayout.tsx";
import EventsPage from "./pages/Events.tsx";

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/markets",
        element: <MarketsPage />,
      },
      {
        path: "/events",
        element: <EventsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
