"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPostSchema } from "@/schemas/createPostSchema";
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
import Selectt from "@/components/custom/Selectt";
import { categories } from "../../../../../categories";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/ApiResponse";
import { Textarea } from "@/components/ui/textarea";
import { usePostContext } from "@/context/postProvider";
import { useRef, useState } from "react";
import Image from "next/image";
import removeIcon from "@/components/custom/removeIcon";
import { X } from "lucide-react";
const CreatePost = ({ params }: { params: { user_id: string } }) => {
  const [base64, setBase64] = useState<
    string | number | readonly string[] | undefined
  >("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setpreview] = useState<string | null>();
  const post = usePostContext();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      postedBy: params.user_id,
      title: post.post.title,
      content: post.post.content,
      category: "",
      media: "",
    },
  });
  console.log(params.user_id);
  async function onSubmit(values: z.infer<typeof createPostSchema>) {
    values.media = base64 as string;
    console.log(values);
    try {
      const response = await axios.post("/api/createNewPost", values);
      console.log("👍", values, "This is the data from onSubmit function");
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace(`/`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log(axiosError);
    }
  }

  const htmlToText = (htmlString: string): string => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;

    // Extract the plain text, with formatting evaluated
    return tempElement.textContent || tempElement.innerText || "";
  };

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
        // console.log(base64String, "😘");
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
      setpreview(URL.createObjectURL(file));
      console.log(preview);
    }
  };

  return (
    <>
      <div className="p-3 md:w-[50%] mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* postedBy */}
            {/* <FormField
              control={form.control}
              name="postedBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PostedBy</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* Hidden Title */}
            {/* <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* Hidden Content */}
            {/* <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} className="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* Title div */}
            <div className="p-3 h-20 text-2xl font-serif">
              {htmlToText(post.post.title)}
            </div>
            {/* Content div */}
            <div className="p-3 h-fit font-serif">
              {htmlToText(post.post.content)}
            </div>

            {/* Media Input*/}
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

            {preview && (
              <div className="mt-3 h-fit">
                <Image
                  width={500}
                  src={preview}
                  alt="Preview"
                  className=" object-cover mx-auto"
                  height={500}
                />
              </div>
            )}
            {/* 
<Button
                  variant={"outline"}
                  type="button"
                  onClick={() => {
                    setpreview(null);
                  }}
                >
                  Remove Image
                </Button> */}

            {/* <Button
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="w-fit mx-auto"
              >
                {preview ? "Change Image" : "Select an Image"}
              </Button> */}
            <div className="border flex justify-between">
              {preview ? (
                <>
                  <Button
                    type="button"
                    onClick={() => {
                      fileInputRef.current?.click();
                    }}
                    className="w-fit mx-auto"
                  >
                    Change Image
                  </Button>
                  <Button
                    variant={"outline"}
                    type="button"
                    onClick={() => {
                      setpreview(null);
                    }}
                  >
                   <X/>
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
            {/* media  */}

            <FormField
              control={form.control}
              name="media"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel className="my-auto">Media</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={base64}
                      // ref={fileInputRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category */}

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex justify-between">
                  <FormLabel className="my-auto">Category</FormLabel>
                  <FormControl>
                    <Selectt
                      value={field.value}
                      onChange={field.onChange}
                      options={categories}
                      placeHolder="Category"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-white border border-green-600 w-fit mx-auto text-green-600"
              >
                Publish
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreatePost;
