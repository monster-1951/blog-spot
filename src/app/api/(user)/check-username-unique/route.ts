// src/app/api/check-username-unique/route.ts
import UserModel from "@/database/models/user.model";
import { NextResponse } from "next/server";
import { z } from "zod";

// Example: Dummy function to simulate database lookup
async function isUsernameUnique(username: string) {
  // Implement the actual database check here
  const existingUser = await UserModel.findOne({ UserName: username });
  if (existingUser) {
    return false;
  }
  if (!existingUser) {
    return true;
  }
}

const usernameSchema = z
  .string()
  .min(3)
  .max(30);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") as string;

  // if (!username) {
  //   return NextResponse.json(
  //     { message: "Username must be greater than 3 characters" },
  //     { status: 400 }
  //   );
  // }
  // if (username.length > 30) {
  //   return NextResponse.json(
  //     { message: "Username should not be greater than 30 characters" },
  //     { status: 400 }
  //   );
  // }
  
  try {
    // Validate the username
    // usernameSchema.parse(username);

    const isUnique = await isUsernameUnique(username);
    if (isUnique && username.length!==0) {
      return NextResponse.json(
        { message: "Username is unique" },
        { status: 200 }
      );
    } else if(username.length==0) {
      return NextResponse.json(
        { message: "" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { message: "Username is already taken" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: error || "Invalid username" },
      { status: 400 }
    );
  }
}
