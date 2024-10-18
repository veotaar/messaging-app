import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from './ui/textarea';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { useSendMessageMutation } from '@/api/queryOptions';
import { socket } from '@/lib/socket';
import { useRef } from 'react';

const formSchema = z.object({
  message: z.string().min(1),
});

const MessageBox = ({ chatId }: { chatId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  const formRef = useRef<null | HTMLFormElement>(null);

  const { token } = useAuth();

  const { mutate, isPending, isError } = useSendMessageMutation(chatId);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(
      {
        token: token as string,
        conversationId: chatId,
        content: values.message,
      },
      {
        onSuccess: (data) => {
          form.reset();
          if (socket) {
            socket.emit('sendMessage', data);
          }
        },
      },
    );
  };

  const onEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter') return;
    if (e.shiftKey) return;
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex rounded border bg-card" ref={formRef}>
          <div className="flex-grow">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Your message"
                      className="h-auto resize-none"
                      {...field}
                      onKeyDown={(e) => onEnter(e)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </Form>
      {isError && <p className="mx-auto mt-4 max-w-sm text-red-500">Something went wrong</p>}
    </>
  );
};

export default MessageBox;
