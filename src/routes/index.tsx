import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../lib/auth';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-screen-md p-2">
        <p>
          <Link to="/login" className="underline underline-offset-8">
            Login
          </Link>{' '}
          or{' '}
          <Link to="/register" className="underline underline-offset-8">
            create an account
          </Link>{' '}
          to start messaging!
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-md overflow-hidden text-ellipsis whitespace-nowrap p-2">
      <p>You are authenticated!</p>
    </div>
  );
}
