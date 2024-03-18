import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(6, { message: "Password is too short, min 6" })
    .max(30, { message: "Password is too long, max 30" }),
  email: z
    .string()
    .email("Invalid e-mail"),
  password: z
    .string()
    .min(6, { message: "Password is too short, min 6" })
    .max(20, { message: "Password is too long, max 20" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default schema;