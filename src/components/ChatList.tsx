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
      <Input
        className="mb-2"
        placeholder="Search"
        value={inputFilter}
        onChange={(e) => setInputFilter(e.target.value)}
      />
      {conversations
        .filter((conversation) => {
          const chatWith = conversation.participants.filter((user) => user._id !== userId).at(0)?.username as string;
          return chatWith.toLowerCase().includes(inputFilter.toLowerCase());
        })
        .map((conversation) => {
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
                <div className="rounded border p-4 hover:bg-muted">{chatWith}</div>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default ChatList;
