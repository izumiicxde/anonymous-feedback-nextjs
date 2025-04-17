import { z } from "zod";

export const signinSchema = z.object({
  // either email or username.
  identifier: z.string(),
  password: z.string(),
});
