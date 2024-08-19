"use client";
import { Button } from "@/components/ui/button";
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
import { registerSchema } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { Loader2 } from "lucide-react";
import { ApiResponse } from "@/types/ApiResponse";
import Selectt from "@/components/custom/Selectt";
const Register = () => {
  const [usernameMessage, setusernameMessage] = useState("");
  const [username, setusername] = useState("");
  const [isCheckingUserName, setisCheckingUserName] = useState(false);
  const debounced = useDebounceCallback(setusername, 300);
  const [Submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      UserName: "",
      email: "",
      FullName: "",
      MobileNumber: "",
      password: "",
      DateOfBirth: "",
    },
  });
  useEffect(() => {
    const checkUserNameUnique = async () => {
      if (username) {
        setisCheckingUserName(true);
        setusernameMessage("");
      }
      try {
        const response = await axios.get<ApiResponse>(
          `/api/check-username-unique?username=${username}`
        );
        setusernameMessage(response.data.message);
        // console.log("This is Api Respnose from axios🍻", response);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        console.log(axiosError);
        setusernameMessage(
          axiosError.response?.data.message ?? "Error checking username"
        );
        console.log(usernameMessage, "➕");
      } finally {
        setisCheckingUserName(false);
      }
    };
    checkUserNameUnique();
  }, [username]);
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setSubmitting(true);
    try {
      const response = await axios.post("/api/register", values);
      console.log("👍", values, "This is the data from onSubmit function");
      toast({
        title: "Success",
        description: response.data.message,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      router.replace(`/`);
      setSubmitting(false);
    } catch (error) {
      console.error("Error during sign-up:", error);

      const axiosError = error as AxiosError;

      // Default error message

      ("There was a problem with your sign-up. Please try again.");

      toast({
        title: "Sign Up Failed",
        variant: "destructive",
      });
      setSubmitting(false);
    }
    console.log(values);
  }
  return (
    <div className="w-fit mx-auto my-10 border-2 p-5">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Join Blog-Spot
        </h1>
        <p className="mb-4">Sign up to start your blogging journey</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="FullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* UserName */}
          <FormField
            control={form.control}
            name="UserName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value);
                    }}
                  />
                </FormControl>
                {!isCheckingUserName && usernameMessage && (
                  <p
                    className={`text-sm ${
                      usernameMessage === "Username is unique"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {usernameMessage}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Gender */}
          <FormField
            control={form.control}
            name="Gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Selectt value={field.value} onChange={field.onChange} options={["Male", "Female", "Prefer not to say"]} placeHolder="Gender" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* DOB */}
          <FormField
            control={form.control}
            name="DateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <Input
                    placeholder="How long have you been in this world"
                    {...field}
                    type="date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Mobile Number */}
          <FormField
            control={form.control}
            name="MobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder="Mobile Number" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Create a password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Link href={"/login"}>
              <Button type="button">Login</Button>
            </Link>
            <Button type="submit">
              {Submitting ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Register;
