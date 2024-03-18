import { z } from "zod";

const schema = z.object({
  login: z
    .string()
    .min(6, { message: "Password is too short, min 6" })
    .max(30, { message: "Password is too long, max 30" }),
  password: z
    .string()
    .min(6, { message: "Password is too short, min 6" })
    .max(20, { message: "Password is too long, max 20" })
});

export default schema;