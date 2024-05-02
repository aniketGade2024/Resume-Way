/* eslint-disable no-empty */
import { ResponseAnalyzeSchema } from "@/types/Schemas/analyze";
import apiInstance, { apiURLs } from "./client";
import { IAnalyzePayload } from "@/types/analyze";


export default async function Analyze(payload: IAnalyzePayload) {

    try {
        const response = await apiInstance.post(apiURLs.analyze, payload);
        const processedResponse = await response.data;
        return ResponseAnalyzeSchema.parse(processedResponse)
    } catch { }

}