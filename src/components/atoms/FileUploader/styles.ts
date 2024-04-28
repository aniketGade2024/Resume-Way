import IStyle from "@/utils/types/common"
import { Theme } from "@mui/material";

const FileUploaderStyles = (theme:Theme) => ({
    container: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },

    card: {
        borderRadius: "10px",
        width: "100%",
        backgroundColor: theme.palette.info.main,
        padding: "20px 30px 40px",

        h3: {
            fontSize: "22px",
            fontWeight: "600",
        },
    },

    dropBox: {
        margin: "10px 0",
        padding: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        border: "3px dotted #a3a3a3",
        borderRadius: "5px",
    },
    imageContainer: {
        width: "100px",
        height: "100px",
        img: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },
    },
    
    h4: {
        fontSize: "16px",
        fontWeight: "400",
        color: "#2e2e2e",
    },
    p: {
        marginTop: "10px",
        marginBottom: "20px",
        fontSize: "12px",
        color: "#a3a3a3",
    },
    btn: {
        textDecoration: "none",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.info.main,
        padding: "5px 15px",
        border: "none",
        borderRadius:"5px",
        outline: "none",
        transition: "0.3s",
        fontSize:"16px",
        fontWeight:"400",
        "&:hover": {
            textDecoration: "none",
            backgroundColor: theme.palette.info.main,
            color: theme.palette.secondary.main,
            border: "none",
            outline: "1px solid #010101",
        },
    },

    form: {
        input: {
            margin: "10px 0",
            width: "100%",
            backgroundColor: "#e2e2e2",
            border: "none",
            outline: "none",
            padding: "12px",
        },
    },
} as IStyle)

export default FileUploaderStyles;