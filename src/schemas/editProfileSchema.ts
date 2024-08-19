import { z } from "zod";

export const editProfileSchema = z.object({
    media:z.string().optional(),
    FullName:z.string().optional(),
    DateOfBirth:z.string().optional(),
    mediaInput:z.string().optional(),
    MobileNumber: z
      .string()
      .length(10, "Enter a valid mobile number")
      .optional(),
    Email:z.string().email({ message: "Invalid email address" }).optional(),
    Gender:z.string().optional()
})

