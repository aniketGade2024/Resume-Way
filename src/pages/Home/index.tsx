import { AppButton, FileUploader } from "@/components/atoms";
import { Box, Typography } from "@mui/material";
import HomePageStyles from "./styles";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

const Home = () => {
    const styles = HomePageStyles();
    const navigate = useNavigate();
    const methods = useForm();

    return (
        <Box sx={styles.card}>
            <Box sx={styles.dFlex}>
                <FormProvider {...methods}>
                    <Box sx={styles.flex1}>
                        <FileUploader name="resume" title="Upload Resume" />
                        <AppButton text="Analyze" />

                    </Box>
                    <Box sx={styles.flex1}>
                        <FileUploader name="jd" title="Upload JD (Job Description)" />
                        <Box sx={styles.justifyEnd}>
                            <AppButton text="Analyze" />
                        </Box>
                    </Box>
                </FormProvider>
            </Box>
            <Typography sx={styles.score}>Accepted Resume Score : <Typography component={"span"} sx={styles.span}>50%</Typography></Typography>
            <Box sx={styles.justifyCenter}>
                <AppButton text="Process" onClick={() => {
                    navigate({ pathname: '/user' })
                }} sx={styles.processBtn} />
            </Box>
        </Box>
    )
}
export default Home;