import { z } from "zod";

export const AnalyzePayloadSchema = z.object({
    resume:z.string(),
    job_description:z.string()
})
