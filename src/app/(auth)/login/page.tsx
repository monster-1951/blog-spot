"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/loginSchema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link";

const Login = () => {
  const [isSubmitting, setisSubmitting] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setisSubmitting(true)
    const result = await signIn("credentials", {
      redirect: false,
      email: values.identifier,
      password: values.password,
    }).catch(() => {
      
      setisSubmitting(false)
    }
    );
    setisSubmitting(false)
    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
      setisSubmitting(false)
    }

    if (result?.url) {
      router.replace('/');
    }
    console.log(values);
  }
  return (
    <div className="w-fit mx-auto my-10 border-2 p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your Email id" {...field} type="email" />
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
                  <Input
                    placeholder="Your Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <div className="flex justify-between">
        <Link href={'/register'}>
        <Button type="button">Register</Button>
        </Link>
        <Button type="submit">{isSubmitting?"Loading....":"Login"}</Button>
        </div>
          
        </form>
      </Form>
    </div>
  );
};

export default Login;
