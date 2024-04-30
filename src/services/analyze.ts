/* eslint-disable no-empty */
import apiInstance, { apiURLs } from "./client";
import { IAnalyzePayload } from "@/types/analyze";


export default async function Analyze(payload: IAnalyzePayload) {

    try {
        const response = await apiInstance.post(apiURLs.analyze, payload);
        const processedResponse = await response.data;
        console.log(processedResponse);
        // return RecognizeResponseSchema.parse(processedResponse)
    } catch { }

}