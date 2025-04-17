// THIS IS DEAD CODE.
/**
 * I wrote this code for manual signing in of user.
 * But the use of Next-Auth made this dead code.
 * Will keep this cause it looks cool.
 */
// import { response } from "@/helpers/general";
// import dbconnect from "@/lib/dbconnect";
// import UserModel from "@/models/user.model";
// import bcrypt from "bcryptjs";

// // response() function returns Response.json() with params success status and message.
// export async function GET(request: Request) {
//   await dbconnect();
//   try {
//     const { identifier, password } = await request.json();
//     if (identifier === "" || password === "")
//       return response(false, "All fields are required", 400);
//     const foundUser = await UserModel.findOne({
//       $or: [{ username: identifier }, { email: identifier }],
//     });

//     if (!foundUser) return response(false, "user not found", 404);

//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       foundUser.password
//     );
//     if (!isPasswordCorrect) return response(false, "invalid credentials", 401);

//     return response(true, "signin successfull", 200);
//   } catch (error) {
//     return response(false, "There was an logging in. Please try later", 500);
//   }
// }
