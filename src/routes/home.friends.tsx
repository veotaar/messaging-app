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

export const Route = createFileRoute('/home/friends')({
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
});

const formSchema = z.object({
  email: z.string().email(),
});

function HomeFriendsComponent() {
  const [emailToSearch, setEmailToSearch] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setEmailToSearch(values.email);
  };

  const { token } = useAuth();

  const { isLoading, data: foundUser } = useQuery({
    queryKey: ['find-user', { email: emailToSearch }],
    queryFn: () => findUserByEmail(emailToSearch as string, token as string),
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
                <FormLabel>Enter your friends email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="some@email.com" {...field} />
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
      <div>
        {foundUser && (
          <div>
            <p>{foundUser.user._id}</p>
            <p>{foundUser.user.email}</p>
            <p>{foundUser.user.username}</p>
          </div>
        )}
      </div>
    </div>
  );
}
