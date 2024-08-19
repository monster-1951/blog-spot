import dbConnect from "@/database/ConnectDB";
import UserModel from "@/database/models/user.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// UPDATE USER

export async function POST(request: Request) {
  await dbConnect();

  const { FullName, MobileNumber, Email, media, DateOfBirth, Gender } =
    await request.json();
  console.log(
    {
      FullName,
      MobileNumber,
      Email,
      ProfilePicture: media,
      DateOfBirth,
      Gender,
    },
    "👍Updating user"
  );

  const User = {
    FullName,
    MobileNumber: MobileNumber ? MobileNumber : "",
    Email,
    ProfilePicture: media,
    DateOfBirth,
    Gender,
  };
  console.log(User, "🍻");
  try {
    const newUser = await UserModel.updateOne({ Email }, User);
    revalidatePath('/')
    // redirect('/')
    return Response.json(
      {
        success: true,
        message: "User Registered Successfully",
        newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in creating User", error);
    return Response.json(
      {
        success: false,
        message: "Error in creating the user",
        error,
      },
      { status: 500 }
    );
  }
}
