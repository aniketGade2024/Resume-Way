import { Box, Typography } from "@mui/material";
import { QuestionsPageStyles } from "./styles";
import theme from "@/theme/theme";
import { AppButton } from "@/components/atoms";
import useAppStore from "@/store";
import jsPDF from "jspdf";

const Questionnaire = () => {
    const styles = QuestionsPageStyles(theme);
    const { report } = useAppStore();

    //  print pdf
    const convertToPDF = () => {
        const content = document.getElementById("contentId");
        const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4", putOnlyUsedFonts: true, compress: false });
        if (content) {
            pdf.html(content, {
                callback: function (pdf) {
                    pdf.save('questionary.pdf');
                },
                x: 0,
                y: 0,
                html2canvas: {
                    scrollX: 0,
                    scrollY: 0,
                    scale: 0.5,
                    width: content.offsetWidth,
                    height: content.offsetHeight
                },
            });
        }
    };

    return (
        <Box sx={styles.page}>
            <Box sx={styles.sheet} id="contentId">

                <Box sx={styles.spaceBetween}>
                    <Box sx={styles.image}>
                        <img src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=Pooja%20Shinde}`} alt="Profile Image" />
                    </Box>
                    <AppButton text="Print" onClick={() => convertToPDF()} />

                </Box>

                <Typography variant="h6" sx={styles.name}>{report.candidate.name}</Typography>

                <Box sx={styles.flex}>
                    <Typography sx={styles.label}>Role : </Typography>
                    <Typography>{report.candidate.role}</Typography>
                </Box>

                <Box sx={styles.flex}>
                    <Typography sx={styles.label}>Yrs. of Experience : </Typography>
                    <Typography>{report.candidate.years_of_experience}</Typography>
                </Box>

                <Box sx={styles.flex}>
                    <Typography sx={styles.label}>Skills: </Typography>
                    <Typography>{report.candidate.skills.map((item) => {
                        return item.concat(", ")
                    })}</Typography>
                </Box>

                <Box sx={styles.questions}>
                    <Box>
                        <Typography variant="h6" sx={{ backgroundColor: theme.palette.primary.main, padding: "10px 20px", borderRadius: "10px", color: "#ffe" }}>Questions</Typography>
                        {
                            report.questions.map((item, index) => {
                                return (
                                    <Box key={index} sx={styles.questionBox}>
                                        <Box sx={styles.flex}>
                                            <Typography sx={styles.qLabel}>{`Q${index + 1})`}</Typography>
                                            <Typography sx={styles.content}>
                                                {item}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>                    <Box>
                        <Typography variant="h6" sx={{ backgroundColor: theme.palette.primary.main, padding: "10px 20px", borderRadius: "10px", color: "#ffe" }}>Soft Skills Questions</Typography>

                        {
                            report.soft_skills_questions.map((item, index) => {
                                return (
                                    <Box key={index} sx={styles.questionBox}>
                                        <Box sx={styles.flex}>
                                            <Typography sx={styles.qLabel}>{`Q${index + 1})`}</Typography>
                                            <Typography sx={styles.content}>
                                                {item}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>

                    <Box>
                        <Typography variant="h6" sx={{ backgroundColor: theme.palette.primary.main, padding: "10px 20px", borderRadius: "10px", color: "#ffe" }}>Technical Questions</Typography>
                        {
                            report.technical_questions.map((item, index) => {
                                return (
                                    <Box key={index} sx={styles.questionBox}>
                                        <Box sx={styles.flex}>
                                            <Typography sx={styles.qLabel}>{`Q${index + 1})`}</Typography>
                                            <Typography sx={styles.content}>
                                                {item}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )
                            })
                        }

                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

export default Questionnaire;