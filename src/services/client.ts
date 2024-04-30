import axios from "axios";

const apiInstance = axios.create({
    baseURL: "https://mighty-ninjha.loca.lt/",
    headers: {
        "Content-Type": "application/json"
    },
})


export const apiURLs = {
    recognize: "/recognize/",
    analyze: "/analyze/",
    extractResumeJson: '/extract_resume_json/',
    extractJdJson:'/extract_JD_json/'
}

export default apiInstance;