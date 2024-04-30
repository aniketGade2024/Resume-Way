import { z } from "zod";
import { AnalyzePayloadSchema } from "./Schemas/analyze";

export type IAnalyzePayload = z.infer<typeof AnalyzePayloadSchema>;