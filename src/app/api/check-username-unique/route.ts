import dbconnect from "@/lib/dbconnect";
import UserModel from "@/models/user.model";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signup.schema";

const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbconnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
    };
    // Validate with zod
    const result = usernameQuerySchema.safeParse(queryParams);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(",")
              : "Error validating username",
        },
        {
          status: 500,
        }
      );
    }
    const { username } = result.data;
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "user with this username already exists",
        },
        {
          status: 400,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Username is valid and available",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error checking username", error);
    return Response.json(
      {
        success: false,
        message: "Error validating username",
      },
      {
        status: 500,
      }
    );
  }
}
