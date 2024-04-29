import IStyle from "@/types/common";
import { Theme } from "@mui/material";

const CardStyles = (theme:Theme) => ({
    card: {
        width:"300px",
        borderRadius: "8px",
        overflow: "hidden",
        margin: "20px 0",
        background:theme.palette.info.main,
    },

    cardContent: {
        height:"100%",
        padding: "20px",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        gap:"40px",
    },

    cardTitle: {
        fontSize: "1rem",
    },

    cardSubtitle: {
        fontSize:"1rem",
    },

} as IStyle)

export default CardStyles;