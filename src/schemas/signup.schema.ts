import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "username must be atleast 2 characters.")
  .max(10, "username must be no more than 20 characters.")
  .regex(/^[a-zA-Z0-9_]+$/, "Username cannot contains special characters.");

export const singupSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "invalid email." }),
  password: z
    .string()
    .min(8, { message: "password must be atleast 8 characters." }),
});
