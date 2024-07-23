import { AuthProvider, useAuth } from './lib/auth';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import { queryClient } from './api/queryOptions';

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadDelay: 100,
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const InnerApp = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
