import { z } from "zod";

export const ExtractResumeJsonPayload = z.object({
    prompt: z.string()
})
