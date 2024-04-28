import { AppButton, FileUploader } from "@/components/atoms";
import { Box, Typography } from "@mui/material";
import HomePageStyles from "./styles";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const styles = HomePageStyles();
    const navigate = useNavigate();

    return (
        <Box sx={styles.card}>
            <Box sx={styles.dFlex}>
                <FileUploader title="Upload Resume" />
                <FileUploader title="Upload JD (Job Description)" />
            </Box>
            <Typography sx={styles.score}>Accepted Resume Score : <Typography component={"span"} sx={styles.span}>50%</Typography></Typography>
            <Box sx={styles.justifyEnd}>
                <AppButton text="Process" onClick={() => {
                    navigate({ pathname: '/user' })
                }} />
            </Box>
        </Box>
    )
}
export default Home;