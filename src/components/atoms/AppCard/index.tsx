/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, TooltipProps, Typography, tooltipClasses } from "@mui/material";
import CardStyles from "./styles";
import theme from "@/theme/theme";
import { IResumeInfo } from "@/store/createInfoSlice";
import { calculatePercentage, matchSkills } from "@/utils/helpers/common";
import styled from "@emotion/styled";
import { useMutation } from "@tanstack/react-query";
import { IGenerateQuestionsPayload } from "@/types/generateQuestions";
import GenerateQuestions from "@/services/generateQuestions";
import { useNavigate } from "react-router-dom";
import useAppStore from "@/store";
import { useLoader, useToggleSnackBar } from "@/hooks";
import AppButton from "../AppButton";
import React from "react";
import AppAlert from "../AppAlert";
import { ISnackBar } from "@/types/common";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

type ICard = {
    resumeInfo: IResumeInfo[];
}

type IColBox = {
    required: string | number,
    candidate: string | number;
}

type ITables = {
    required: string[],
    candidate: string[]
}


const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        flexBasis: "55%",
        maxHeight: "300px",
        overflow: 'auto',
        backgroundColor: '#fff',
        color: '#000',
        border: '1px solid #dadde9',
    } as any,
}));

const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        width: '20px',
        height: '20px',
        borderRadius: '50%', // This makes it circular
        backgroundColor: 'green', // You can change the background color as needed
    },
}));


