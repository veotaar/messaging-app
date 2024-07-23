import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { registerUser } from '@/api/login';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/lib/auth';

const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(4).max(32),
  password: z.string().min(8).max(64),
  passwordConfirm: z.string().min(8).max(64),
});

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const { setUser, setToken, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const {
    mutate: loginMutate,
    isPending,
    isError,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      navigate({ to: '/' });
      const token = data.jwt?.token;
      const user = data.user?.username;
      if (token && user) {
        setToken(token);
        setUser(user);
      }
    },
    onError: (error) => {
      console.error(error);
      form.reset();
      form.setFocus('email');
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
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
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                {/* <FormDescription>8 characters minimum</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Loading...' : 'Register'}
          </Button>
        </form>
      </Form>
      {isError && <p className="mx-auto mt-4 max-w-sm text-red-500">Something went wrong</p>}
    </>
  );
};

export default RegisterForm;
