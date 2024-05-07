/* eslint-disable no-empty */
import { GenerateQuestionResponseSchema } from "@/types/Schemas/generateQuestions";
import apiInstance, { apiURLs } from "./client";
import { IGenerateQuestionsPayload } from "@/types/generateQuestions";


export default async function GenerateQuestions(payload: IGenerateQuestionsPayload) {
    try {
        const response = await apiInstance.post(apiURLs.generateQuestions, payload);
        const processedResponse = await response.data;
        return GenerateQuestionResponseSchema.parse(processedResponse);
    } catch {
        return GenerateQuestionResponseSchema.parse({})
    }

}