import { useInfiniteQuery } from '@tanstack/react-query';
import { getMessages } from '@/api/getMessages';

const useMessages = (chatId: string, token: string) => {
  return useInfiniteQuery({
    queryKey: ['conversations', 'messages', chatId],
    queryFn: ({ pageParam }) => getMessages({ pageParam, chatId, token }),
    initialPageParam: -1,
    getNextPageParam: (lastPage) => lastPage.messagesData.nextPage,
    getPreviousPageParam: (lastPage) => lastPage.messagesData.previousPage,
    staleTime: 300000,
  });
};

export default useMessages;