const AppCard = ({ resumeInfo }: ICard) => {
    const [indexCalled, setIndexCalled] = React.useState<number>(-1);
    const [snackBar, setSnackBar] = React.useState<ISnackBar>({
        title: "",
        subTitle: "",
        severity: "info",
    })
    const styles = CardStyles(theme);
    const navigate = useNavigate();
    const { setReport, acceptedResumeScore } = useAppStore();
    const { loader, showLoader, hideLoader } = useLoader();
    const { showToggle, toggleSnackBar } = useToggleSnackBar();


    const GenerateQuestionsMutation = useMutation({
        mutationKey: ['GenerateQuestionsMutation'],
        mutationFn: (payload: IGenerateQuestionsPayload) => GenerateQuestions(payload),
        onSuccess: (data) => {
            hideLoader();
            setIndexCalled(-1);
            if (data?.success) {
                setReport(data.output);
                navigate("/questions");
            }
        },
        onError: () => {
            setSnackBar({ title: "Error", subTitle: "Something went wrong ....", severity: "error" });
            hideLoader();
            setIndexCalled(-1);
            toggleSnackBar();
        }
    })

    const callGenerateQuestionsAPI = async (index: number) => {
        setIndexCalled(index);
        showLoader();
        const payload: string = JSON.stringify(resumeInfo[index]);
        await GenerateQuestionsMutation.mutateAsync({ report: payload });
    }

    return (
        <Box sx={styles.grid}>
            {
                (resumeInfo || []).map((resumeInfo, index) => {
                    return (
                        <Box sx={styles.root} key={index}>
                            <Box sx={styles.box}>
                                <Box sx={styles.content}>
                                    <Box sx={styles.image}>
                                        <img src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=${resumeInfo.name}`} alt="Profile Image" />
                                    </Box>
                                    <Typography sx={styles.title}>{resumeInfo.name}</Typography>
                                    <Box>
                                        <Typography>{resumeInfo.domain}</Typography>
                                    </Box>

                                </Box>
                                <Box sx={styles.colFlex}>

                                    <Box sx={styles.dFlex}>
                                        <Typography sx={styles.label}>
                                            Education:
                                        </Typography>
                                        <HtmlTooltip title={<ColBox required={resumeInfo.education.job_education} candidate={resumeInfo.education.resume_education} />} arrow>
                                            <StyledBadge>
                                                {resumeInfo.education.resume_education}

                                            </StyledBadge>
                                        </HtmlTooltip>
                                    </Box>

                                    <Box sx={styles.dFlex}>
                                        <Typography sx={styles.label}>
                                            Location:
                                        </Typography>
                                        <HtmlTooltip title={<ColBox required={resumeInfo.location.job_location} candidate={resumeInfo.location.resume_location} />} >
                                            <Typography>
                                                {resumeInfo.location.resume_location}
                                            </Typography>

                                        </HtmlTooltip>
                                    </Box>

                                    <Box sx={styles.dFlex}>
                                        <Typography sx={styles.label}>
                                            Skills:
                                        </Typography>
                                        <HtmlTooltip title={<ContentTable required={resumeInfo.skills.job_skills} candidate={resumeInfo.skills.resume_skills} />}>
                                            <Box sx={{ ...styles.badge, ...(calculatePercentage(resumeInfo.skills.job_skills, resumeInfo.skills.resume_skills) > 50 ? styles.successBadge : styles.failedBadge) } as any}>
                                                {matchSkills(resumeInfo.skills.job_skills, resumeInfo.skills.resume_skills)}
                                            </Box>
                                        </HtmlTooltip>

                                    </Box>

                                    <Box sx={styles.dFlex}>
                                        <Typography sx={styles.label}>
                                            Responsibilities:
                                        </Typography>
                                        <HtmlTooltip title={<ContentTable required={resumeInfo.responsibilitiesTaken.job_responsibilities} candidate={resumeInfo.responsibilitiesTaken.resume_responsibilities} />}>
                                            <Box sx={{ ...styles.badge, ...(calculatePercentage(resumeInfo.responsibilitiesTaken.job_responsibilities, resumeInfo.responsibilitiesTaken.resume_responsibilities) > 50 ? styles.successBadge : styles.failedBadge) } as any}>
                                                {matchSkills(resumeInfo.responsibilitiesTaken.job_responsibilities, resumeInfo.responsibilitiesTaken.resume_responsibilities)}
                                            </Box>
                                        </HtmlTooltip>
                                    </Box>

                                    <Box sx={styles.dFlex}>
                                        <Typography sx={styles.label}>
                                            Yrs. of Experience:
                                        </Typography>
                                        <HtmlTooltip title={<ColBox required={resumeInfo.yearsOfExperience.job_experience} candidate={resumeInfo.yearsOfExperience.resume_experience} />}>
                                            <Box sx={{ ...styles.badge, ...((Math.round((resumeInfo.yearsOfExperience.job_experience / resumeInfo.yearsOfExperience.resume_experience) * 100)) > 50 ? styles.successBadge : styles.failedBadge) } as any}>
                                                {`${resumeInfo.yearsOfExperience.resume_experience} / ${resumeInfo.yearsOfExperience.job_experience}`}
                                            </Box>
                                        </HtmlTooltip>
                                    </Box>

                                    <Box sx={styles.dFlex}>
                                        <Typography sx={styles.label}>
                                            Confidence:
                                        </Typography>
                                        <HtmlTooltip title={<ColBox required={`${acceptedResumeScore}%`} candidate={`${Number(resumeInfo.confidence) * 100}%`} />}>
                                            <Box sx={styles.dFlex}>
                                                <Typography>
                                                    {`${Number(resumeInfo.confidence) * 100}%`}
                                                </Typography>
                                                {
                                                    Number(resumeInfo.confidence) * 100 >= acceptedResumeScore ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />
                                                }
                                            </Box>
                                        </HtmlTooltip>                                </Box>
                                </Box>

                                <Box sx={styles.button}>
                                    <AppButton onClick={() => callGenerateQuestionsAPI(index)} text="Generate Questionnaires" isLoading={Boolean(indexCalled === index && loader)} loadingText="Generating" />
                                </Box>
                            </Box>
                            {
                                Boolean(showToggle) && <AppAlert isOpen={showToggle} handleClose={toggleSnackBar} title={snackBar.title} subTitle=
                                    {snackBar.subTitle} severity={snackBar.severity} />

                            }
                        </Box>
                    )
                })
            }
        </Box>
    )

}


const ColBox = ({ required, candidate }: IColBox) => {
    const styles = CardStyles(theme);
    return (
        <Stack display={"flex"}>
            <Typography sx={styles.text}>Required : {required}</Typography>
            <Typography sx={styles.text}>Candidate : {candidate}</Typography>
        </Stack>
    )
}


const ContentTable = ({ required, candidate }: ITables) => {
    const [arr, setArr] = React.useState<number[]>([]);
    const sizeArray: number[] = [];
    const sizeOfArray = required.length >= candidate.length ? required.length : candidate.length;

    const calculateSizeArray = () => {
        if (sizeArray.length) {
            return false
        } else {
            for (let i = 0; i < sizeOfArray; i++) {
                sizeArray.push(i);
            }
            return true;
        }
    }

    React.useEffect(() => {
        if (calculateSizeArray()) {
            setArr(sizeArray);
        }
    }, [sizeOfArray])

    return (
        <Table sx={{ padding: 0 }}>
            <TableHead sx={{ backgroundColor: "grey" }}>
                <TableRow>
                    <TableCell>
                        <Typography sx={{ color: theme.palette.info.main, padding: 0 }}>
                            Required
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography sx={{ color: theme.palette.info.main, padding: 0 }}>
                            Candidate</Typography></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    (arr || []).map((item, index) => {
                        return <TableRow key={index}>
                            <TableCell sx={{ verticalAlign: "top" }}>
                                {required[item] ?? null}
                            </TableCell>
                            <TableCell sx={{ verticalAlign: "top" }}>
                                {candidate[item] ?? null}
                            </TableCell>
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
    )
}

export default AppCard;