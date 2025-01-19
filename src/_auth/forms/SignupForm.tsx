// "use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from '@/components/ui/button';
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidarion } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesandMutations";
import { useUserContext } from "@/context/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {EyeOff, Eye} from "lucide-react"
import { useState } from "react";

const SignupForm = () => {
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();
  
  const form = useForm<z.infer<typeof SignupValidarion>>({
    resolver: zodResolver(SignupValidarion),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  });

  async function onSubmit(values: z.infer<typeof SignupValidarion>) {
    try {
      const newUser = await createUserAccount({
        name: values.name || "",
        username: values.username || "",
        email: values.email || "",
        password: values.password || "",
      });

      if (!newUser) {
        toast.error("Sign up failed. Please try again.");
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (!isLoggedIn) {
        const session = await signInAccount({
          email: values.email,
          password: values.password,
        });

        if (!session) {
          toast.error("Sign in failed. Please try again.");
          return;
        }
      }

      // Show a single welcome message instead of multiple popups
      toast.success(`Welcome, ${values.username}! 🎉`);

      form.reset();
      navigate("/");
      
    } catch (error) {
      console.error("Error signing in:", error);

      if (error.message.includes("Creation of a session is prohibited")) {
        navigate("/"); // Redirect if already logged in
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h2-bold md:h2-bold pt-5 sm:pt-4">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Snapgram, please enter your account details.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex flex-col w-full mt-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
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
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              const [showPassword, setShowPassword] = useState(false);

              return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                  <Input type={showPassword ? "text" : "password"} className="shad-input" {...field} />
                  <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? < EyeOff size={24}/> : <Eye size={24} />}
                      </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
          <Button className="shad-button_primary" type="submit">
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : "Sign-up"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1"> Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
