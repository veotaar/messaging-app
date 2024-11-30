import { ConversationListResponse } from '@/api/getConversations';
import { useAuth } from '@/lib/auth';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Input } from './ui/input';

const ChatList = ({ conversations }: ConversationListResponse) => {
  const { userId } = useAuth();
  const [inputFilter, setInputFilter] = useState('');

  if (conversations.length === 0) {
    return <div>you dont have any conversations yet</div>;
  }

  return (
    <div>
      <div className="p-2 text-lg font-bold">
        <h2>Conversations</h2>
      </div>
      <Input
        className="mb-2 rounded"
        placeholder="Search..."
        value={inputFilter}
        onChange={(e) => setInputFilter(e.target.value)}
      />
      <div className="flex flex-col font-semibold">
        {conversations
          .filter((conversation) => {
            const chatWith = conversation.participants.filter((user) => user._id !== userId).at(0)?.username as string;
            return chatWith.toLowerCase().includes(inputFilter.toLowerCase());
          })
          .map((conversation) => {
            const chatWith = conversation.participants.filter((user) => user._id !== userId).at(0)?.username as string;
            return (
              <Link
                className="mb-2 rounded border border-transparent p-4 hover:bg-muted"
                key={conversation._id}
                from="/home/conversations"
                to="/home/conversations/$chatId"
                params={{ chatId: conversation._id }}
                search={{ to: chatWith }}
                activeOptions={{ exact: true }}
                activeProps={{ className: 'bg-muted border-border shadow' }}
              >
                {chatWith}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default ChatList;
