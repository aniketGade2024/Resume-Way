import IStyle from "@/types/common";
import { Theme } from "@mui/material";

export const QuestionsPageStyles = (theme: Theme) => ({
    page: {
        padding: "80px 0",
        paddingX: "50px",
    },
    sheet: {
        background: theme.palette.info.main,
        width: "auto",
        maxWidth: "50%",
        padding: "20px 40px",
        borderRadius: "10px"
    },
    flex: {
        display: "flex",
        gap: "10px",
        alignItems: "flex-start",
        marginTop: "15px",
    },
    label: {
        color: "rgba(0,0,0,0.6)"
    },
    name: {
        padding: "0 0 30px 0"
    },
    image: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        overflow: 'hidden',
        marginBottom: "20px",
    },
    questions: {
        maxHeight: "400px",
        overflow: "auto",
        margin: "30px 0 20px 0",
        display: "flex",
        flexDirection: "column",
        gap: "40px"
    },
    btnContainer: {
        maxWidth: "50%",
        display: "flex",
        justifyContent: "flex-end",
        marginY: "20px"
    }
} as IStyle)