import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useNavigate } from "@tanstack/react-router";
import { generatePassword } from "password-generator";
import { useForm } from "react-hook-form";
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { z } from "zod";

import { loginUser, registerUser } from "@/api/login";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { socket } from "@/lib/socket";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(64),
});

const generateGuestCredentials = async () => {
  const baseUsername = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: "-",
    length: 2,
  });
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const username = `${baseUsername}-${randomNumber}`;
  const email = `${username}@example.com`;
  const password = await generatePassword();

  return {
    username,
    email,
    password,
    passwordConfirm: password,
  };
};

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setUser, setToken, isAuthenticated, setExpires, setUserId } =
    useAuth();
  const navigate = useNavigate();

  const handleAuthSuccess = (data: Awaited<ReturnType<typeof loginUser>>) => {
    const token = data.jwt?.token;
    const expires = data.jwt?.expires;
    const user = data.user?.username;
    const userId = data.user?._id;
    if (token && user && expires) {
      socket.connect();
      setToken(token);
      setUser(user);
      setExpires(expires);
      setUserId(userId);
      localStorage.setItem("user", user);
      localStorage.setItem("token", token);
      localStorage.setItem("expires", expires.toString());
      localStorage.setItem("userId", userId);
    }

    setTimeout(() => navigate({ to: "/home/conversations" }), 0);
  };

  const {
    mutate: loginMutate,
    isPending,
    isError,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: handleAuthSuccess,
    onError: (error) => {
      console.error(error);
      form.resetField("password");
      form.setFocus("password");
    },
  });

  const {
    mutateAsync: registerMutateAsync,
    isPending: isGuestPending,
    isError: isGuestError,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: handleAuthSuccess,
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    loginMutate(values);
  };

  const handleGuestLogin = async () => {
    const guestCredentials = await generateGuestCredentials();
    await registerMutateAsync(guestCredentials);
  };

  if (isAuthenticated) {
    return <Navigate to="/home/conversations" />;
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-sm space-y-8 rounded border bg-card p-4 shadow-xs"
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
          <div className="flex gap-2">
            <Button type="submit" disabled={isPending || isGuestPending}>
              {isPending ? "Loading..." : "Login"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isPending || isGuestPending}
              onClick={handleGuestLogin}
            >
              {isGuestPending ? "Creating guest..." : "Continue as Guest"}
            </Button>
          </div>
        </form>
      </Form>
      {(isError || isGuestError) && (
        <p className="mx-auto mt-4 max-w-sm text-red-500">
          Something went wrong
        </p>
      )}
    </>
  );
};

export default LoginForm;
