import dbConnect from "@/database/ConnectDB";
import UserModel from "@/database/models/user.model";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const {id} = params;
  console.log(id);
  await dbConnect()
  try {
    const user = await UserModel.findById(id)
    return Response.json({
      success: true,
      user,
    });
} catch (error) {
    console.log("Error in finding the user",error)
    return Response.json({
      success: false,
      error,
    });
  }
}
