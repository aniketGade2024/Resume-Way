import { z } from "zod";
import { RecognizeSchema } from "./Schemas/recognize";

export type IRecognizePayload = z.infer<typeof RecognizeSchema>;