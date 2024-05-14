import IStyle from "@/types/common";
import { Theme } from "@mui/material";

export const LoginPageStyles = (theme: Theme) => ({
    page: {
        minHeight: "100vh",
        background: "linear-gradient(#006C9C,#003C57)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    containerBox: {
        width: "75%",
        height: "auto",
        background: theme.palette.info.main,
        borderRadius: "20px",
        padding: "60px 90px",
        display: "flex",
    },
    contentBox: {
        flexBasis: "50%",
    },
    dFlex: {
        width: "fit-content",
        display: "flex",
        alignItems: "center",
        borderBottom: "2px solid #000",
        marginBottom: "30px",
        gap: "8px"
    },
    text: {
        fontSize: "20px",
        fontWeight: "medium",
        color: "#000"
    },
    appBtn: {
        width: "100%",
        marginTop:"80px"
    }

} as IStyle);
