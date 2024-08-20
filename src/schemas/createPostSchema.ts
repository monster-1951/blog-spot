import { z } from "zod";

export const createPostSchema = z.object({
  postedBy: z.string({required_error:"Who is posting?"}),
  title: z.string({ required_error: "Post title is required" }).max(1000),
  content: z
    .string({ required_error: "Blog can't exist without content 🥲" })
    .min(10),
  category: z.string({ required_error: "Category?" }),
  media: z.string().optional(),
  mediaInput:z.string().optional(),
  id:z.string().optional()
});

