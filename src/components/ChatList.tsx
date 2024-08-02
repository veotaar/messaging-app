import { ConversationListResponse } from '@/api/getConversations';
import { useAuth } from '@/lib/auth';
import { Link } from '@tanstack/react-router';

const ChatList = ({ conversations }: ConversationListResponse) => {
  const { userId } = useAuth();

  if (conversations.length === 0) {
    return <div>you dont have any conversations yet</div>;
  }

  return (
    <div>
      {conversations.map((conversation) => (
        <div key={conversation._id}>
          <Link
            from="/conversations"
            to="/conversations/$chatId"
            params={{ chatId: conversation._id }}
            search={{ page: 1, limit: 20 }}
          >
            <p>{conversation.participants.filter((user) => user._id !== userId).at(0)?.username}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
