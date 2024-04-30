/* eslint-disable no-empty */
import { IRecognizePayload } from "@/types/recognize";
import apiInstance, { apiURLs } from "./client";
import { RecognizeResponseSchema } from "@/types/Schemas/recognize";


export default async function Recognize(payload: IRecognizePayload) {

    try {
        const response = await apiInstance.post(apiURLs.recognize, payload);
        const processedResponse = await response.data;
        return RecognizeResponseSchema.parse(processedResponse)
    } catch { }

}