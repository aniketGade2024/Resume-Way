import { z } from "zod";

export const RecognizeSchema = z.object({
    imageBase64: z.string()
})

export const RecognizeResponseSchema = z.object({
    message: z.string(),
    data: z.object({
        text: z.string()
    })
})