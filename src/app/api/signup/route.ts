import dbconnect from "@/lib/dbconnect";
import UserModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendverificationemail";

export async function POST(req: Request) {
    await dbconnect();

    try {
        const { username, email, password } = await req.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        });
        if (existingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "username already taken.",
                },
                {
                    status: 400,
                }
            );
        }
        const existingUserByEmail = await UserModel.findOne({
            email,
        });

        // creates 6 digit random number.
        const verifyCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: "User already exists with this email",
                    },
                    {
                        status: 400,
                    }
                );
            } else {
                const hashedpassword = await bcrypt.hash(password, 10);

                existingUserByEmail.password = hashedpassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(
                    Date.now() + 3600000
                );
                await existingUserByEmail.save();
            }
        } else {
            const hashedpassword = await bcrypt.hash(password, 10);
            // below const is still modifiable. cause expiryDate is object not a variable
            // and we can modify items of object even if they are const.
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedpassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: [],
            });
            await newUser.save();

            const emailResponse = await sendVerificationEmail(
                email,
                username,
                verifyCode
            );
            if (!emailResponse.success)
                return Response.json(
                    {
                        success: false,
                        message: emailResponse.message,
                    },
                    {
                        status: 500,
                    }
                );
        }

        return Response.json(
            {
                success: true,
                message:
                    "User registered successfully. A verification email is sent to your email.",
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log("Error signing in user: ", error);
        return Response.json(
            {
                success: false,
                message: "Error registering user.",
            },
            {
                status: 500,
            }
        );
    }
}
