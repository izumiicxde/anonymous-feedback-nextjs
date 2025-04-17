import dbconnect from "@/lib/dbconnect";
import UserModel from "@/models/user.model";
import mongoose from "mongoose";
import { IMessage } from "@/models/user.model";

export async function POST(request: Request) {
  await dbconnect();
  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }
    // IS USER ACCEPTING MESSAGES
    if (!user.isAcceptingMessage) {
      return Response.json(
        { success: false, message: "User is not accepting messages." },
        { status: 403 }
      );
    }
    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as IMessage);
    await user.save();
    return Response.json(
      { success: true, message: "Feedback sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
