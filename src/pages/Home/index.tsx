/* eslint-disable react-hooks/exhaustive-deps */
import { AppButton, FileUploader } from "@/components/atoms";
import { Box, Typography } from "@mui/material";
import HomePageStyles from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import Recognize from "@/services/recognize";
import { IRecognizePayload } from "@/types/recognize";
import {  z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { IAnalyzePayload } from "@/types/analyze";
import Analyze from "@/services/analyze";
import { ExtractJDJson, ExtractResumeJson } from "@/services/extractJson";
import { IExtractJsonPayload } from "@/types/extractJson";

type IAnalyze = {
    resume?: string;
    job_description?: string;
}

const Home = () => {
    const styles = HomePageStyles();
    const [convertedJson, setConvertedJson] = React.useState<IAnalyze>({
        resume: '',
        job_description: ''
    })

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
        onSuccess: (data) => {

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
            setConvertedJson({
                resume: JSON.stringify((data as any)?.output)
            })
        },
        onError: () => {
            console.log("Error");
        }
    })

    // Extract JD JSON
    const ExtractJDJsonMutation = useMutation({
        mutationKey: ['ExtractResumeJsonMutation'],
        mutationFn: (payload: IExtractJsonPayload) => ExtractJDJson(payload),
        onSuccess: (data) => {
            setConvertedJson({
                job_description: JSON.stringify((data as any)?.output)
            })
        },
        onError: () => {
            console.log("Error");
        }
    })

    // Analyze API mutation
    const AnalyzeMutation = useMutation({
        mutationKey: ['AnalyzeMutation'],
        mutationFn: (payload: IAnalyzePayload) => Analyze(payload),
        onSuccess: (data) => {
            console.log(data);
        },
        onError: () => {
            console.log("Error");
        }

    })

    //  Call RECOGNIZE API
    const callRecognizeAPI = async (name: "resume" | "jd", imageBase64: string) => {
        const payload: IRecognizePayload = {
            imageBase64
        }
        const response = await RecognizeMutation.mutateAsync(payload);
        if (response?.data?.text && name === "resume") {
            setConvertedJson({
                resume: response.data.text,
            })
        } else if (name === "jd" && response?.data?.text) {
            setConvertedJson({
                job_description: response.data.text
            })
        }
    }

    // Call Extract JSON API 
    const callExtractJSON = async (name: string, text: string) => {
        if (name === "resume") {
            await ExtractResumeJsonMutation.mutateAsync({ prompt: text });
        }
        else if (name === "jd") {
            await ExtractJDJsonMutation.mutateAsync({ prompt: text });
        }
    }

    // Call Analyze API
    const callAnalyzeAPI = async () => {
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
                        <AppButton disabled={Boolean(convertedJson.resume === '')} text="Extract JSON" onClick={() => callExtractJSON('resume', convertedJson.resume ?? '')} />

                    </Box>
                    <Box sx={styles.flex1}>
                        <FileUploader name="jd" title="Upload JD (Job Description)" />
                        <Box sx={styles.justifyEnd}>
                            <AppButton disabled={Boolean(convertedJson.job_description === '')} text="Extract JSON" onClick={() => callExtractJSON('jd', convertedJson.job_description ?? '')} />
                        </Box>
                    </Box>
                </FormProvider>
            </Box>
            <Typography sx={styles.score}>Accepted Resume Score : <Typography component={"span"} sx={styles.span}>50%</Typography></Typography>
            <Box sx={styles.justifyCenter}>
                <AppButton text="Process" onClick={() => callAnalyzeAPI()} sx={styles.processBtn} />
            </Box>
        </Box>
    )
}
export default Home;