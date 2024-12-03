import { ReceivedRequest as Request } from '@/api/getFriendRequests';
import { useAcceptFriendRequestMutation, useRejectFriendRequestMutation } from '@/api/queryOptions';
import { useAuth } from '@/lib/auth';
import { Button } from './ui/button';

type ReceivedRequestProps = {
  request: Request;
};

const ReceivedRequest = ({ request }: ReceivedRequestProps) => {
  const { token } = useAuth();

  const acceptFriendRequestMutation = useAcceptFriendRequestMutation({
    token: token as string,
    requestId: request._id,
  });
  const rejectFriendRequestMutation = useRejectFriendRequestMutation({
    token: token as string,
    requestId: request._id,
  });

  const onAcceptRequest = () => {
    acceptFriendRequestMutation.mutate({
      token: token as string,
      requestId: request._id,
    });
  };

  const onRejectRequest = () => {
    rejectFriendRequestMutation.mutate({
      token: token as string,
      requestId: request._id,
    });
  };

  return (
    <div className="mb-1 flex max-w-sm items-center gap-2 rounded border p-2 hover:bg-muted">
      <p>{request.from.username}</p>
      <Button className="ml-auto" onClick={onAcceptRequest}>
        Accept
      </Button>
      <Button onClick={onRejectRequest} variant={'destructive'}>
        Reject
      </Button>
    </div>
  );
};

export default ReceivedRequest;
