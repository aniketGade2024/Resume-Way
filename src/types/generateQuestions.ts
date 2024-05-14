import { z } from "zod";
import { GenerateQuestionsPayload } from "./Schemas/generateQuestions";

export type IGenerateQuestionsPayload = z.infer<typeof GenerateQuestionsPayload>