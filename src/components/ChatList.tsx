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
      {conversations.map((conversation) => {
        const chatWith = conversation.participants.filter((user) => user._id !== userId).at(0)?.username as string;
        return (
          <div key={conversation._id} className="mb-2">
            <Link
              from="/home/conversations"
              to="/home/conversations/$chatId"
              params={{ chatId: conversation._id }}
              search={{ to: chatWith }}
              activeOptions={{ exact: true }}
              activeProps={{ className: 'font-bold' }}
            >
              <div className="border p-4 hover:bg-slate-200">{chatWith}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
