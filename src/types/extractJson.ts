import { z } from "zod";
import { ExtractResumeJsonPayload } from "./Schemas/extractJson";


export type IExtractJsonPayload = z.infer<typeof ExtractResumeJsonPayload>;