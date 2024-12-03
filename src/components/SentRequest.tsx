import { SentRequest as Request } from '@/api/getFriendRequests';
import { useDeleteFriendRequestMutation } from '@/api/queryOptions';
import { useAuth } from '@/lib/auth';
import { Button } from './ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

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
    <div className="w-min border p-2">
      <p>{request.to._id}</p>
      <p>{request.to.username}</p>
      <Button onClick={onDeleteRequest}>Delete</Button>
    </div>
  );
};

export default SentRequest;
