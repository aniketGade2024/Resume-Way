import { z } from "zod";
import { LoginResponseSchema, LoginSchema } from "./Schemas/auth";

export type ILoginValidation = z.infer<typeof LoginSchema>;
export type IResLoginValidation = z.infer<typeof LoginResponseSchema>;