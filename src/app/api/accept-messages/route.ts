import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbconnect from "@/lib/dbconnect";
import UserModel from "@/models/user.model";

export async function POST(request: Request) {
  await dbconnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session?.user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          messages: "Failed to update user status to accept messages",
        },
        { status: 401 }
      );
    } else {
      return Response.json(
        { success: true, messages: "User is now accepting messages" },
        { status: 200 }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        messages: "failed to update user status to accept messages",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await dbconnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session?.user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  const userId = user._id;
  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, isAcceptingMessages: foundUser.isAcceptingMessage },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Error getting message status" },
      { status: 500 }
    );
  }
}
