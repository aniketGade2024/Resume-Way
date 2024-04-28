import { Box, Typography } from "@mui/material";
import CardStyles from "./styles";
import theme from "@/utils/theme/theme";

type ICard = {
    title: string;
    subTitle: string
}

const AppCard = ({ title, subTitle }: ICard) => {
    const styles = CardStyles(theme);

    return (
        <Box sx={styles.card}>
            <Box sx={styles.cardContent}>
                <Typography variant="h2" sx={styles.cardTitle}>{title}</Typography>
                <Typography sx={styles.cardSubtitle}>{subTitle}</Typography>
            </Box>
        </Box>
    )

}

export default AppCard;