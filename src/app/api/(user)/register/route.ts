import dbConnect from "@/database/ConnectDB";
import UserModel from "@/database/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  const { UserName, FullName, MobileNumber, password, email, ProfilePicture,DateOfBirth,Gender } =
    await request.json();
  console.log(
    { UserName, FullName, MobileNumber, password, email, ProfilePicture ,DateOfBirth,Gender},
    "👍"
  );
  const hashedPassword = await bcrypt.hash(password, 12);
  const User = {
    UserName,
    FullName,
    MobileNumber: MobileNumber ? MobileNumber : "",
    Password: hashedPassword,
    Email: email,
    ProfilePicture,
    DateOfBirth,
    Gender
  };
  console.log(User, "🍻");
  try {
    const userExists = await UserModel.findOne({ Email: email });

    if (userExists) {
      throw new Error("User already exists");
    }

    const newUser = await UserModel.create(User);

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
