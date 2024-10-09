import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from './ui/textarea';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { useSendMessageMutation } from '@/api/queryOptions';
import { socket } from '@/lib/socket';

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
            socket.emit('newMessage', data);
          }
        },
      },
    );
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-sm space-y-8 rounded border bg-card p-4 shadow-sm"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Your message" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
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
