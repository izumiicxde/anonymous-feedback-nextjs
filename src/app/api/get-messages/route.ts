import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbconnect from "@/lib/dbconnect";
import UserModel from "@/models/user.model";
import mongoose from "mongoose";
import { response } from "@/helpers/general";

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

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const foundUser = await UserModel.findById(userId);
    if (foundUser?.messages.length === 0 || !foundUser?.messages) {
      return response(true, "no messages to show", 200);
    }

    // const foundUser = await UserModel.aggregate([
    //   { $match: { _id: userId } }, //finds user based on id
    //   { $unwind: "$messages" }, //opens up the array named messages and creates multiple objects rather than an array of object.
    //   // //advantage of above is to sort or do some other operation on it.
    //   { $sort: { "messages.createdAt": -1 } },
    //   // { $group: { _id: "$_id", messages: { $push: "$messages" } } }, //make all messages into one user kinda thing.
    // ]).exec();

    // if (!foundUser || foundUser.length === 0) {
    //   return Response.json(
    //     { success: false, message: "User not found." },
    //     { status: 401 }
    //   );
    // }
    return Response.json(
      { success: true, messages: foundUser.messages, user: foundUser },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "not authenticated" },
      { status: 500 }
    );
  }
}
