import z from "zod";
import { requiredString } from "../util/utils";

export const registerSchema = z.object({
    email: z.email(),
    displayName: requiredString("displayName"),
    password: requiredString('password')
});

export type RegisterSchema = z.infer<typeof registerSchema>;