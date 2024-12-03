import { createFileRoute, redirect } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { findUserByEmail } from '@/api/findUserByEmail';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useMakeFriendRequestMutation, friendsQueryOptions, friendRequestsQueryOptions } from '@/api/queryOptions';

export const Route = createFileRoute('/home/find-friends')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: HomeFriendsComponent,
  loader: async ({ context }) => {
    const { userId, token } = context.auth;
    // return await context.queryClient.ensureQueryData(friendsQueryOptions(userId as string, token as string));
    return await Promise.all([
      context.queryClient.ensureQueryData(friendsQueryOptions(userId as string, token as string)),
      context.queryClient.ensureQueryData(friendRequestsQueryOptions(userId as string, token as string)),
    ]);
  },
});

const formSchema = z.object({
  email: z.string().email(),
});

function HomeFriendsComponent() {
  const loaderData = Route.useLoaderData();
  const [emailToSearch, setEmailToSearch] = useState<string | null>(null);
  const [addFriendButtonText, setAddFriendButtonText] = useState('Send Friend Request');

  const makeFriendRequestMutation = useMakeFriendRequestMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setEmailToSearch(values.email);
  };

  const { token, userId } = useAuth();

  const onFriendRequestSubmit = (to: string) => {
    makeFriendRequestMutation.mutate(
      {
        to: to,
        token: token as string,
      },
      {
        onError: () => {
          setAddFriendButtonText('cannot send request');
        },
        onSuccess: () => {
          setAddFriendButtonText('request sent!');
        },
      },
    );
  };

  const { isLoading, data: foundUser } = useQuery({
    queryKey: ['find-user', { email: emailToSearch }],
    queryFn: () => findUserByEmail(emailToSearch as string, token as string),
    retry: false,
    enabled: !!emailToSearch,
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-sm space-y-8 bg-card p-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Find user by email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your-friends-email@example.com" {...field} />
                </FormControl>
                {/* <FormDescription>Type your email</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Find User'}
          </Button>
        </form>
      </Form>
      <div className="mt-4">
        {foundUser && (
          <div className="mx-auto flex max-w-sm items-center justify-between rounded border bg-card p-4">
            <div>
              <p>{foundUser.user.username}</p>
              <p className="text-muted-foreground">{foundUser.user.email}</p>
            </div>
            <Button
              onClick={() => onFriendRequestSubmit(foundUser.user._id)}
              disabled={
                makeFriendRequestMutation.isError ||
                makeFriendRequestMutation.isSuccess ||
                foundUser.user._id === userId ||
                !!loaderData[0].friends.find((friend) => friend._id === foundUser.user._id) ||
                !!loaderData[1].sent.find((req) => req.to._id === foundUser.user._id)
              }
            >
              {addFriendButtonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
