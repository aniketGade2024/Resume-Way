import { Badge, Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, TooltipProps, Typography, tooltipClasses } from "@mui/material";
import CardStyles from "./styles";
import theme from "@/theme/theme";
import { IResumeInfo } from "@/store/createInfoSlice";
import { matchSkills } from "@/utils/helpers/common";
import styled from "@emotion/styled";
import { useMutation } from "@tanstack/react-query";
import { IGenerateQuestionsPayload } from "@/types/generateQuestions";
import GenerateQuestions from "@/services/generateQuestions";
import { useNavigate } from "react-router-dom";
import useAppStore from "@/store";
import { useLoader } from "@/hooks";
import AppButton from "../AppButton";

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
        maxHeight: "300px", overflow: 'auto',
        backgroundColor: '#fff',
        color: '#000',
        border: '1px solid #dadde9',
    },
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
    const styles = CardStyles(theme);
    const navigate = useNavigate();
    const { setReport } = useAppStore();
    const { loader, showLoader, hideLoader } = useLoader();

    const GenerateQuestionsMutation = useMutation({
        mutationKey: ['GenerateQuestionsMutation'],
        mutationFn: (payload: IGenerateQuestionsPayload) => GenerateQuestions(payload),
        onSuccess: (data) => {
            hideLoader();
            if (data?.success) {
                setReport(data.output);
                navigate("/questions");
            }
        },
        onError: (err) => {
            hideLoader();
            console.log(err)
        }
    })

    const callGenerateQuestionsAPI = async (index: number) => {
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
                                        <Typography>
                                            Education:
                                        </Typography>
                                        <HtmlTooltip title={<ColBox required={resumeInfo.education.job_education} candidate={resumeInfo.education.resume_education} />} arrow>
                                            {/* <Typography>
                                                {resumeInfo.education.resume_education}
                                            </Typography> */}
                                            <StyledBadge>
                                                {resumeInfo.education.resume_education}

                                            </StyledBadge>
                                        </HtmlTooltip>
                                    </Box>

                                    <Box sx={styles.dFlex}>
                                        <Typography>
                                            Location:
                                        </Typography>
                                        <HtmlTooltip title={<ColBox required={resumeInfo.location.job_location} candidate={resumeInfo.location.resume_location} />} >
                                            <Typography>
                                                {resumeInfo.location.resume_location}
                                            </Typography>

                                        </HtmlTooltip>
                                    </Box>

                                    <Box sx={styles.dFlex}>
                                        <Typography>
                                            Skills:
                                        </Typography>
                                        <HtmlTooltip title={<ContentTable required={resumeInfo.skills.job_skills} candidate={resumeInfo.skills.resume_skills} />}>
                                            <Typography>
                                                {matchSkills(resumeInfo.skills.job_skills, resumeInfo.skills.resume_skills)}
                                            </Typography>

                                        </HtmlTooltip>

                                    </Box>

                                    <Box sx={styles.dFlex}>
                                        <Typography>
                                            Responsibilities:
                                        </Typography>
                                        <HtmlTooltip title={<ContentTable required={resumeInfo.responsibilitiesTaken.job_responsibilities} candidate={resumeInfo.responsibilitiesTaken.resume_responsibilities} />}>
                                            <Typography>
                                                {matchSkills(resumeInfo.responsibilitiesTaken.job_responsibilities, resumeInfo.responsibilitiesTaken.resume_responsibilities)}
                                            </Typography>

                                        </HtmlTooltip>
                                    </Box>

                                    <Box sx={styles.dFlex}>
                                        <Typography>
                                            Yrs. of Experience:
                                        </Typography>
                                        <HtmlTooltip title={<ColBox required={resumeInfo.yearsOfExperience.job_experience} candidate={resumeInfo.yearsOfExperience.resume_experience} />}>
                                            <Typography>
                                                {`${resumeInfo.yearsOfExperience.resume_experience} / ${resumeInfo.yearsOfExperience.job_experience}`}
                                            </Typography>
                                        </HtmlTooltip>
                                    </Box>

                                    <Box sx={styles.dFlex}>
                                        <Typography>
                                            Confidence:
                                        </Typography>
                                        <Typography>
                                            {`${Number(resumeInfo.confidence) * 100}%`}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={styles.button}>
                                    <AppButton onClick={() => callGenerateQuestionsAPI(index)} text="Generate Questionnaires" isLoading={loader} loadingText="Generating" />
                                </Box>
                            </Box>
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
                    required.map((item, index) => {
                        return <TableRow key={index}>
                            <TableCell>
                                {item}
                            </TableCell>
                            <TableCell>
                                {candidate[index]}
                            </TableCell>
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
    )
}

export default AppCard;