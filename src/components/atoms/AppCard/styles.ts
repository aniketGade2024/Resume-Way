import IStyle from "@/types/common";
import { Theme } from "@mui/material";

const CardStyles = (theme: Theme) => ({
    box: {
        width: window.innerWidth * 0.25,
        backgroundColor: theme.palette.info.main,
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "10px",
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        overflow: 'hidden',
        marginBottom: "20px",
    },
    icons: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: "20px",
        '& button': {
            margin: "10px",
        },
    },
    button: {
        display: "flex",
        justifyContent: "center",
        '& button': {
            marginTop: "50px",
        },
    },
    dFlex: {
        display: "flex",
        gap: "15px"
    },
    colFlex: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "40px"
    },
    text: {
        fontSize: "14px"
    },
    title: {
        fontWeight: "700",
        textTransform: "uppercase",
        paddingBottom: "5px"
    },
    grid: {
        display: "flex",
        rowGap: "20px",
        columnGap: "30px",
        flexWrap: "wrap"
    }
} as IStyle)

export default CardStyles;