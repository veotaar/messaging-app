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
        <div key={conversation._id} className="mb-2">
          <Link
            from="/conversations"
            to="/conversations/$chatId"
            params={{ chatId: conversation._id }}
            search={{ page: 1, limit: 20 }}
            activeOptions={{ exact: true }}
            activeProps={{ className: 'font-bold' }}
          >
            <div className="border p-4 hover:bg-slate-200">
              {conversation.participants.filter((user) => user._id !== userId).at(0)?.username}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
