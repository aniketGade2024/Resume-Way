import { LoginResponseSchema } from "@/types/Schemas/auth";
import { ILoginValidation } from "@/types/auth";
import { AppConstants } from "@/utils/helpers/constants";

export default async function UserLogin(payload: ILoginValidation) {
    // try {
    //     const response = await apiInstance.post(apiURLs.extractResumeJson, payload);
    //     const processedResponse = await response.data;
    //     return processedResponse;
    // } catch {
    //     return {
    //         success: false, error: true
    //     }
    // }
    try {
        if (payload.email === AppConstants.USER_EMAIL && payload.password === AppConstants.USER_PASSWORD) {
            return LoginResponseSchema.parse({ success: true })
        }
        return LoginResponseSchema.parse({ success: false })
    } catch {
        return LoginResponseSchema.parse({ success: false })
    }
}