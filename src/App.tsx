import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { queryClient } from "./api/queryOptions";
import { ThemeProvider } from "./components/ThemeProvider";
import useSocket from "./hooks/useSocket";
import { AuthProvider, useAuth } from "./lib/auth";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  context: {
    // biome-ignore lint/style/noNonNullAssertion: r
    auth: undefined!,
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadDelay: 100,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const InnerApp = () => {
  const auth = useAuth();
  useSocket();
  return <RouterProvider router={router} context={{ auth }} />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <InnerApp />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
