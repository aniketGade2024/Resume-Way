/* eslint-disable react-hooks/exhaustive-deps */
import { AppAlert, AppButton, FileUploader } from "@/components/atoms";
import { Box, TextField, Typography } from "@mui/material";
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
import { useLoader, useToggleSnackBar } from "@/hooks";
import useAppStore from "@/store";
import { useNavigate } from "react-router-dom";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ISnackBar } from "@/types/common";

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
    const [isUploading, setIsUploading] = React.useState<boolean>(false);

    const [snackBar, setSnackBar] = React.useState<ISnackBar>({
        title: "",
        subTitle: "",
        severity: "info",
    })

    const styles = HomePageStyles();
    const { loader, showLoader, hideLoader } = useLoader();
    const { setResumeInfo, setAcceptedResumeScore, acceptedResumeScore } = useAppStore();
    const navigate = useNavigate();
    const { showToggle, toggleSnackBar } = useToggleSnackBar();
    const [score, setScore] = React.useState<number>(acceptedResumeScore);


    const FileUploaderSchema = z.object({
        resume: z.string().min(1, 'Resume File is Required'),
        jd: z.string().min(1, 'jd file is required'),
        resumeScore: z.number().refine((value) => {
            if (value < -1 || value > 100) {
                return false
            }
            return true;
        }, "Please Enter correct input")
    })
    type IValidation = z.infer<typeof FileUploaderSchema>;

    const methods = useForm<IValidation>({
        resolver: zodResolver(FileUploaderSchema),
        defaultValues: {
            resume: '',
            jd: '',
            resumeScore: 0,
        }
    });

    const { watch, reset, handleSubmit, formState: { errors } } = methods;

    const setResumeScore = (type: "increment" | "decrement") => {
        if (type === "increment") {
            setScore(score + 1);
        } else {
            setScore(score - 1);
        }
    }

    //  Recognize Mutation 
    const RecognizeMutation = useMutation({
        mutationKey: ['RecognizeMutation'],
        mutationFn: (payload: IRecognizePayload) => Recognize(payload),
        onSuccess: () => {
            hideLoader();
        },
        onError: () => {
            setIsUploading(false);
            setSnackBar({ title: "Error", subTitle: "Something went wrong ....", severity: "error" });
            hideLoader();
            toggleSnackBar();
            reset();
        }
    })

    // Extract Resume JSON
    const ExtractResumeJsonMutation = useMutation({
        mutationKey: ['ExtractResumeJsonMutation'],
        mutationFn: (payload: IExtractJsonPayload) => ExtractResumeJson(payload),
        onSuccess: (data: any) => {
            if (data.error) {
                setSnackBar({ title: 'Error', subTitle: "Operation Failed", severity: "error" });
            } else {
                setConvertedJson({
                    ...convertedJson, resume: JSON.stringify(data?.output)
                });
                setSnackBar({ title: 'Success', subTitle: "JSON Extracted Successfully!", severity: "success" })
            }
            setLoadingText(undefined);
            hideLoader();
            toggleSnackBar();
        },
        onError: () => {
            hideLoader();
            toggleSnackBar();
        }
    })

    // Extract JD JSON
    const ExtractJDJsonMutation = useMutation({
        mutationKey: ['ExtractResumeJsonMutation'],
        mutationFn: (payload: IExtractJsonPayload) => ExtractJDJson(payload),
        onSuccess: (data: any) => {
            if (data.error) {
                setSnackBar({ title: 'Error', subTitle: "Operation Failed", severity: "error" });

            } else {
                setConvertedJson({
                    ...convertedJson, job_description: JSON.stringify((data as any)?.output)
                });
                setSnackBar({ title: 'Success', subTitle: "JSON Extracted Successfully!", severity: "success" })
            }
            setLoadingText(undefined);
            hideLoader();
            toggleSnackBar();
        },
        onError: () => {
            hideLoader();
            setSnackBar({ title: 'Error', subTitle: "Operation Failed", severity: "error" });
            toggleSnackBar();
        }
    })

    // Analyze API mutation
    const AnalyzeMutation = useMutation({
        mutationKey: ['AnalyzeMutation'],
        mutationFn: (payload: IAnalyzePayload) => Analyze(payload),
        onSuccess: (data) => {
            if (data) {
                setResumeInfo(data.output);
            }
            navigate({ pathname: "/profiles" })
            hideLoader();
        },
        onError: () => {
            setSnackBar({ title: 'Error', subTitle: "The Model Hallucinated! Please Try Again", severity: "error" });
            hideLoader();
            toggleSnackBar();
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
            });
            setIsUploading(false);
        } else if (name === "jd" && response?.data?.text) {
            setPrompt({
                ...prompt, job_description: response.data.text
            });
            setIsUploading(false);
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
        setAcceptedResumeScore(score);
        const payload: IAnalyzePayload = {
            resume: convertedJson.resume as string,
            job_description: convertedJson.job_description as string
        }
        await AnalyzeMutation.mutateAsync(payload)
    }

    React.useEffect(() => {
        if (watch('resume')) {
            setIsUploading(true);
            callRecognizeAPI("resume", watch('resume'));
        }
    }, [watch('resume')]);

    React.useEffect(() => {
        if (watch('jd')) {
            setIsUploading(true);
            callRecognizeAPI("jd", watch('jd'))
        }
    }, [watch('jd')]);

    React.useEffect(() => {
        console.log(errors)
    }, [errors])

    return (
        <Box sx={styles.card}>
            <FormProvider {...methods}>
                <Box sx={styles.dFlex}>
                    <Box sx={styles.flex1}>
                        <FileUploader name="resume" title="Upload Resume" isUploading={Boolean(isUploading && watch("resume") && !prompt.resume)} />
                        <AppButton disabled={Boolean(prompt.resume === '')} text={convertedJson.resume ? "Extracted" : "Extract JSON"} onClick={convertedJson.resume ? () => { } : () => callExtractJSON('resume', prompt.resume ?? '')} isSuccess={convertedJson.resume !== ""} isLoading={Boolean(loader && loadingText === "resume")} loadingText="Extracting" />

                    </Box>
                    <Box sx={styles.flex1}>
                        <FileUploader name="jd" title="Upload JD (Job Description)" isUploading={Boolean(isUploading && watch("jd") && !prompt.job_description)} />
                        <Box sx={styles.justifyEnd}>
                            <AppButton disabled={Boolean(prompt.job_description === '')} text={convertedJson.job_description ? "Extracted" : "Extract JSON"} onClick={convertedJson.job_description ? () => { } : () => callExtractJSON('jd', prompt.job_description ?? '')} isSuccess={convertedJson.job_description !== ""} isLoading={Boolean(loader && loadingText === "jd")} loadingText="Extracting" />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ ...styles.flex, gap: "10px", justifyContent: "center" }}>
                    <Typography sx={styles.score}>Accepted Resume Score :</Typography>
                    <Box sx={styles.flex}>
                        <Typography component={"span"} sx={styles.span}>
                            <TextField name="resumeScore" sx={styles.input} value={score} onChange={(e) => setScore(Number(e.target.value))} />
                        </Typography>
                        <Box sx={styles.colFlex}>
                            <ArrowUpwardIcon color={score < 100 ? "success" : "info"} sx={{ cursor: score < 100 ? "pointer" : "default" }} onClick={score < 100 ? () => setResumeScore("increment") : () => { }} />
                            <ArrowDownwardIcon color={score > 0 ? "error" : "info"} sx={{ cursor: score > 0 ? "pointer" : "default" }} onClick={score > 0 ? () => setResumeScore("decrement") : () => { }} />
                        </Box>
                    </Box>
                </Box>

                <Box sx={styles.justifyCenter}>
                    <AppButton text="Process" onClick={handleSubmit(callAnalyzeAPI)} sx={styles.processBtn} disabled={Boolean(!convertedJson.resume || !convertedJson.job_description)} isLoading={Boolean(loader && loadingText === "process")} loadingText="Processing" />
                </Box>
                {
                    Boolean(showToggle) && <AppAlert isOpen={showToggle} handleClose={toggleSnackBar} title={snackBar.title} subTitle=
                        {snackBar.subTitle} severity={snackBar.severity} />

                }
            </FormProvider>

        </Box>
    )
}
export default Home;