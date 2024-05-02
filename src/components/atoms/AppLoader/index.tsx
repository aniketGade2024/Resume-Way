import { Box, Typography } from "@mui/material"
import { AppLoaderStyles } from "./styles";
import theme from "@/theme/theme";

const AppLoader = () => {
    const styles = AppLoaderStyles(theme);
    return (
        <Box sx={styles.appLoader}>
            <Typography variant="h3" sx={styles.title}>
                Please Wait
            </Typography>
            <Box sx={styles.bouncingLoader}>
                <Box sx={styles.bouncingBall}></Box>
                <Box sx={styles.bouncingBall}></Box>
                <Box sx={styles.bouncingBall}></Box>
            </Box>
        </Box>
    )
}

export default AppLoader;