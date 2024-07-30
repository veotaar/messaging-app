import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { loginUser } from '@/api/login';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/lib/auth';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(64),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { setUser, setToken, isAuthenticated, setExpires, setUserId } = useAuth();
  const navigate = useNavigate();
  const {
    mutate: loginMutate,
    isPending,
    isError,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const token = data.jwt?.token;
      const expires = data.jwt?.expires;
      const user = data.user?.username;
      const userId = data.user?._id;
      if (token && user && expires) {
        setToken(token);
        setUser(user);
        setExpires(expires);
        setUserId(userId);
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);
        localStorage.setItem('expires', expires.toString());
        localStorage.setItem('userId', userId);
      }

      setTimeout(() => navigate({ to: '/conversations' }), 0);
    },
    onError: (error) => {
      console.error(error);
      form.resetField('password');
      form.setFocus('password');
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    loginMutate(values);
  };

  if (isAuthenticated) {
    return <p className="text-center">You are already logged in</p>;
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-sm space-y-8 rounded border bg-card p-4 shadow-sm"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email" {...field} />
                </FormControl>
                {/* <FormDescription>Type your email</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                {/* <FormDescription>8 characters minimum</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </Form>
      {isError && <p className="mx-auto mt-4 max-w-sm text-red-500">Something went wrong</p>}
    </>
  );
};

export default LoginForm;
