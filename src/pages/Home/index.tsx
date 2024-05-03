/* eslint-disable react-hooks/exhaustive-deps */
import { AppButton, FileUploader } from "@/components/atoms";
import { Box, Typography } from "@mui/material";
import HomePageStyles from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import Recognize from "@/services/recognize";
import { IRecognizePayload } from "@/types/recognize";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { IAnalyzePayload } from "@/types/analyze";
import Analyze from "@/services/analyze";
import { ExtractJDJson, ExtractResumeJson } from "@/services/extractJson";
import { IExtractJsonPayload } from "@/types/extractJson";
import { useLoader } from "@/hooks";
import useAppStore from "@/store";
import { useNavigate } from "react-router-dom";

type IAnalyze = {
    resume?: string;
    job_description?: string;
}

const Home = () => {
    const [convertedJson, setConvertedJson] = React.useState<IAnalyze>({
        resume: '',
        job_description: ''
    })

    const [prompt, setPrompt] = React.useState<IAnalyze>({
        resume: '',
        job_description: ''
    })

    const [loadingText, setLoadingText] = React.useState<"resume" | "jd" | "process" | undefined>();

    const styles = HomePageStyles();
    const { loader, showLoader, hideLoader } = useLoader();
    const { setResumeInfo } = useAppStore();
    const navigate = useNavigate();

    const FileUploaderSchema = z.object({
        resume: z.string().min(1, 'Resume File is Required'),
        jd: z.string().min(1, 'jd file is required')
    })
    type IValidation = z.infer<typeof FileUploaderSchema>;

    const methods = useForm<IValidation>({
        resolver: zodResolver(FileUploaderSchema),
        defaultValues: {
            resume: '',
            jd: ''
        }
    });

    const { watch } = methods;

    //  Recognize Mutation 
    const RecognizeMutation = useMutation({
        mutationKey: ['RecognizeMutation'],
        mutationFn: (payload: IRecognizePayload) => Recognize(payload),
        onSuccess: () => {
            hideLoader();
        },
        onError: () => {
            console.log("Error");
        }
    })

    // Extract Resume JSON
    const ExtractResumeJsonMutation = useMutation({
        mutationKey: ['ExtractResumeJsonMutation'],
        mutationFn: (payload: IExtractJsonPayload) => ExtractResumeJson(payload),
        onSuccess: (data) => {
            setLoadingText(undefined);
            hideLoader();
            setConvertedJson({
                ...convertedJson, resume: JSON.stringify((data as any)?.output)
            })
        },
        onError: () => {
            hideLoader();
            console.log("Error");
        }
    })

    // Extract JD JSON
    const ExtractJDJsonMutation = useMutation({
        mutationKey: ['ExtractResumeJsonMutation'],
        mutationFn: (payload: IExtractJsonPayload) => ExtractJDJson(payload),
        onSuccess: (data) => {
            setLoadingText(undefined);
            hideLoader();
            setConvertedJson({
                ...convertedJson, job_description: JSON.stringify((data as any)?.output)
            })
        },
        onError: () => {
            hideLoader();
            console.log("Error");
        }
    })

    // Analyze API mutation
    const AnalyzeMutation = useMutation({
        mutationKey: ['AnalyzeMutation'],
        mutationFn: (payload: IAnalyzePayload) => Analyze(payload),
        onSuccess: (data) => {
            console.log(data);
            if (data) {
                setResumeInfo(data.output);
            }
            navigate({ pathname: "/user" })
            hideLoader();
        },
        onError: () => {
            hideLoader();
            console.log("Error");
        }

    })

    //  Call RECOGNIZE API
    const callRecognizeAPI = async (name: "resume" | "jd", imageBase64: string) => {
        showLoader();
        const payload: IRecognizePayload = {
            imageBase64
        }
        const response = await RecognizeMutation.mutateAsync(payload);
        if (response?.data?.text && name === "resume") {
            setPrompt({
                ...prompt, resume: response.data.text,
            })
        } else if (name === "jd" && response?.data?.text) {
            setPrompt({
                ...prompt, job_description: response.data.text
            })
        }
    }

    // Call Extract JSON API 
    const callExtractJSON = async (name: string, text: string) => {
        showLoader();
        if (name === "resume") {
            setLoadingText("resume");
            await ExtractResumeJsonMutation.mutateAsync({ prompt: text });
        }
        else if (name === "jd") {
            setLoadingText("jd")
            await ExtractJDJsonMutation.mutateAsync({ prompt: text });
        }
    }

    // Call Analyze API
    const callAnalyzeAPI = async () => {
        showLoader();
        setLoadingText("process");
        const payload: IAnalyzePayload = {
            resume: convertedJson.resume as string,
            job_description: convertedJson.job_description as string
        }
        await AnalyzeMutation.mutateAsync(payload)
    }

    React.useEffect(() => {
        if (watch('resume')) {
            callRecognizeAPI("resume", watch('resume'));
        }
    }, [watch('resume')]);

    React.useEffect(() => {
        if (watch('jd')) {
            callRecognizeAPI("jd", watch('jd'))
        }
    }, [watch('jd')])

    return (
        <Box sx={styles.card}>
            <Box sx={styles.dFlex}>
                <FormProvider {...methods}>
                    <Box sx={styles.flex1}>
                        <FileUploader name="resume" title="Upload Resume" />
                        <AppButton disabled={Boolean(prompt.resume === '')} text={convertedJson.resume ? "Extracted" : "Extract JSON"} onClick={() => callExtractJSON('resume', prompt.resume ?? '')} isSuccess={convertedJson.resume !== ""} isLoading={Boolean(loader && loadingText === "resume")} loadingText="Extracting" />

                    </Box>
                    <Box sx={styles.flex1}>
                        <FileUploader name="jd" title="Upload JD (Job Description)" />
                        <Box sx={styles.justifyEnd}>
                            <AppButton disabled={Boolean(prompt.job_description === '')} text={convertedJson.job_description ? "Extracted" : "Extract JSON"} onClick={() => callExtractJSON('jd', prompt.job_description ?? '')} isSuccess={convertedJson.job_description !== ""} isLoading={Boolean(loader && loadingText === "jd")} loadingText="Extracting" />
                        </Box>
                    </Box>
                </FormProvider>
            </Box>
            <Typography sx={styles.score}>Accepted Resume Score : <Typography component={"span"} sx={styles.span}>50%</Typography></Typography>
            <Box sx={styles.justifyCenter}>
                <AppButton text="Process" onClick={() => callAnalyzeAPI()} sx={styles.processBtn} disabled={Boolean(!convertedJson.resume && !convertedJson.job_description)} isLoading={Boolean(loader && loadingText === "process")} loadingText="Processing" />
            </Box>
         </Box>
    )
}
export default Home;