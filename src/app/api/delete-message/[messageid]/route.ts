import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbconnect from "@/lib/dbconnect";
import UserModel from "@/models/user.model";
import { response } from "@/helpers/general";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const messageid = params.messageid;

  await dbconnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session?.user)
    return response(false, "not authenticated", 401);

  try {
    const updateResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageid } } }
    );
    if (updateResult.modifiedCount == 0)
      return response(false, "Message not found or already deleted.", 404);
    return response(true, "Message deleted.", 200);
  } catch (error) {
    // TODO: remove this log
    console.log(error);
    return response(false, "Error deleting the message :(", 500);
  }
}
