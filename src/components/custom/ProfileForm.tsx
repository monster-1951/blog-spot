"use client";
import { editProfileSchema } from "@/schemas/editProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import Selectt from "./Selectt";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
const ProfileForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [base64, setBase64] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [preview, setpreview] = useState<string | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const user = session?.user;
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      Email: user.Email,
      FullName: user.FullName,
      DateOfBirth: user.DateOfBirth,
      MobileNumber: user.MobileNumber,
      Gender: user.Gender,
      mediaInput: user.media,
    },
  });

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read file as base64"));
        }
      };

      reader.onerror = () => {
        reject(new Error("Error reading file"));
      };

      reader.readAsDataURL(file);
    });
  };
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64String = await convertImageToBase64(file);
        setBase64(base64String);
        console.log(base64String, "😘");
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
      setpreview(URL.createObjectURL(file));
      console.log(preview);
    }
  };

  async function onSubmit(values: z.infer<typeof editProfileSchema>) {
    values.media = base64 as string;
    try {
      const response = await axios.post(
        "api/update-user",
        values
      );
      console.log("👍", values, "This is the data from onSubmit function");

      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace("/");
    } catch (error) {
      console.log("👍", error, "Error in updating ❤️");
      toast({
        title: "Failed to Update the user details",
        variant: "destructive",
      });
    }

    console.log(values);
  }
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Media Input*/}
          <div className="flex space-x-2 justify-between p-3">
            <FormField
              control={form.control}
              name="mediaInput"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel className="my-auto">Select an image</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        {...field}
                        type="file"
                        className="w-fit"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row p-5 sm:space-x-3 space-y-3 ">
              {preview && (
                <div className="mt-3 h-fit">
                  <Image
                    width={600}
                    src={preview}
                    alt="Preview"
                    className="w-20 sm:w-20 rounded-full mx-auto"
                    height={600}
                  />
                </div>
              )}
              <div className="flex justify-between my-auto p-2">
                {preview ? (
                  <>
                    <Button
                      variant={"outline"}
                      type="button"
                      onClick={() => {
                        fileInputRef.current?.click();
                      }}
                      className="text-green-600 border-none my-auto"
                    >
                      Change Image
                    </Button>
                    <Button
                      variant={"outline"}
                      type="button"
                      onClick={() => {
                        setpreview(null);
                      }}
                      className="text-red-500 border-none my-auto"
                    >
                      Remove Image
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      onClick={() => {
                        fileInputRef.current?.click();
                      }}
                      className="w-fit mx-auto"
                    >
                      Select an Image
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* media */}
          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel className="my-auto">Media</FormLabel>
                <FormControl>
                  <Input {...field} value={base64} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex">
            <div className="flex flex-col ">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="FullName"
                render={({ field }) => (
                  <FormItem className="p-3">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl className="">
                      <Input placeholder="Your Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem className="p-3">
                    <FormLabel>Email</FormLabel>
                    <FormControl className="">
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="MobileNumber"
                render={({ field }) => (
                  <FormItem className="p-3">
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mobile number"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col p-2 space-y-8">
              <FormField
                control={form.control}
                name="DateOfBirth"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mobile number"
                        {...field}
                        type="date"
                      />
                    </FormControl>
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
                      <Selectt
                        value={field.value}
                        onChange={field.onChange}
                        options={["Male", "Female", "Prefer not to say"]}
                        placeHolder="Gender"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="w-fit mx-auto">
              Update Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
