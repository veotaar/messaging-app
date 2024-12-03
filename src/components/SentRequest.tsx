import { SentRequest as Request } from '@/api/getFriendRequests';
import { useDeleteFriendRequestMutation } from '@/api/queryOptions';
import { useAuth } from '@/lib/auth';
import { Button } from './ui/button';

type SentRequestProps = {
  request: Request;
};

const SentRequest = ({ request }: SentRequestProps) => {
  const { token } = useAuth();

  const deleteFriendRequestMutation = useDeleteFriendRequestMutation({
    token: token as string,
    requestId: request._id,
  });

  const onDeleteRequest = () => {
    deleteFriendRequestMutation.mutate({
      token: token as string,
      requestId: request._id,
    });
  };

  return (
    <div className="mb-1 flex max-w-sm items-center justify-between gap-2 rounded border p-2 hover:bg-muted">
      <p>{request.to.username}</p>
      <Button variant={'destructive'} onClick={onDeleteRequest}>
        Delete
      </Button>
    </div>
  );
};

export default SentRequest;
