// "use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidarion } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { Link } from "react-router-dom"
import { createUserAccount } from "@/lib/appwrite/api"


const SignupForm = () => {
  const isLoading = false;
  const toast = useToast()
  
   // 1. Define your form.
   const form = useForm<z.infer<typeof SignupValidarion>>({
    resolver: zodResolver(SignupValidarion),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidarion>) {
    const newUser = createUserAccount({
      name: values.name || "", 
      username: values.username || "", 
      email: values.email || "", 
      password: values.password || ""  

    });

    if(!newUser){
      return toast.toast({
        title: "Sign up failed. please try again",
      })
    }

    // const session = await signInaccount()
    
}


  return (
       <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.svg" alt="logo" />
          <h2 className="h2-bold md:h2-bold pt-5 sm:pt-4">Create a new account</h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">To use Snapgram, please enter your account details
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="shad-button_primary" type="submit">
          {isLoading ? (
            <div className="flex-center gap-2">
             <Loader /> loading...
            </div>
          ): "Sign-up"}
        </Button>

        <p className="text-small-regular text-light-2 text-center mt-2">Already have an account
          <Link to="/sign-in" className="text-primary-500 text-small-semibold mI-1"> Log in</Link>
        </p>


      </form>
      </div>
    </Form>
  )
}

export default SignupForm;