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
import { SigninValidarion } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useSignInAccount } from "@/lib/react-query/queriesandMutations";
import { useUserContext } from "@/context/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react"; // Import useState

const SigninForm = () => {
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync: signInAccount } = useSignInAccount();

  const [isSigningIn, setIsSigningIn] = useState(false); // Manual loading state

  const form = useForm<z.infer<typeof SigninValidarion>>({
    resolver: zodResolver(SigninValidarion),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  async function onSubmit(values: z.infer<typeof SigninValidarion>) {
    setIsSigningIn(true); // Start loader

    try {
      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
         toast.success(`Welcome, ${values.email.split("@")[0]} ! 🎉`);
        navigate("/");
        return;
      }

      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) {
        toast.error("Sign in failed. Please try again.");
        return;
      }

      await checkAuthUser();
      toast.success(`Welcome, ${values.email.split("@")[0]} ! 🎉`);
      form.reset();
      navigate("/");
      
    } catch (error) {
      console.error("Error signing in:", error);
      if (error.message.includes("Creation of a session is prohibited")) {
        toast.info("You're already signed in.");
        navigate("/");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setIsSigningIn(false); // Stop loader
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h2-bold md:h2-bold pt-5 sm:pt-4">Log in to your account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex flex-col w-full mt-1">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" placeholder="enter your email" {...field} />
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
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="shad-input"
                        {...field}
                        placeholder="enter your password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button className="shad-button_primary" type="submit" disabled={isSigningIn}>
            {isSigningIn ? (
              <div className="flex-center gap-2">
                <Loader /> Signing in...
              </div>
            ) : "Sign-in"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1"> Sign up</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;

