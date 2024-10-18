import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { getMessages } from '@/api/getMessages';

const useMessages = (chatId: string, token: string) => {
  return useInfiniteQuery({
    queryKey: ['conversations', 'messages', chatId],
    queryFn: ({ pageParam }) => getMessages({ pageParam, chatId, token }),
    initialPageParam: -1,
    getNextPageParam: (lastPage) => lastPage.messagesData.nextPage,
    getPreviousPageParam: (lastPage) => lastPage.messagesData.previousPage,
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });
};

export default useMessages;
